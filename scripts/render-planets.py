"""Original procedural planet plates. Offline only; requires numpy and Pillow.

Orthographic ray/sphere and ray/ring intersections, a single distant light,
mutual shadows, seeded fractal albedo and crater relief. No external imagery.
Run from the project root: python scripts/render-planets.py
"""
from pathlib import Path
import numpy as np
from PIL import Image

OUT = Path(__file__).resolve().parents[1] / 'public' / 'planets'
OUT.mkdir(parents=True, exist_ok=True)


def noise(x, y, z):
    ix, iy, iz = np.floor(x), np.floor(y), np.floor(z)
    fx, fy, fz = x-ix, y-iy, z-iz
    fx, fy, fz = [v*v*(3-2*v) for v in (fx, fy, fz)]
    result = np.zeros_like(x)
    for a in range(2):
        for b in range(2):
            for c in range(2):
                h = np.sin((ix+a)*127.1+(iy+b)*311.7+(iz+c)*74.7)*43758.5453
                result += (h-np.floor(h))*(fx if a else 1-fx)*(fy if b else 1-fy)*(fz if c else 1-fz)
    return result


def fbm(x, y, z, octaves=5):
    value = np.zeros_like(x)
    for i in range(octaves):
        value += noise(x*2**i, y*2**i, z*2**i)*.5**(i+1)
    return value


def ring_density(r):
    fine = .5+.5*np.sin(r*380+2*np.sin(r*93))
    density = .32 + .28*fine + .16*np.sin(r*72)**2
    density *= np.where((r>1.83)&(r<1.91), .025, 1)
    density *= np.where((r>2.12)&(r<2.14), .08, 1)
    density *= np.clip((r-1.28)/.08,0,1)*np.clip((2.35-r)/.04,0,1)
    return density


def render(kind, width, height, extent):
    x,y = np.meshgrid(np.linspace(-extent,extent,width),np.linspace(extent*height/width,-extent*height/width,height))
    angle = np.deg2rad(22 if kind=='hero' else -12)
    x,y = x*np.cos(angle)+y*np.sin(angle), -x*np.sin(angle)+y*np.cos(angle)
    rad = x*x+y*y
    sphere = rad <= 1
    z = np.sqrt(np.maximum(0,1-rad))
    light = np.array([-.65,.55,.53]); light /= np.linalg.norm(light)
    normal = np.stack([x,y,z],axis=-1)
    grain = fbm(x*8+12,y*8,z*8)
    if kind=='small':
        relief = (fbm(x*5,y*5,z*5)-.5)*.035
        rng = np.random.default_rng(42)
        for _ in range(105):
            center = rng.normal(size=3); center /= np.linalg.norm(center)
            if center[2]<-.1: continue
            radius = rng.uniform(.025,.17)
            d = np.sqrt(np.maximum(0,2-2*(x*center[0]+y*center[1]+z*center[2])))/radius
            relief += radius*(.16*np.exp(-((d-1)/.15)**2)-.17*np.exp(-(d/.7)**4))
        dy,dx = np.gradient(relief,2*extent/width)
        normal = np.stack([x-dx*.55,y+dy*.55,z],axis=-1)
        normal /= np.maximum(np.linalg.norm(normal,axis=-1,keepdims=True),.001)
        base = np.clip(.56+grain*.28+(fbm(x*3+7,y*3,z*3)-.5)*.5+relief,0,1)
        albedo = base[...,None]*np.array([191,188,179])
    else:
        warp = fbm(x*4+8,y*6,z*4)-.5
        latitude = y + warp*.095 + .012*np.sin(x*13+z*8)
        bands = .5+.22*np.sin(latitude*28+warp*4)+.1*np.sin(latitude*82+warp*6)+.06*np.sin(latitude*220+warp*9)
        if kind=='hero':
            albedo = np.stack([176+bands*61,151+bands*65,115+bands*76],axis=-1)
            cool = np.clip(np.sin(latitude*17+1)*2-.9,0,1)*.45
            albedo = albedo*(1-cool[...,None])+np.array([124,148,154])*cool[...,None]
        else:
            albedo = np.stack([82+bands*58,109+bands*56,144+bands*65],axis=-1)
        albedo *= (.87+grain*.24)[...,None]
    diffuse = np.maximum(0,normal@light)
    illumination = .018+.97*diffuse**.7
    if kind=='hero':
        # Ring plane normal; project the light ray from each sphere point.
        n = np.array([0,.925,.38]); n /= np.linalg.norm(n)
        t = -(y*n[1]+z*n[2])/(n@light)
        sx,sy,sz = x+t*light[0],y+t*light[1],z+t*light[2]
        shadow = ring_density(np.sqrt(sx*sx+sy*sy+sz*sz))*(t>0)
        illumination *= 1-shadow*.78
    rgb = albedo*illumination[...,None]
    # Restrained grazing light, no external halo.
    if kind!='small':
        rim = (1-z)**7*np.maximum(0,diffuse)*.17
        rgb += rim[...,None]*np.array([136,169,179])
    rgba = np.zeros((height,width,4))
    rgba[:,:,:3] = rgb
    rgba[:,:,3] = sphere
    if kind=='hero':
        rz = -y*n[1]/n[2]
        rr = np.sqrt(x*x+y*y+rz*rz)
        alpha = ring_density(rr)
        visible = (~sphere)|(rz>z)
        # Shadow of the sphere on the ring plane, with a small penumbra.
        dot = x*light[0]+y*light[1]+rz*light[2]
        distance = np.sqrt(np.maximum(0,rr*rr-dot*dot))
        shade = np.where(dot<0,np.clip((distance-.96)/.08,.035,1),1)
        band = .78+.22*np.sin(rr*108)**2
        ring_rgb = np.stack([185*band,171*band,143*band],axis=-1)*shade[...,None]
        alpha *= visible
        old_alpha = rgba[:,:,3]
        combined = alpha+old_alpha*(1-alpha)
        rgba[:,:,:3] = (ring_rgb*alpha[...,None]+rgb*(old_alpha*(1-alpha))[...,None])/np.maximum(combined[...,None],.0001)
        rgba[:,:,3] = combined
    rgba[:,:,3] *= 255
    im = Image.fromarray(np.uint8(np.clip(rgba,0,255)),'RGBA')
    # Downsample supersampling for clean transparent edges and fine rings.
    im = im.resize((width//2,height//2),Image.Resampling.LANCZOS)
    dest = OUT / f'{kind}.webp'
    im.save(dest,quality=91,method=6)
    print(f'{dest.name}: {dest.stat().st_size // 1024} KiB, {im.size}')


render('hero',2400,1800,2.65)
render('small',1200,1200,1.12)
render('violet',1000,1000,1.12)
