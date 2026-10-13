"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowRight, Check, DraftingCompass, MonitorSmartphone, Sparkles } from "lucide-react"
import { CtaButton } from "@/components/home/primitives"

const container = "mx-auto max-w-[1320px] px-5 md:px-8"
const checks = ["Entrega rápida", "100% autogestionable", "Soporte incluido"]

const LENS_RADIUS = 150

/* Etiqueta de anotación del plano (como las cotas de un dibujo técnico) */
function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute whitespace-nowrap border border-white/50 bg-brand px-1.5 py-[3px] font-mono text-[9px] uppercase leading-none tracking-[0.12em] text-white/85 ${className}`}
    >
      {children}
    </span>
  )
}

function ToggleLabel({ showingPlan }: { showingPlan: boolean }) {
  return (
    // en pantallas chicas queda solo el ícono, para entrar al lado del botón principal
    <span className="hidden pl-3 pr-3 sm:inline">{showingPlan ? "Ver el producto" : "Ver el plano"}</span>
  )
}

/*
 * El contenido del hero se dibuja dos veces con la misma estructura y medidas:
 * la versión terminada ("producto") y su plano técnico. Como miden lo mismo, calzan una sobre la otra.
 */
function HeroContent({
  plan = false,
  showingPlan = false,
  onCta,
  onToggle,
}: {
  plan?: boolean
  showingPlan?: boolean
  onCta?: () => void
  onToggle?: () => void
}) {
  const Heading = plan ? "div" : "h1"

  return (
    <div className={`${container} relative pb-16 pt-10 md:pb-20 md:pt-16`}>
      {plan && (
        <>
          {/* Cota del ancho del contenedor */}
          <div className="absolute inset-x-5 top-3.5 flex items-center md:inset-x-8">
            <span className="h-2.5 w-px bg-white/60" />
            <span className="h-px flex-1 bg-white/40" />
            <span className="px-2 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-white/80">
              Contenedor · máx. 1320 px
            </span>
            <span className="h-px flex-1 bg-white/40" />
            <span className="h-2.5 w-px bg-white/60" />
          </div>
          {/* Guías verticales del contenedor */}
          <span className="plan-dash-y absolute inset-y-0 left-5 w-px md:left-8" />
          <span className="plan-dash-y absolute inset-y-0 right-5 w-px md:right-8" />
          {/* Rótulo del plano */}
          <div className="absolute right-8 top-[3.9rem] hidden grid-cols-2 border border-white/50 font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-white/85 lg:grid">
            <span className="border-b border-r border-white/50 px-2.5 py-2">Autogestiva</span>
            <span className="border-b border-white/50 px-2.5 py-2">Plano 01</span>
            <span className="border-r border-white/50 px-2.5 py-2">Home / Hero</span>
            <span className="px-2.5 py-2">Esc. 1:1</span>
          </div>
        </>
      )}

      <p
        className={`eyebrow relative inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border px-4 py-2.5 max-sm:text-[10px] max-sm:tracking-[0.06em] ${
          plan ? "border-dashed border-white/70 text-white" : "border-brand/25 bg-white/70 text-brand"
        }`}
      >
        <Sparkles className="h-3.5 w-3.5" />
        Desarrollo web y sistemas de gestión a medida
      </p>

      <div className="relative mt-7">
        {plan && <Tag className="-top-[1.15rem] left-0">H1 · Bricolage Grotesque 700</Tag>}
        <Heading className={`font-display h-mega ${plan ? "plan-outline" : "text-ink"}`}>
          <span className={`line-mask ${plan ? "plan-guide" : ""}`}>
            <span className="text-balance">Soluciones digitales que</span>
          </span>
          <span className={`line-mask ${plan ? "plan-guide" : ""}`}>
            <span style={{ animationDelay: "0.1s" }}>
              <span className={`relative inline-block ${plan ? "plan-outline-accent" : "text-brand"}`}>
                escalan
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 20"
                  preserveAspectRatio="none"
                  className="absolute -bottom-[0.04em] left-0 h-[0.14em] w-full overflow-visible"
                >
                  <path
                    d="M3 14 C 60 3, 120 3, 170 10 S 260 16, 297 6"
                    fill="none"
                    stroke={plan ? "#ffffff" : "#f97316"}
                    strokeWidth={plan ? 2 : 6}
                    strokeDasharray={plan ? "7 6" : undefined}
                    strokeLinecap="round"
                    vectorEffect={plan ? "non-scaling-stroke" : undefined}
                    className={plan ? undefined : "draw-stroke"}
                  />
                </svg>
              </span>{" "}
              tu negocio
            </span>
          </span>
        </Heading>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:mt-12 lg:grid-cols-12 lg:items-end">
        <div className="relative lg:col-span-7">
          {plan && <Tag className="-top-[1.35rem] left-0">P · Geist 20 / 1.6</Tag>}
          <p
            className={`max-w-2xl text-pretty text-lg leading-relaxed md:text-xl ${
              plan ? "text-white/85" : "text-muted-ink"
            }`}
          >
            No trabajamos con plantillas genéricas. Diseñamos y desarrollamos páginas web, tiendas online y sistemas
            de gestión a medida, pensados para tus procesos, tus usuarios y tus objetivos.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {plan ? (
              <span className="relative inline-flex items-center justify-center gap-3 rounded-full py-2 pl-6 pr-2 text-[15px] font-semibold text-white outline-dashed outline-1 -outline-offset-1 outline-white/80">
                <span>Cotizá tu proyecto</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full outline-dashed outline-1 -outline-offset-1 outline-white/80">
                  <ArrowRight className="h-4 w-4" />
                </span>
                <Tag className="-bottom-[1.35rem] left-4">Botón · primario</Tag>
              </span>
            ) : (
              <CtaButton onClick={onCta}>Cotizá tu proyecto</CtaButton>
            )}

            {/* Alterna entre el plano y el producto terminado (también sirve en pantallas táctiles).
                Las dos capas muestran el mismo texto para medir lo mismo. */}
            {plan ? (
              <span className="inline-flex items-center rounded-full p-2 text-[15px] font-semibold text-white outline-dashed outline-1 -outline-offset-1 outline-white/80">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand">
                  <MonitorSmartphone className="h-4 w-4" />
                </span>
                <ToggleLabel showingPlan={showingPlan} />
              </span>
            ) : (
              <button
                type="button"
                onClick={onToggle}
                aria-pressed={showingPlan}
                aria-label={showingPlan ? "Ver el producto terminado" : "Ver el plano técnico de esta sección"}
                className="group inline-flex items-center rounded-full bg-white/70 p-2 text-[15px] font-semibold text-ink shadow-[inset_0_0_0_1px_rgba(11,19,34,0.15)] transition-all duration-300 hover:text-brand hover:shadow-[inset_0_0_0_1px_#0057b8] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/25"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-ink text-white transition-colors duration-300 group-hover:bg-brand">
                  <DraftingCompass className="h-4 w-4 transition-transform duration-500 group-hover:rotate-[24deg]" />
                </span>
                <ToggleLabel showingPlan={showingPlan} />
              </button>
            )}
          </div>
        </div>

        <ul
          className={`relative border-t lg:col-span-4 lg:col-start-9 ${
            plan ? "border-dashed border-white/45" : "border-line"
          }`}
        >
          {plan && <Tag className="-top-[1.35rem] right-0">Lista · 3 ítems</Tag>}
          {checks.map((item) => (
            <li
              key={item}
              className={`flex items-center gap-3 border-b py-3.5 font-medium ${
                plan ? "border-dashed border-white/45 text-white" : "border-line text-ink"
              }`}
            >
              <Check className={`h-4 w-4 shrink-0 ${plan ? "text-white" : "text-green-600"}`} /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function Hero({ onCta }: { onCta: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const planRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const coordRef = useRef<HTMLSpanElement>(null)
  const planModeRef = useRef(false)
  const scanTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const [showingPlan, setShowingPlan] = useState(false)
  const [intro, setIntro] = useState(true)

  // Al terminar el barrido inicial, el control pasa a JavaScript (lente y botón)
  useEffect(() => {
    const plan = planRef.current
    if (!plan) return
    const finish = () => setIntro(false)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish()
      return
    }
    plan.addEventListener("animationend", finish, { once: true })
    // Red de seguridad por si la animación no llega a dispararse
    const fallback = setTimeout(finish, 2600)
    return () => {
      plan.removeEventListener("animationend", finish)
      clearTimeout(fallback)
    }
  }, [])

  // Lente: bajo el cursor se ve el plano de lo que hay debajo
  useEffect(() => {
    const section = sectionRef.current
    const plan = planRef.current
    const ring = ringRef.current
    if (!section || !plan || !ring || intro) return
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return

    let x = 0
    let y = 0
    let r = 0
    let tx = 0
    let ty = 0
    let tr = 0
    let frame = 0
    let started = false

    const tick = () => {
      frame = 0
      x += (tx - x) * 0.24
      y += (ty - y) * 0.24
      r += (tr - r) * 0.16
      const settled = Math.abs(tx - x) < 0.3 && Math.abs(ty - y) < 0.3 && Math.abs(tr - r) < 0.4
      if (settled) {
        x = tx
        y = ty
        r = tr
      }
      plan.style.setProperty("--lens-x", `${x.toFixed(1)}px`)
      plan.style.setProperty("--lens-y", `${y.toFixed(1)}px`)
      plan.style.setProperty("--lens-r", `${r.toFixed(1)}px`)
      ring.style.transform = `translate3d(${(x - LENS_RADIUS).toFixed(1)}px, ${(y - LENS_RADIUS).toFixed(1)}px, 0) scale(${(r / LENS_RADIUS).toFixed(3)})`
      ring.style.opacity = r > 2 ? "1" : "0"
      if (!settled) frame = requestAnimationFrame(tick)
    }
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return
      const rect = section.getBoundingClientRect()
      tx = e.clientX - rect.left
      ty = e.clientY - rect.top
      if (!started) {
        // la primera vez aparece donde está el cursor, sin venir volando desde la esquina
        started = true
        x = tx
        y = ty
      }
      // sobre botones y enlaces la lente se retira para no tapar la acción
      const overAction = e.target instanceof Element && !!e.target.closest("a, button")
      tr = overAction || planModeRef.current ? 0 : LENS_RADIUS
      if (coordRef.current) {
        coordRef.current.textContent = `X ${String(Math.round(tx)).padStart(4, "0")} · Y ${String(Math.round(ty)).padStart(4, "0")}`
      }
      run()
    }
    const onLeave = () => {
      tr = 0
      run()
    }

    section.addEventListener("pointermove", onMove)
    section.addEventListener("pointerleave", onLeave)
    return () => {
      section.removeEventListener("pointermove", onMove)
      section.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
      plan.style.setProperty("--lens-r", "0px")
      ring.style.opacity = "0"
    }
  }, [intro])

  useEffect(() => () => clearTimeout(scanTimer.current), [])

  const toggle = () => {
    const next = !showingPlan
    planModeRef.current = next
    setShowingPlan(next)
    setIntro(false)
    const plan = planRef.current
    const line = lineRef.current
    if (!plan || !line) return
    // el plano ocupa desde la línea de barrido hacia la derecha: 0% = todo plano, 100% = todo producto
    const value = next ? "0%" : "100%"
    plan.style.setProperty("--lens-r", "0px")
    if (ringRef.current) ringRef.current.style.opacity = "0"
    plan.style.setProperty("--scan", value)
    line.style.setProperty("--scan", value)
    line.dataset.scanning = "true"
    clearTimeout(scanTimer.current)
    scanTimer.current = setTimeout(() => {
      line.dataset.scanning = "false"
    }, 1150)
  }

  return (
    <section id="hero" ref={sectionRef} className="hero relative overflow-hidden">
      {/* Producto terminado */}
      <div className="relative">
        <div className="bg-blueprint fade-edges-y pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -right-32 top-40 h-[560px] w-[560px]"
          style={{ background: "radial-gradient(closest-side, rgba(0,87,184,0.16), transparent)" }}
        />
        <HeroContent onCta={onCta} onToggle={toggle} showingPlan={showingPlan} />
      </div>

      {/* Plano técnico: mismo contenido, visible a la derecha del barrido y dentro de la lente */}
      <div
        ref={planRef}
        aria-hidden="true"
        inert
        className={`hero-plan bg-plan pointer-events-none absolute inset-0 select-none ${intro ? "hero-intro" : "hero-ready"}`}
      >
        {/* Marcas de registro en las esquinas */}
        {["left-2 top-2", "right-2 top-2", "bottom-2 left-2", "bottom-2 right-2"].map((pos) => (
          <span key={pos} className={`plan-cross absolute h-3 w-3 ${pos}`} />
        ))}
        <HeroContent plan showingPlan={showingPlan} />
      </div>

      {/* Línea de barrido que "construye" el sitio */}
      <span
        ref={lineRef}
        aria-hidden="true"
        className={`hero-scanline pointer-events-none absolute inset-0 ${intro ? "hero-intro" : "hero-ready"}`}
      >
        <span className="hero-scanline-bar absolute inset-y-0 left-0" />
        <span className="absolute left-2 top-3 whitespace-nowrap bg-orange-500 px-1.5 py-[3px] font-mono text-[9px] uppercase leading-none tracking-[0.14em] text-white">
          Build
        </span>
      </span>

      {/* Aro de la lente */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="hero-lens pointer-events-none absolute left-0 top-0 opacity-0"
        style={{ width: LENS_RADIUS * 2, height: LENS_RADIUS * 2 }}
      >
        <span className="absolute left-1/2 top-0 h-2.5 w-px -translate-x-1/2 bg-white" />
        <span className="absolute bottom-0 left-1/2 h-2.5 w-px -translate-x-1/2 bg-white" />
        <span className="absolute left-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-white" />
        <span className="absolute right-0 top-1/2 h-px w-2.5 -translate-y-1/2 bg-white" />
        <span
          ref={coordRef}
          className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.14em] text-white/85"
        >
          X 0000 · Y 0000
        </span>
      </div>
    </section>
  )
}
