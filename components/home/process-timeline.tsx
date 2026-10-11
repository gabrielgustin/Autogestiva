"use client"

import { useEffect, useRef } from "react"
import type { LucideIcon } from "lucide-react"
import { Reveal } from "@/components/home/primitives"

type Step = { title: string; description: string; icon: LucideIcon; tags: string[] }

const clamp = (n: number) => Math.min(1, Math.max(0, n))

/*
 * La línea de tiempo se "carga" con el scroll: cada paso recibe su progreso (0 a 1)
 * en la variable CSS --p, que se escribe directo en el DOM para no re-renderizar.
 * En escritorio los tres pasos forman una sola línea que se llena de izquierda a derecha;
 * en mobile, cada paso se llena al pasar por la pantalla.
 */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const items = Array.from(list.children) as HTMLElement[]

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((li) => li.style.setProperty("--p", "1"))
      return
    }

    const desktop = window.matchMedia("(min-width: 1024px)")
    const target = items.map(() => 0)
    const current = items.map(() => 0)
    let frame = 0

    // Calcula hasta dónde debería llegar cada paso según el scroll (recorrido largo = animación más calma)
    const measure = () => {
      const vh = window.innerHeight
      if (desktop.matches) {
        const top = list.getBoundingClientRect().top
        const g = clamp((vh * 0.85 - top) / Math.min(vh * 0.9, 900))
        items.forEach((_, i) => (target[i] = clamp(g * items.length - i)))
      } else {
        items.forEach((li, i) => {
          const r = li.getBoundingClientRect()
          target[i] = clamp((vh * 0.85 - r.top) / Math.min(r.height * 0.9, vh * 0.75))
        })
      }
    }

    // Acerca el valor mostrado al objetivo de a poco, para que la línea "persiga" el scroll con suavidad
    const tick = () => {
      frame = 0
      measure()
      let moving = false
      items.forEach((li, i) => {
        const diff = target[i] - current[i]
        if (Math.abs(diff) > 0.0005) {
          current[i] += diff * 0.08
          moving = true
        } else {
          current[i] = target[i]
        }
        li.style.setProperty("--p", current[i].toFixed(4))
      })
      if (moving) frame = requestAnimationFrame(tick)
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    measure()
    items.forEach((li, i) => {
      current[i] = target[i]
      li.style.setProperty("--p", target[i].toFixed(4))
    })
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    return () => {
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <ol ref={listRef} className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-0">
      {steps.map((step, index) => {
        const Icon = step.icon
        const last = index === steps.length - 1
        return (
          <li key={step.title} style={{ ["--p" as string]: 0 }}>
            <Reveal delay={0.12 * index} className="h-full">
              {/* Línea de tiempo: la bolita viaja en la punta de la línea que se llena */}
              <div className="relative h-4">
                <span className="absolute inset-x-0 top-1/2 h-px bg-ink/15" />
                <span
                  className={`absolute left-0 top-1/2 h-px ${
                    last ? "bg-gradient-to-r from-orange-500 to-transparent" : "bg-orange-500"
                  }`}
                  style={{ width: "calc(0.5rem + var(--p) * (100% - 1rem))" }}
                />
                <span className="absolute inset-y-0 left-0 w-[calc(100%-1rem)]">
                  <span
                    className="absolute top-0 h-4 w-4 rounded-full bg-orange-500"
                    style={{ left: "calc(var(--p) * 100%)" }}
                  >
                    <span className="absolute inset-0 animate-ping rounded-full bg-orange-500/40" />
                  </span>
                </span>
              </div>
              <div className="pt-8 lg:pr-12">
                <div className="flex items-end justify-between">
                  <span
                    className="font-display text-[5.5rem] font-bold leading-[0.8] tracking-tighter text-transparent md:text-[7rem]"
                    style={{ WebkitTextStroke: "1.5px #0057b8" }}
                  >
                    0{index + 1}
                  </span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                </div>
                <h3 className="font-display mt-8 text-2xl font-semibold tracking-tight md:text-3xl">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-ink">{step.description}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {step.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
