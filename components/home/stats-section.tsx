"use client"

import { useEffect, useState } from "react"
import { clients, projects } from "@/lib/site-data"
import { Eyebrow, Reveal, useInView } from "@/components/home/primitives"
import { SplitHeading } from "@/components/home/effects"

// Los números salen de las listas del sitio: al sumar un proyecto o un cliente se actualizan solos.
const stats = [
  { value: projects.length, label: "proyectos publicados" },
  { value: projects.filter((p) => p.url).length, label: "sitios online que podés visitar hoy" },
  { value: clients.length, label: "marcas que confían en nosotros" },
  { value: new Set(projects.map((p) => p.type).filter(Boolean)).size, label: "tipos de solución distintos" },
]

/* Cuenta de 0 al valor cuando entra en pantalla (sin animación si la persona la desactivó) */
function CountUp({ to }: { to: number }) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [n, setN] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to)
    const start = performance.now()
    const duration = 1400
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setN(Math.round(to * (1 - Math.pow(1 - t, 3))))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, to])

  return (
    <span ref={ref} aria-label={String(to)}>
      {n}
    </span>
  )
}

export function StatsSection() {
  return (
    <section id="numeros" className="relative scroll-mt-20 overflow-hidden bg-ink py-24 text-white md:py-32">
      <div className="bg-blueprint-inv pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-[1320px] px-5 md:px-8">
        <Eyebrow inverted>
          Autogestiva en números
        </Eyebrow>
        <SplitHeading className="font-display h-section mt-5 max-w-3xl text-balance">
          Proyectos reales, funcionando hoy
        </SplitHeading>

        <div className="mt-14 grid grid-cols-2 border-l border-t border-white/15 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="border-b border-r border-white/15 p-6 md:p-8">
              <p className="font-display text-6xl font-semibold leading-none tracking-tight md:text-7xl">
                <CountUp to={s.value} />
              </p>
              <p className="mt-4 max-w-[16rem] text-[15px] text-white/70">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
