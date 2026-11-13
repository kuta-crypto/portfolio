import { useEffect, useRef, useState } from 'react'

type PlanetVariant = 'hero' | 'small' | 'violet'

/** Pre-rendered materials keep ray-traced ring occlusion off the main thread. */
export function Planet({
  variant,
  className = '',
}: {
  variant: PlanetVariant
  className?: string
}) {
  const root = useRef<HTMLDivElement>(null)
  const [moving, setMoving] = useState(false)

  useEffect(() => {
    const element = root.current
    if (!element) return
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let inView = false
    const update = () =>
      setMoving(inView && !motion.matches && !document.hidden)
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      update()
    })
    observer.observe(element)
    motion.addEventListener('change', update)
    document.addEventListener('visibilitychange', update)
    return () => {
      observer.disconnect()
      motion.removeEventListener('change', update)
      document.removeEventListener('visibilitychange', update)
    }
  }, [])

  return (
    <div
      ref={root}
      aria-hidden="true"
      className={`planet planet--${variant} ${className}`}
      data-moving={moving}
    >
      <div className="planet__inclination">
        <div className="planet__float">
          {/* Spin has its own layer. The prelit plate stays fixed to preserve its light direction. */}
          <div className="planet__rotation">
            <img
              className="planet__surface"
              src={`${import.meta.env.BASE_URL}planets/${variant}.webp`}
              alt=""
              width={
                variant === 'hero' ? 1200 : variant === 'small' ? 600 : 500
              }
              height={
                variant === 'hero' ? 900 : variant === 'small' ? 600 : 500
              }
              decoding="async"
              loading={variant === 'hero' ? 'eager' : 'lazy'}
              fetchPriority={variant === 'hero' ? 'high' : 'auto'}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
