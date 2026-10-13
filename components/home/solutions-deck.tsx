"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import { solutions } from "@/lib/site-data"

const clamp = (n: number) => Math.min(1, Math.max(0, n))

/* ── Dibujos técnicos de cada solución (se trazan solos al entrar en pantalla) ── */

const d = (delay: number) => ({ ["--d" as string]: delay }) as React.CSSProperties

/* Trazo que se dibuja: pathLength=1 permite animarlo sin conocer su largo real */
const line = { pathLength: 1, className: "draw-line", fill: "none" } as const

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 520 360"
      aria-hidden="true"
      className="h-full w-full"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

function BrowserShell() {
  return (
    <>
      <rect {...line} x="30" y="24" width="460" height="312" rx="14" style={d(0)} />
      <line {...line} x1="30" y1="62" x2="490" y2="62" style={d(0.25)} />
      <g className="draw-fade" style={d(0.45)} fill="currentColor" stroke="none">
        <circle cx="52" cy="43" r="4" />
        <circle cx="68" cy="43" r="4" />
        <circle cx="84" cy="43" r="4" />
      </g>
      <rect {...line} x="112" y="34" width="250" height="18" rx="9" style={d(0.4)} />
    </>
  )
}

function Label({ x, y, children, delay }: { x: number; y: number; children: string; delay: number }) {
  return (
    <text
      x={x}
      y={y}
      className="draw-fade"
      style={d(delay)}
      fill="currentColor"
      stroke="none"
      fontSize="9"
      letterSpacing="1.4"
      fontFamily="var(--font-geist-mono), ui-monospace, monospace"
      opacity="0.8"
    >
      {children}
    </text>
  )
}

/* Página web: titular, llamado a la acción y un cursor que lo aprieta */
function DrawLanding() {
  return (
    <Frame>
      <BrowserShell />
      <line {...line} x1="60" y1="108" x2="248" y2="108" strokeWidth="10" style={d(0.6)} />
      <line {...line} x1="60" y1="134" x2="196" y2="134" strokeWidth="10" style={d(0.7)} />
      <line {...line} x1="60" y1="166" x2="238" y2="166" strokeWidth="3" opacity="0.5" style={d(0.85)} />
      <line {...line} x1="60" y1="181" x2="212" y2="181" strokeWidth="3" opacity="0.5" style={d(0.9)} />
      <rect className="draw-pop" x="60" y="204" width="122" height="34" rx="17" fill="var(--accent)" stroke="none" style={d(1.1)} />
      <line {...line} x1="84" y1="221" x2="140" y2="221" stroke="var(--on-accent)" strokeWidth="3" style={d(1.3)} />
      {/* imagen */}
      <rect {...line} x="290" y="92" width="170" height="148" rx="10" style={d(0.75)} />
      <line {...line} x1="290" y1="92" x2="460" y2="240" opacity="0.4" style={d(1)} />
      <line {...line} x1="460" y1="92" x2="290" y2="240" opacity="0.4" style={d(1.05)} />
      {/* bloques inferiores */}
      {[60, 200, 340].map((x, i) => (
        <rect {...line} key={x} x={x} y="270" width="120" height="42" rx="8" style={d(1.1 + i * 0.1)} />
      ))}
      {/* cursor sobre el botón */}
      <path
        className="draw-fade"
        d="M168 226 l0 26 l7 -6 l5 12 l5 -2 l-5 -12 l9 0 z"
        fill="currentColor"
        stroke="var(--card)"
        strokeWidth="1.2"
        style={d(1.5)}
      />
      <Label x={196} y={225} delay={1.55}>
        CTA
      </Label>
    </Frame>
  )
}

/* Web institucional: navegación, portada y secciones del equipo */
function DrawInstitutional() {
  return (
    <Frame>
      <BrowserShell />
      <rect {...line} x="52" y="74" width="18" height="18" rx="4" style={d(0.55)} />
      {[330, 372, 414, 456].map((x, i) => (
        <line {...line} key={x} x1={x} y1="83" x2={x + 24} y2="83" strokeWidth="3" opacity="0.6" style={d(0.6 + i * 0.05)} />
      ))}
      <rect {...line} x="52" y="104" width="416" height="96" rx="10" style={d(0.7)} />
      <line {...line} x1="76" y1="138" x2="260" y2="138" strokeWidth="9" style={d(0.9)} />
      <line {...line} x1="76" y1="162" x2="200" y2="162" strokeWidth="3" opacity="0.5" style={d(1)} />
      <rect className="draw-pop" x="76" y="174" width="74" height="14" rx="7" fill="var(--accent)" stroke="none" style={d(1.15)} />
      {[110, 260, 410].map((cx, i) => (
        <g key={cx}>
          <circle {...line} cx={cx} cy="240" r="17" style={d(1.05 + i * 0.12)} />
          <line {...line} x1={cx - 34} y1="272" x2={cx + 34} y2="272" strokeWidth="3" style={d(1.15 + i * 0.12)} />
          <line {...line} x1={cx - 24} y1="286" x2={cx + 24} y2="286" strokeWidth="3" opacity="0.5" style={d(1.2 + i * 0.12)} />
        </g>
      ))}
      <line {...line} x1="52" y1="314" x2="468" y2="314" opacity="0.5" style={d(1.5)} />
    </Frame>
  )
}

/* Sistema de gestión: menú lateral, indicadores y gráficos */
function DrawErp() {
  const bars = [46, 78, 58, 104, 70, 120]
  return (
    <Frame>
      <rect {...line} x="30" y="24" width="460" height="312" rx="14" style={d(0)} />
      <line {...line} x1="118" y1="24" x2="118" y2="336" style={d(0.25)} />
      <rect className="draw-pop" x="52" y="46" width="44" height="26" rx="7" fill="var(--accent)" stroke="none" style={d(0.5)} />
      {[100, 124, 148, 172, 196].map((y, i) => (
        <line {...line} key={y} x1="52" y1={y} x2={i === 0 ? 96 : 88} y2={y} strokeWidth="3" opacity={i === 0 ? 1 : 0.45} style={d(0.55 + i * 0.05)} />
      ))}
      {[142, 258, 374].map((x, i) => (
        <g key={x}>
          <rect {...line} x={x} y="46" width="96" height="56" rx="8" style={d(0.6 + i * 0.1)} />
          <line {...line} x1={x + 14} y1="64" x2={x + 58} y2="64" strokeWidth="3" opacity="0.5" style={d(0.8 + i * 0.1)} />
          <line {...line} x1={x + 14} y1="84" x2={x + 44} y2="84" strokeWidth="8" style={d(0.9 + i * 0.1)} />
        </g>
      ))}
      <rect {...line} x="142" y="120" width="212" height="194" rx="8" style={d(0.85)} />
      {bars.map((h, i) => (
        <rect
          key={i}
          className="draw-grow"
          x={160 + i * 31}
          y={296 - h}
          width="19"
          height={h}
          rx="3"
          fill={i === 5 ? "var(--accent)" : "currentColor"}
          fillOpacity={i === 5 ? 1 : 0.28}
          stroke="none"
          style={d(1.15 + i * 0.07)}
        />
      ))}
      <polyline {...line} points="169,238 200,210 231,226 262,180 293,206 324,160" stroke="var(--accent)" strokeWidth="2.2" style={d(1.6)} />
      <rect {...line} x="374" y="120" width="96" height="194" rx="8" style={d(0.95)} />
      <circle {...line} cx="422" cy="176" r="28" strokeWidth="9" opacity="0.3" style={d(1.2)} />
      <path {...line} d="M422 148 a28 28 0 0 1 26 38" stroke="var(--accent)" strokeWidth="9" style={d(1.5)} />
      {[236, 256, 276].map((y, i) => (
        <line {...line} key={y} x1="390" y1={y} x2={454 - i * 12} y2={y} strokeWidth="3" opacity="0.5" style={d(1.4 + i * 0.07)} />
      ))}
    </Frame>
  )
}

/* Catálogo o carta digital: productos en el teléfono y acceso por código QR */
function DrawCatalog() {
  // módulos del código QR (decorativo)
  const dots = [
    [2, 0], [3, 1], [2, 2], [0, 2], [1, 3], [3, 3], [4, 2], [6, 2], [5, 3], [2, 4], [4, 4], [6, 4], [3, 5], [5, 5], [2, 6], [4, 6], [6, 6],
  ]
  return (
    <Frame>
      {/* teléfono */}
      <rect {...line} x="64" y="16" width="176" height="328" rx="28" style={d(0)} />
      <rect className="draw-pop" x="124" y="28" width="56" height="12" rx="6" fill="currentColor" stroke="none" style={d(0.4)} />
      {[84, 132, 180].map((x, i) => (
        <rect
          key={x}
          {...(i === 0 ? {} : line)}
          className={i === 0 ? "draw-pop" : "draw-line"}
          x={x}
          y="58"
          width="40"
          height="16"
          rx="8"
          fill={i === 0 ? "var(--accent)" : "none"}
          stroke={i === 0 ? "none" : "currentColor"}
          style={d(0.5 + i * 0.08)}
        />
      ))}
      {[96, 170, 244].map((y, i) => (
        <g key={y}>
          <rect {...line} x="84" y={y} width="50" height="50" rx="8" style={d(0.7 + i * 0.15)} />
          <line {...line} x1="146" y1={y + 12} x2="214" y2={y + 12} strokeWidth="4" style={d(0.8 + i * 0.15)} />
          <line {...line} x1="146" y1={y + 26} x2="200" y2={y + 26} strokeWidth="3" opacity="0.5" style={d(0.85 + i * 0.15)} />
          <rect className="draw-pop" x="146" y={y + 36} width="34" height="12" rx="6" fill="currentColor" fillOpacity="0.3" stroke="none" style={d(0.95 + i * 0.15)} />
        </g>
      ))}
      <line {...line} x1="130" y1="328" x2="174" y2="328" strokeWidth="3" style={d(1.2)} />
      {/* código QR */}
      <rect {...line} x="318" y="104" width="148" height="148" rx="12" style={d(0.9)} />
      {[
        [334, 120],
        [414, 120],
        [334, 200],
      ].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <rect {...line} x={x} y={y} width="36" height="36" rx="5" style={d(1.1 + i * 0.1)} />
          <rect className="draw-pop" x={x + 11} y={y + 11} width="14" height="14" rx="2" fill="currentColor" stroke="none" style={d(1.25 + i * 0.1)} />
        </g>
      ))}
      <g fill="currentColor" stroke="none">
        {dots.map(([cx, cy], i) => (
          <rect key={i} className="draw-pop" x={338 + cx * 17.5} y={124 + cy * 17.5} width="10" height="10" rx="2" style={d(1.4 + i * 0.025)} />
        ))}
      </g>
      {/* del QR al teléfono */}
      <path {...line} d="M318 178 C 290 178, 286 150, 252 150" stroke="var(--accent)" strokeWidth="2.2" style={d(1.7)} />
      <path className="draw-fade" d="M260 143 l-10 7 l10 7" fill="none" stroke="var(--accent)" strokeWidth="2.2" style={d(2.3)} />
      <Label x={372} y={274} delay={1.9}>
        ACCESO QR
      </Label>
    </Frame>
  )
}

const drawings = [DrawLanding, DrawInstitutional, DrawErp, DrawCatalog]

/* Cada tarjeta es un poco más oscura que la anterior: del papel a la tinta */
const themes = [
  {
    card: "bg-white text-ink",
    soft: "text-muted-ink",
    rule: "border-ink/10",
    chip: "bg-ink text-white",
    check: "text-brand",
    board: "bg-paper text-ink/80",
    vars: { "--card": "#ffffff", "--accent": "#f97316", "--on-accent": "#ffffff" },
  },
  {
    card: "bg-brand-light text-ink",
    soft: "text-ink/70",
    rule: "border-brand/15",
    chip: "bg-brand text-white",
    check: "text-brand",
    board: "bg-white/70 text-brand",
    vars: { "--card": "#e8f1fb", "--accent": "#f97316", "--on-accent": "#ffffff" },
  },
  {
    card: "bg-brand text-white",
    soft: "text-white/80",
    rule: "border-white/20",
    chip: "bg-white text-brand",
    check: "text-white",
    board: "bg-white/[0.07] text-white/90",
    vars: { "--card": "#0057b8", "--accent": "#ffb37a", "--on-accent": "#0b1322" },
  },
  {
    card: "bg-ink text-white",
    soft: "text-white/70",
    rule: "border-white/15",
    chip: "bg-white text-ink",
    check: "text-orange-400",
    board: "bg-white/[0.05] text-white/90",
    vars: { "--card": "#0b1322", "--accent": "#f97316", "--on-accent": "#ffffff" },
  },
]

/*
 * Mazo de soluciones: cada tarjeta se queda fija arriba y la siguiente sube y la tapa.
 * La que queda debajo se achica y se oscurece apenas, como una pila de planos.
 */
export function SolutionsDeck() {
  const deckRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const deck = deckRef.current
    if (!deck) return
    const cards = Array.from(deck.children) as HTMLElement[]

    // El dibujo de cada tarjeta se traza la primera vez que entra bien en pantalla
    const drawObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-drawn")
            drawObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.4 },
    )
    cards.forEach((card) => drawObserver.observe(card))

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => drawObserver.disconnect()

    // Alto de cada tarjeta: si no entra en pantalla, se fija recién cuando se vio entera
    const measure = () => cards.forEach((card) => card.style.setProperty("--h", `${card.offsetHeight}px`))
    measure()
    const sizeObserver = new ResizeObserver(measure)
    cards.forEach((card) => sizeObserver.observe(card))

    let frame = 0
    let active = false
    const update = () => {
      frame = 0
      const tops = cards.map((card) => card.getBoundingClientRect().top)
      cards.forEach((card, i) => {
        const next = tops[i + 1]
        const cover = next === undefined ? 0 : clamp((tops[i] + card.offsetHeight - next) / card.offsetHeight)
        // se escribe directo en cada elemento (sin variables heredadas) para no recalcular todo el dibujo
        card.style.transform = cover > 0.001 ? `scale(${(1 - cover * 0.055).toFixed(4)})` : ""
        const shade = card.lastElementChild as HTMLElement | null
        if (shade) shade.style.opacity = (cover * 0.42).toFixed(3)
      })
    }
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update)
    }
    const viewObserver = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) update()
      },
      { rootMargin: "20% 0px" },
    )
    viewObserver.observe(deck)
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      drawObserver.disconnect()
      viewObserver.disconnect()
      sizeObserver.disconnect()
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div ref={deckRef} className="deck mt-14">
      {solutions.map((solution, index) => {
        const theme = themes[index % themes.length]
        const Drawing = drawings[index % drawings.length]
        const Icon = solution.icon
        return (
          <article
            key={solution.title}
            className={`deck-card relative overflow-hidden rounded-[2rem] ${theme.card}`}
            style={{ ["--deck-i" as string]: index, ...(theme.vars as React.CSSProperties) }}
          >
            <div className="grid grid-cols-1 lg:min-h-[30rem] lg:grid-cols-12">
              <div className="flex flex-col p-6 sm:p-8 lg:col-span-6 lg:p-11">
                <div className="flex items-center gap-3">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${theme.chip}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  {solution.badge && (
                    <span className="eyebrow rounded-full bg-orange-500 px-3 py-1.5 font-semibold text-white">
                      {solution.badge}
                    </span>
                  )}
                  <span className={`ml-auto font-mono text-xs tabular-nums ${theme.soft}`}>
                    0{index + 1} / 0{solutions.length}
                  </span>
                </div>

                <h3 className="font-display mt-7 text-balance text-[2rem] font-semibold leading-[1.02] tracking-tight sm:text-4xl lg:mt-auto lg:pt-10 lg:text-[3.1rem]">
                  {solution.title}
                </h3>
                <p className={`mt-4 max-w-lg leading-relaxed ${theme.soft}`}>{solution.description}</p>
                <ul className={`mt-6 grid grid-cols-1 gap-x-6 border-t pt-5 sm:grid-cols-2 ${theme.rule}`}>
                  {solution.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 py-1.5 text-sm font-medium">
                      <Check className={`h-4 w-4 shrink-0 ${theme.check}`} />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 pt-0 sm:p-4 sm:pt-0 lg:col-span-6 lg:p-4 lg:pl-0">
                <div
                  className={`relative flex h-44 items-center justify-center overflow-hidden rounded-[1.4rem] sm:h-56 lg:h-full ${theme.board}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute inset-0 ${index >= 2 ? "bg-blueprint-inv" : "bg-blueprint"}`}
                  />
                  <div className="relative h-full w-full max-w-[34rem] p-3 sm:p-5 lg:p-8">
                    <Drawing />
                  </div>
                </div>
              </div>
            </div>
            {/* sombra que cae sobre la tarjeta cuando la siguiente la va tapando */}
            <span aria-hidden="true" className="deck-shade pointer-events-none absolute inset-0 bg-ink" />
          </article>
        )
      })}
    </div>
  )
}
