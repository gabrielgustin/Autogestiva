"use client"

import { Clock } from "lucide-react"
import { BrowserFrame, useInView } from "@/components/home/primitives"

/* ── ERP: panel de gestión ───────────────────────────────────────────── */

const bars = [40, 65, 50, 80, 55, 90, 70]

export function DashboardMockup() {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const show = (delay: number) => ({
    className: inView ? "animate-build-in" : "opacity-0",
    style: inView ? { animationDelay: `${delay}s` } : undefined,
  })

  const panel = (
    <div className="flex">
      <div className="hidden w-14 shrink-0 space-y-3 bg-ink p-3 sm:block">
        <div className="h-8 w-8 rounded-lg bg-brand" />
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`h-2 w-full rounded ${i === 0 ? "bg-white/60" : "bg-white/15"}`} />
        ))}
      </div>
      <div className="flex-1 bg-white p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div {...show(0.05)}>
            <div className="h-3.5 w-32 rounded bg-ink" />
          </div>
          <div {...show(0.15)}>
            <div className="h-6 w-6 rounded-full bg-brand-light" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { c: "bg-brand", w: "w-2/3" },
            { c: "bg-orange-500", w: "w-1/2" },
            { c: "bg-green-500", w: "w-3/4" },
          ].map((k, i) => {
            const s = show(0.3 + i * 0.1)
            return (
              <div key={i} className={`${s.className} rounded-lg border border-ink/10 bg-paper p-3`} style={s.style}>
                <div className={`h-2 ${k.w} rounded bg-ink/15`} />
                <div className={`mt-2.5 h-4 w-12 rounded ${k.c}`} />
              </div>
            )
          })}
        </div>
        <div
          className={`mt-3 flex items-end gap-2 rounded-lg border border-ink/10 bg-paper p-3 h-32`}
        >
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t bg-gradient-to-t from-brand to-brand/50 ${inView ? "animate-grow-y" : "scale-y-0"}`}
              style={{ height: `${h}%`, animationDelay: `${0.6 + i * 0.07}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )

  return (
    <div ref={ref} className="relative">
      <BrowserFrame>{panel}</BrowserFrame>
      <div className="animate-float absolute -bottom-7 -left-2 flex items-center gap-3 rounded-2xl border border-ink/10 bg-white p-3.5 pr-5 shadow-xl md:-left-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 text-green-600">
          <Clock className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-xl font-bold leading-none text-ink">-80% tiempo</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-ink">operativo</p>
        </div>
      </div>
    </div>
  )
}
