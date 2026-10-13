"use client"

import { useEffect, useRef } from "react"
import { services } from "@/lib/site-data"
import { Reveal } from "@/components/home/primitives"

/*
 * Grilla de servicios: al pasar el cursor, la tinta se expande desde el punto exacto por donde entró
 * y se retira hacia donde salió. En pantallas táctiles se activa la tarjeta que pasa por el centro.
 */
export function ServicesGrid() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    const cards = Array.from(grid.querySelectorAll<HTMLElement>("[data-service]"))

    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const setOrigin = (card: HTMLElement, e: PointerEvent) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty("--ox", `${(((e.clientX - rect.left) / rect.width) * 100).toFixed(1)}%`)
        card.style.setProperty("--oy", `${(((e.clientY - rect.top) / rect.height) * 100).toFixed(1)}%`)
      }
      const cleanups = cards.map((card) => {
        const enter = (e: PointerEvent) => {
          setOrigin(card, e)
          card.dataset.active = "true"
        }
        const leave = (e: PointerEvent) => {
          setOrigin(card, e)
          card.dataset.active = "false"
        }
        card.addEventListener("pointerenter", enter)
        card.addEventListener("pointerleave", leave)
        return () => {
          card.removeEventListener("pointerenter", enter)
          card.removeEventListener("pointerleave", leave)
        }
      })
      return () => cleanups.forEach((fn) => fn())
    }

    // Táctil: una franja angosta en el centro de la pantalla decide cuál está activa
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ;(entry.target as HTMLElement).dataset.active = entry.isIntersecting ? "true" : "false"
        })
      },
      { rootMargin: "-46% 0px -46% 0px" },
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={gridRef} className="mt-14 grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service, index) => {
        const Icon = service.icon
        return (
          <Reveal key={service.title} delay={0.07 * index} className="h-full">
            <article
              data-service
              data-active="false"
              className="service-card group relative flex h-full flex-col overflow-hidden border-b border-r border-line p-7 md:p-8"
            >
              <span aria-hidden="true" className="service-ink absolute inset-0 bg-ink" />
              <span
                aria-hidden="true"
                className="bg-blueprint-inv absolute inset-0 opacity-0 transition-opacity duration-700 group-data-[active=true]:opacity-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand transition-all duration-500 group-data-[active=true]:-rotate-6 group-data-[active=true]:scale-110 group-data-[active=true]:bg-brand group-data-[active=true]:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-mono text-xs text-ink/55 transition-colors duration-500 group-data-[active=true]:text-white/60">
                  0{index + 1}
                </span>
              </div>
              <h3 className="font-display relative mt-10 text-2xl font-semibold leading-tight tracking-tight transition-colors duration-500 group-data-[active=true]:text-white">
                {service.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted-ink transition-colors duration-500 group-data-[active=true]:text-white/70">
                {service.description}
              </p>
              <span className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-orange-500 transition-transform duration-700 group-data-[active=true]:scale-x-100" />
            </article>
          </Reveal>
        )
      })}
    </div>
  )
}
