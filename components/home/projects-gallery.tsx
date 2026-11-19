"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { homeProjects as projects, prettyUrl, type Project } from "@/lib/site-data"
import { Eyebrow } from "@/components/home/primitives"

/* ── Dispositivos ─────────────────────────────────────────────────────── */

/* iPhone: marco de titanio, bisel negro, isla dinámica, botones laterales y reflejo en el vidrio */
function IPhone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  // La barra de estado continúa la primera fila de píxeles de la captura (con sus degradés),
  // así se ve como parte de la web y no como una franja pegada encima
  const [bar, setBar] = useState({ bg: "#ffffff", row: "", fg: "#111111" })
  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        canvas.width = 64
        canvas.height = 1
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.drawImage(img, 0, 0, img.width, 1, 0, 0, 64, 1)
        const data = ctx.getImageData(0, 0, 64, 1).data
        let r = 0, g = 0, b = 0
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]
          g += data[i + 1]
          b += data[i + 2]
        }
        ;[r, g, b] = [r, g, b].map((v) => Math.round(v / 64))
        const light = (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6
        setBar({ bg: `rgb(${r}, ${g}, ${b})`, row: canvas.toDataURL(), fg: light ? "#111111" : "#ffffff" })
      } catch {
        /* sin muestra: queda la barra clara */
      }
    }
    img.src = src
  }, [src])

  return (
    <div className={`relative aspect-[9/19.5] ${className}`}>
      {/* botones laterales */}
      <span className="absolute -left-[1.1%] top-[17%] h-[3.6%] w-[1.6%] rounded-l-sm bg-[#3a3c42]" />
      <span className="absolute -left-[1.1%] top-[24%] h-[7%] w-[1.6%] rounded-l-sm bg-[#3a3c42]" />
      <span className="absolute -left-[1.1%] top-[33%] h-[7%] w-[1.6%] rounded-l-sm bg-[#3a3c42]" />
      <span className="absolute -right-[1.1%] top-[27%] h-[11%] w-[1.6%] rounded-r-sm bg-[#3a3c42]" />

      {/* marco */}
      <div className="absolute inset-0 rounded-[17%/7.8%] bg-gradient-to-br from-[#8e9097] via-[#34363b] to-[#74767d] p-[1.7%] shadow-[0_35px_60px_-18px_rgba(0,0,0,0.7)]">
        {/* bisel */}
        <div className="h-full w-full rounded-[15.4%/7.1%] bg-black p-[2.4%]">
          {/* pantalla */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[12.6%/5.8%] [container-type:inline-size]"
            style={{
              backgroundColor: bar.bg,
              ...(bar.row && { backgroundImage: `url(${bar.row})`, backgroundSize: "100% 100%" }),
            }}
          >
            {/* La web arranca debajo de la barra de estado, como en un iPhone real: la isla nunca tapa el contenido */}
            <img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-x-0 bottom-0 top-[6.4%] h-[93.6%] w-full object-cover object-top"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-0 flex h-[6.4%] items-center justify-between px-[9%] font-semibold tabular-nums"
              style={{ color: bar.fg, fontSize: "4.6cqw", fontFamily: "-apple-system, 'SF Pro Text', system-ui, sans-serif" }}
            >
              <span>9:41</span>
              <span className="flex items-center gap-[1.6cqw]">
                <svg viewBox="0 0 18 12" className="h-[3.4cqw]" fill="currentColor">
                  <rect x="0" y="8" width="3" height="4" rx="0.8" />
                  <rect x="5" y="5.5" width="3" height="6.5" rx="0.8" />
                  <rect x="10" y="3" width="3" height="9" rx="0.8" />
                  <rect x="15" y="0" width="3" height="12" rx="0.8" />
                </svg>
                <svg viewBox="0 0 17 12" className="h-[3.4cqw]" fill="currentColor">
                  <path d="M8.5 2.3c2.3 0 4.4.9 6 2.4l1-1.1A10.1 10.1 0 0 0 8.5.8 10.1 10.1 0 0 0 1.5 3.6l1 1.1a8.6 8.6 0 0 1 6-2.4Zm0 3.5c1.4 0 2.6.5 3.600 1.400l1-1.100a7 7 0 0 0-9.200 0l1 1.100c1-.9 2.200-1.400 3.600-1.400Zm0 3.500c.7 0 1.300.3 1.800.7L8.500 12 6.700 10c.5-.4 1.100-.7 1.800-.7Z" />
                </svg>
                <svg viewBox="0 0 27 12" className="h-[3.4cqw]" fill="none">
                  <rect x="0.5" y="0.5" width="23" height="11" rx="3.200" stroke="currentColor" opacity="0.4" />
                  <rect x="2" y="2" width="20" height="8" rx="2" fill="currentColor" />
                  <path d="M25 4v4c.8-.3 1.500-1.100 1.500-2S25.800 4.300 25 4Z" fill="currentColor" opacity="0.5" />
                </svg>
              </span>
            </div>
            <span className="absolute left-1/2 top-[1.9%] h-[2.9%] w-[31%] -translate-x-1/2 rounded-full bg-black" />
            <span className="absolute bottom-[1.4%] left-1/2 h-[0.5%] w-[34%] -translate-x-1/2 rounded-full bg-black/70" />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-white/0 to-white/0 mix-blend-soft-light" />
          </div>
        </div>
      </div>
    </div>
  )
}

function Browser({
  src,
  alt,
  url,
  className = "",
}: {
  src: string
  alt: string
  url?: string
  className?: string
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl bg-[#16181d] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)] ring-1 ring-white/10 ${className}`}
    >
      <div className="flex items-center gap-2 px-3 py-2">
        <span className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-white/20" />
          ))}
        </span>
        {url && (
          <span className="ml-2 truncate rounded bg-white/[0.07] px-2.5 py-1 font-mono text-[10px] text-white/55">
            {url}
          </span>
        )}
      </div>
      {/* Proporción fija: todas las ventanas miden lo mismo aunque la captura sea más ancha */}
      <div className="aspect-[16/10] overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-left-top"
        />
      </div>
    </div>
  )
}

/* La misma composición en todas las tarjetas: navegador al fondo, teléfono al frente */
function Devices({ project }: { project: Project }) {
  const { name, desktop, desktopUrl, mobile, logo, url } = project
  // Las direcciones de prueba (*.vercel.app) no se muestran: solo los dominios propios
  const address = desktopUrl ?? (url ? prettyUrl(url) : undefined)
  const shownUrl = address?.includes("vercel.app") ? undefined : address

  if (logo) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <img
          src={logo}
          alt={name}
          loading="lazy"
          decoding="async"
          className="max-h-[58%] max-w-[72%] object-contain transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
    )
  }

  return (
    <>
      {desktop && (
        <div className="absolute inset-0">
          <Browser
            src={desktop}
            alt={desktopUrl ? `Backoffice de ${name}` : `Sitio web de ${name}`}
            url={shownUrl}
            className="absolute right-[-8%] top-[10%] w-[86%] transition-transform duration-700 ease-out group-hover:-translate-y-1.5"
          />
        </div>
      )}
      {mobile && (
        <div className="absolute inset-0">
          <IPhone
            src={mobile}
            alt={`${name} en el teléfono`}
            className="absolute bottom-[-13%] left-[5%] h-[96%] transition-transform duration-700 ease-out group-hover:-translate-y-3"
          />
        </div>
      )}
    </>
  )
}

/* ── Tarjeta de proyecto (mismo tamaño para todas) ────────────────────── */

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { name, url, type, description, bg, accent, dark, brandLogo, brandLogoTall } = project
  const text = dark ? "text-white" : "text-ink"
  const soft = dark ? "text-white/65" : "text-ink/65"
  const Tag = url ? "a" : "div"

  return (
    <Tag
      {...(url ? { href: url, target: "_blank", rel: "noopener noreferrer" } : {})}
      data-card
      className={`group relative flex h-full snap-start w-[min(88vw,540px)] shrink-0 flex-col overflow-hidden rounded-3xl md:w-[min(78vw,880px)] md:flex-row ${text}`}
      style={{ backgroundColor: bg }}
    >
      {/* Luz con el color de marca del cliente */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{ background: `radial-gradient(60% 75% at 88% 0%, ${accent}, transparent 70%)` }}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-60 ${dark ? "bg-blueprint-inv" : "bg-blueprint"}`}
      />

      {/* Ficha del proyecto */}
      {/* Alto fijo en móvil: así la zona de dispositivos mide lo mismo en todas las tarjetas */}
      <div className="relative z-10 flex h-[10.5rem] shrink-0 flex-col justify-between gap-3 p-5 md:h-auto md:w-[38%] md:p-8">
        <div className="flex items-center gap-2.5">
          <span className={`font-mono text-xs tabular-nums ${soft}`}>{String(index + 1).padStart(2, "0")}</span>
          {type && (
            <span
              className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                dark ? "border-white/25 bg-white/10" : "border-ink/20 bg-white/50"
              }`}
            >
              {type}
            </span>
          )}
        </div>

        <div>
          {brandLogo ? (
            <h3 className="flex h-16 items-center md:h-20">
              {/* Franja de alto fijo: todos los logos quedan centrados sobre la misma línea. El logo reemplaza al nombre; el alt mantiene el nombre para lectores de pantalla y buscadores */}
              <img
                src={brandLogo}
                alt={name}
                loading="lazy"
                decoding="async"
                className={`w-auto max-w-[85%] object-contain object-left drop-shadow-[0_2px_10px_rgba(0,0,0,0.12)] ${
                  brandLogoTall ? "h-16 md:h-20" : "h-11 md:h-14"
                }`}
              />
            </h3>
          ) : (
            <h3 className="font-display line-clamp-2 text-balance text-2xl font-semibold leading-[1.04] tracking-tight md:line-clamp-none md:text-[2rem] xl:text-[2.2rem]">
              {name}
            </h3>
          )}
          {description && (
            <p className={`mt-3 hidden text-sm leading-relaxed md:line-clamp-3 md:min-h-[4.3rem] ${soft}`}>
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Dispositivos */}
      <div className="relative min-h-0 flex-1">
        <Devices project={project} />
      </div>
    </Tag>
  )
}

/* ── Galería: carrusel con flechas y scroll-snap ──────────────────────── */

export function ProjectsGallery() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const [current, setCurrent] = useState(0)

  // Tarjeta que está al comienzo de la tira (la más cercana al borde izquierdo)
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const onScroll = () => {
      const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-card]"))
      const max = track.scrollWidth - track.clientWidth
      if (track.scrollLeft >= max - 4) return setCurrent(cards.length - 1)
      let best = 0
      cards.forEach((card, i) => {
        if (Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft) < Math.abs(cards[best].offsetLeft - track.offsetLeft - track.scrollLeft)) best = i
      })
      setCurrent(best)
    }
    onScroll()
    track.addEventListener("scroll", onScroll, { passive: true })
    return () => track.removeEventListener("scroll", onScroll)
  }, [])

  const go = (dir: 1 | -1) => {
    const track = trackRef.current
    const card = track?.querySelector<HTMLElement>("[data-card]")
    if (!track || !card) return
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    track.scrollBy({ left: dir * (card.offsetWidth + gap), behavior: "smooth" })
  }

  // Cursor propio sobre las tarjetas con enlace: un círculo "Ver sitio" que sigue al mouse
  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const cursor = cursorRef.current
    if (!section || !track || !cursor) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    section.classList.add("has-cursor")
    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let frame = 0
    let visible = false
    const tick = () => {
      frame = 0
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      cursor.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) frame = requestAnimationFrame(tick)
    }
    const show = (on: boolean) => {
      if (on === visible) return
      visible = on
      cursor.dataset.visible = on ? "true" : "false"
    }
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      tx = e.clientX
      ty = e.clientY
      const over = e.target instanceof Element && !!e.target.closest("a[data-card]")
      if (over && !visible) {
        // aparece en el lugar, sin venir desde donde quedó la última vez
        x = tx
        y = ty
      }
      show(over)
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onLeave = () => show(false)
    const onScroll = () => show(false)

    track.addEventListener("pointermove", onMove)
    track.addEventListener("pointerleave", onLeave)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      section.classList.remove("has-cursor")
      track.removeEventListener("pointermove", onMove)
      track.removeEventListener("pointerleave", onLeave)
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const roundBtn =
    "flex h-11 w-11 items-center justify-center rounded-full border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-white disabled:pointer-events-none disabled:opacity-30 md:h-[46px] md:w-[46px]"

  return (
    <section id="proyectos" ref={sectionRef} className="relative scroll-mt-20 border-t border-line bg-white py-16 md:py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <Eyebrow>Portfolio</Eyebrow>
            <h2 className="font-display h-section mt-3">Últimos proyectos</h2>
          </div>
          <div className="flex shrink-0 items-center gap-3 pb-1.5">
            <button type="button" aria-label="Proyecto anterior" onClick={() => go(-1)} disabled={current === 0} className={roundBtn}>
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="min-w-16 text-center font-mono text-sm tabular-nums text-ink" aria-live="polite">
              {String(current + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              aria-label="Proyecto siguiente"
              onClick={() => go(1)}
              disabled={current === projects.length - 1}
              className={roundBtn}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-6 flex h-[clamp(360px,calc(100svh-300px),440px)] snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain rounded-3xl [scrollbar-width:none] md:mt-8 md:h-[clamp(380px,calc(100svh-260px),540px)] md:gap-6 [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>

      <div ref={cursorRef} aria-hidden="true" data-visible="false" className="gallery-cursor pointer-events-none fixed left-0 top-0 z-50">
        <span className="flex h-[4.25rem] w-[4.25rem] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-0.5 rounded-full bg-orange-500 font-mono text-[9px] uppercase leading-none tracking-[0.1em] text-white shadow-[0_14px_30px_-10px_rgba(249,115,22,0.7)]">
          <ArrowUpRight className="h-3.5 w-3.5" />
          Ver sitio
        </span>
      </div>
    </section>
  )
}
