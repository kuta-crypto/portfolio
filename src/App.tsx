import { useRef, useState } from 'react'
import { content } from './content'
import { media } from './media'
import { Planet } from './Planet'

const navItems = [
  ['Inicio', '#inicio'],
  ['Sobre mí', '#sobre-mi'],
  ['Proyectos', '#proyectos'],
  ['Tecnologías', '#tecnologias'],
  ['Contacto', '#contacto'],
] as const

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d={diagonal ? 'M5 19 19 5M5 5h14v14' : 'M4 12h16m-6-6 6 6-6 6'} />
    </svg>
  )
}

function SpaceIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      aria-hidden="true"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
    >
      <circle cx="16" cy="16" r="7" />
      <ellipse cx="16" cy="16" rx="15" ry="5" transform="rotate(-30 16 16)" />
    </svg>
  )
}

function DiagramIcon({ kind }: { kind: 'phone' | 'database' | 'map' }) {
  const paths = {
    phone: 'M7 2h10v20H7zM10 5h4M11 19h2',
    database:
      'M3 6c0-5 18-5 18 0s-18 5-18 0v12c0 5 18 5 18 0V6M3 12c0 5 18 5 18 0',
    map: 'm2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3ZM8 2v17M16 5v17',
  }
  return (
    <svg
      className="flow-step__icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinejoin="round"
    >
      <path d={paths[kind]} />
    </svg>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const toggle = useRef<HTMLButtonElement>(null)
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false)
          toggle.current?.focus()
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }}
    >
      <div className="header-inner container">
        <a
          className="brand"
          href="#inicio"
          onClick={() => setOpen(false)}
          aria-label="Jeremias Spataro, ir a Inicio"
        >
          <SpaceIcon className="brand-mark" />
          <span>
            JS<span className="brand-dot">.</span>
          </span>
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen(!open)}
        >
          <span /> <span />
        </button>
        <nav
          className={`navigation ${open ? 'navigation--open' : ''}`}
          id="site-navigation"
          aria-label="Navegación principal"
        >
          {navItems.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero section" id="inicio" aria-labelledby="hero-title">
      <div className="hero__stars" aria-hidden="true" />
      <div className="container hero__grid">
        <div className="hero__copy">
          <h1 id="hero-title">
            <span className="hero__greeting">Hola, soy</span>
            <span>
              Jeremias
              <br />
              Spataro<span className="hero__period">.</span>
            </span>
          </h1>
          {media.portrait && <img className="profile-photo" src={`${import.meta.env.BASE_URL}${media.portrait}`} alt="Jeremias Spataro" width="120" height="120" />}<p className="hero__intro">{content.intro}</p>
          <p className="hero__location">
            Estudiante de programación · Tandil, Argentina
          </p>
          <div className="hero__actions">
            <a className="button button--primary" href="#proyectos">
              Ver proyectos <ArrowIcon />
            </a>
            <a className="button button--ghost" href="#contacto">
              Contacto <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <div className="hero__art" aria-hidden="true">
          <Planet variant="hero" />
          <span className="hero__art-label">Un universo de ideas</span>
        </div>
      </div>
      <div className="container hero__bottom">
        <span>Portfolio / Desarrollo de software</span>
        <a href="#sobre-mi">
          Seguí explorando <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  )
}

function About() {
  return (
    <section
      className="section about"
      id="sobre-mi"
      aria-labelledby="about-title"
    >
      <div className="container about__grid">
        <div className="about__visual" aria-hidden="true">
          <div className="about__orbit" />
          <Planet variant="small" />
          <span className="about__coordinate">37°19′ S / 59°08′ O</span>
          <span className="about__visual-caption">
            Punto de partida: Tandil
          </span>
        </div>
        <div className="about__content">
          <h2 id="about-title">
            Curiosidad para crear.
            <br />
            <em>Proyectos para aprender.</em>
          </h2>
          {content.about.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <div className="about__footer">
            <span className="signal-dot" /> {content.location}
          </div>
        </div>
      </div>
    </section>
  )
}

function MapConcept() {
  return (
    <div
      className="map-concept"
      role="group"
      aria-label="Vista conceptual de Infomicro, sin datos en vivo. No es una captura real."
    >
      <div className="map-concept__top">
        <span className="map-concept__logo">
          <span className="map-concept__logo-icon">◉</span> infomicro
        </span>
        <span className="map-concept__top-right">Tandil, Buenos Aires</span>
      </div>
      <div className="map-concept__body">
        <div
          className="map-concept__map"
          role="img"
          aria-label="Esquema ilustrativo de recorridos 503 y 504 en Tandil"
        >
          <div className="map-road map-road--a" />
          <div className="map-road map-road--b" />
          <div className="map-road map-road--c" />
          <div className="map-road map-road--d" />
          <div className="map-road map-road--e" />
          <div className="map-route map-route--blue" />
          <div className="map-route map-route--green" />
          <span className="map-stop map-stop--one" />
          <span className="map-stop map-stop--two" />
          <span className="map-stop map-stop--three" />
          <span className="map-bus map-bus--one">
            <ArrowIcon diagonal />
          </span>
          <span className="map-bus map-bus--two">
            <ArrowIcon diagonal />
          </span>
          <span className="map-label map-label--one">CENTRO</span>
          <span className="map-label map-label--two">TANDIL</span>
        </div>
        <div className="map-concept__panel">
          <span className="map-concept__panel-label">LÍNEAS SELECCIONADAS</span>
          <strong>Seguimiento</strong>
          <div className="map-concept__selected">
            <span className="line-dot line-dot--blue" /> Línea 503{' '}
            <span>Visible</span>
          </div>
          <div className="map-concept__selected">
            <span className="line-dot line-dot--green" /> Línea 504{' '}
            <span>Visible</span>
          </div>
          <span className="map-concept__panel-label map-concept__panel-label--bottom">
            RECORRIDOS VISIBLES
          </span>
          <div className="map-concept__legend">
            <span className="line-dot line-dot--blue" /> 503{' '}
            <span className="line-dot line-dot--green" /> 504
          </div>
        </div>
      </div>
      <div className="map-concept__footer">
        <span>
          <span className="signal-dot" /> Vista conceptual
        </span>
        <span>Interfaz ilustrativa · Sin datos en vivo</span>
      </div>
    </div>
  )
}

function Projects() {
  const project = content.projects[0]
  return (
    <section
      className="section projects"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="projects__heading">
          <div>
            <h2 id="projects-title">
              Ideas que toman <em>forma.</em>
            </h2>
          </div>
          <p>
            Un proyecto que reúne aplicaciones, mapas y datos para pensar una
            experiencia de viaje más clara.
          </p>
        </div>
        <article className="featured-project">
          <div className="featured-project__top">
            <div>
              <h3>{project.name}</h3>
              <p className="featured-project__summary">{project.summary}</p>
              <div className="project-meta">
                <span>{project.type}</span>
                <span>Hecho en equipo</span>
              </div>
            </div>
          </div>
          {media.screenshots.length ? <div className="project-gallery">{media.screenshots.map((photo) => <figure key={photo.src}><img src={`${import.meta.env.BASE_URL}${photo.src}`} alt={photo.alt} loading="lazy" /><figcaption>{photo.alt}</figcaption></figure>)}</div> : <MapConcept />}
          <div className="featured-project__bottom">
            <span>Por {project.authors}</span>
            <a href="#caso-infomicro">
              Explorar el caso de estudio <ArrowIcon diagonal />
            </a>
          </div>
        </article>
      </div>
    </section>
  )
}

function CaseStudy() {
  const project = content.projects[0]
  return (
    <section
      className="section case-study"
      id="caso-infomicro"
      aria-labelledby="case-title"
    >
      <div className="container">
        <div className="case-study__intro">
          <div>
            <h2 id="case-title">
              Infomicro<span className="accent-period">.</span>
            </h2>
          </div>
          <p>
            Una mirada al problema, la propuesta y las decisiones detrás de este
            prototipo educativo para el transporte urbano de Tandil.
          </p>
        </div>
        <div className="case-study__lead">
          <div className="case-study__lead-number">EL DESAFÍO</div>
          <div>
            <h3>
              Que esperar el colectivo implique <em>menos incertidumbre.</em>
            </h3>
            <p>
              {project.objective} La propuesta está pensada para pasajeros que
              quieren saber dónde está un colectivo y consultar información de
              las líneas antes de viajar.
            </p>
          </div>
        </div>
        <div
          className="case-study__flow"
          role="group"
          aria-label="Funcionamiento del sistema"
        >
          <div className="flow-step">
            <span>01</span>
            <DiagramIcon kind="phone" />
            <h4>Celular del chofer</h4>
            <p>
              Una aplicación permite iniciar sesión con una cuenta asociada a
              una línea y enviar periódicamente la ubicación del celular.
            </p>
          </div>
          <div className="flow-arrow" aria-hidden="true">
            <ArrowIcon />
          </div>
          <div className="flow-step">
            <span>02</span>
            <DiagramIcon kind="database" />
            <h4>Backend y datos</h4>
            <p>
              Supabase gestiona la autenticación y almacena las coordenadas en
              PostgreSQL para que puedan consultarse.
            </p>
          </div>
          <div className="flow-arrow" aria-hidden="true">
            <ArrowIcon />
          </div>
          <div className="flow-step">
            <span>03</span>
            <DiagramIcon kind="map" />
            <h4>Mapa del pasajero</h4>
            <p>
              La aplicación consulta las ubicaciones transmitidas y las muestra
              en el mapa, junto con líneas, recorridos y paradas.
            </p>
          </div>
        </div>
        <div className="case-study__details">
          <div className="case-detail">
            <span className="detail-index">EXPERIENCIA</span>
            <h3>Una interfaz para seguir el recorrido.</h3>
            <p>
              La aplicación para pasajeros contempla ingresar un nombre,
              seleccionar líneas y ver los colectivos que transmiten su
              ubicación. Un panel superior muestra las líneas elegidas y permite
              desactivarlas rápidamente.
            </p>
            <p>
              También se trabajó en mostrar u ocultar recorridos, elegir colores
              predefinidos y simular trayectos para visualizar el movimiento del
              colectivo. Un rol de moderación contempla desactivar líneas cuando
              presentan fallas.
            </p>
          </div>
          <div className="case-detail case-detail--accent">
            <span className="detail-index">DECISIÓN TÉCNICA</span>
            <h3>El celular como punto de partida.</h3>
            <p>
              El prototipo usa un celular para enviar la ubicación: aprovecha
              hardware disponible y una integración ya desarrollada. Incorporar
              un tracker GPS dedicado sería una posible evolución y requeriría
              evaluar dispositivos, conectividad, protocolos e integración con
              el backend.
            </p>
          </div>
        </div>
        <div className="case-study__stack">
          <div>
            <span className="detail-index">HERRAMIENTAS</span>
            <h3>Tecnología con una función clara.</h3>
          </div>
          <div className="stack-list">
            <div>
              <strong>Flutter + Dart</strong>
              <span>Aplicaciones para pasajeros y choferes.</span>
            </div>
            <div>
              <strong>Supabase + PostgreSQL</strong>
              <span>Autenticación y almacenamiento de datos.</span>
            </div>
            <div>
              <strong>flutter_map + OpenStreetMap</strong>
              <span>Visualización de mapas, recorridos y ubicaciones.</span>
            </div>
          </div>
        </div>
        <div className="case-study__lines">
          <div>
            <span className="detail-index">LÍNEAS</span>
            <h3>Los colores del transporte.</h3>
            <p>
              En la representación del proyecto, cada línea conserva su color.
            </p>
          </div>
          <div className="line-list">
            {content.busLines.map((line) => (
              <span
                className={`line-pill line-pill--${line.color}`}
                key={line.number}
              >
                <span />
                {line.number}
              </span>
            ))}
          </div>
        </div>
        <div className="case-study__future">
          <SpaceIcon className="future-star" />
          <div>
            <span className="detail-index">PRÓXIMOS PASOS</span>
            <h3>Lo que podría venir.</h3>
            <p>
              Como propuestas futuras: evaluar dispositivos de rastreo
              dedicados, ampliar las pruebas de recorridos y seguir refinando la
              claridad de la información para pasajeros y choferes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Technologies() {
  return (
    <section
      className="section technologies"
      id="tecnologias"
      aria-labelledby="technologies-title"
    >
      <div className="container technologies__grid">
        <div className="technologies__heading">
          <h2 id="technologies-title">
            Herramientas para <em>construir.</em>
          </h2>
          <p>
            Las tecnologías que vengo usando y aprendiendo a través de mis
            proyectos.
          </p>
          <Planet variant="violet" />
        </div>
        <div className="tech-groups">
          {content.technologyGroups.map((group) => (
            <div className="tech-group" key={group.title}>
              <span className="tech-group__number">{group.number}</span>
              <div>
                <h3>{group.title}</h3>
                <div className="tech-pills">
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const links = [
    content.contact.email && {
      label: 'Correo electrónico',
      href: `mailto:${content.contact.email}`,
      value: content.contact.email,
    },
    content.contact.github && {
      label: 'GitHub',
      href: content.contact.github,
      value: 'Ver perfil',
    },
    content.contact.linkedin && {
      label: 'LinkedIn',
      href: content.contact.linkedin,
      value: 'Conectar',
    },
  ].filter((item): item is { label: string; href: string; value: string } =>
    Boolean(item),
  )
  return (
    <section
      className="section contact"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <div className="container contact__inner">
        <div className="contact__body">
          <div>
            <h2 id="contact-title">
              ¿Hablamos de
              <br />
              <em>una idea?</em>
            </h2>
            <p>
              Me interesa conocer proyectos y oportunidades donde pueda seguir
              aprendiendo y aportando.
            </p>
          </div>
          <div className="contact__links">
            {links.length ? (
              links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  <span>
                    {link.label}
                    <small>{link.value}</small>
                  </span>
                  <ArrowIcon diagonal />
                </a>
              ))
            ) : (
              <p className="contact__pending">
                Próximamente voy a compartir mis canales de contacto por acá.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <span className="footer-brand">
          JS<span>.</span>
        </span>
        <p>Jeremias Spataro · Tandil, Argentina</p>
        <a href="#inicio">
          Volver arriba <ArrowIcon diagonal />
        </a>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <CaseStudy />
        <Technologies />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

