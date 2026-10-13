"use client"

import type React from "react"
import { Fragment, useEffect, useRef } from "react"
import { useInView } from "@/components/home/primitives"

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
const hasFinePointer = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches

/* Titular que entra palabra por palabra, cada una subiendo desde su propia línea */
export function SplitHeading({
  as: Tag = "h2",
  className = "",
  children,
  delay = 0,
}: {
  as?: "h2" | "h3" | "p"
  className?: string
  children: string
  delay?: number
}) {
  const { ref, inView } = useInView<HTMLHeadingElement>(0.35)
  const words = children.split(" ")

  return (
    <Tag ref={ref} className={`split ${inView ? "is-in" : ""} ${className}`}>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="split-word">
            <span style={{ transitionDelay: `${delay + i * 0.05}s` }}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  )
}

/* Texto que se va "encendiendo" palabra por palabra a medida que se hace scroll */
export function ScrollFillText({ children, className = "" }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const words = children.split(" ")

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      el.style.setProperty("--fill", "2")
      return
    }

    let frame = 0
    let active = false
    const update = () => {
      frame = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // empieza cuando el texto asoma por abajo y termina un poco antes de llegar al centro
      const progress = clamp((vh * 0.9 - rect.top) / (vh * 0.42 + rect.height))
      el.style.setProperty("--fill", (progress * 1.25).toFixed(3))
    }
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update)
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) update()
      },
      { rootMargin: "15% 0px" },
    )
    observer.observe(el)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <p ref={ref} className={className} style={{ ["--fill" as string]: 0 }}>
      {words.map((word, i) => (
        <span key={i} className="fill-word" style={{ ["--i" as string]: (i / words.length).toFixed(3) }}>
          {word}{" "}
        </span>
      ))}
    </p>
  )
}

/*
 * Foco de luz que sigue al cursor sobre la sección que lo contiene.
 * Se usa con una capa de grilla más brillante: solo se ve cerca del cursor.
 */
export function Spotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    const host = el?.parentElement
    if (!el || !host || !hasFinePointer()) return

    let frame = 0
    let x = 0
    let y = 0
    const apply = () => {
      frame = 0
      el.style.setProperty("--sx", `${x.toFixed(0)}px`)
      el.style.setProperty("--sy", `${y.toFixed(0)}px`)
      el.style.opacity = "1"
    }
    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect()
      x = e.clientX - rect.left
      y = e.clientY - rect.top
      if (!frame) frame = requestAnimationFrame(apply)
    }
    const onLeave = () => {
      el.style.opacity = "0"
    }
    host.addEventListener("pointermove", onMove)
    host.addEventListener("pointerleave", onLeave)
    return () => {
      host.removeEventListener("pointermove", onMove)
      host.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <div ref={ref} aria-hidden="true" className={`spotlight pointer-events-none absolute inset-0 ${className}`} />
}

/* Inclina el contenido en 3D siguiendo al cursor; los hijos con translateZ ganan profundidad */
export function Tilt({
  children,
  className = "",
  max = 7,
}: {
  children: React.ReactNode
  className?: string
  max?: number
}) {
  const outerRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const inner = innerRef.current
    if (!outer || !inner || !hasFinePointer() || prefersReducedMotion()) return

    let rx = 0
    let ry = 0
    let trx = 0
    let try_ = 0
    let frame = 0
    const tick = () => {
      frame = 0
      rx += (trx - rx) * 0.1
      ry += (try_ - ry) * 0.1
      const settled = Math.abs(trx - rx) < 0.02 && Math.abs(try_ - ry) < 0.02
      inner.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`
      if (!settled) frame = requestAnimationFrame(tick)
    }
    const run = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      const rect = outer.getBoundingClientRect()
      const px = clamp((e.clientX - rect.left) / rect.width) - 0.5
      const py = clamp((e.clientY - rect.top) / rect.height) - 0.5
      try_ = px * 2 * max
      trx = -py * 2 * max
      run()
    }
    const onLeave = () => {
      trx = 0
      try_ = 0
      run()
    }
    outer.addEventListener("pointermove", onMove)
    outer.addEventListener("pointerleave", onLeave)
    return () => {
      outer.removeEventListener("pointermove", onMove)
      outer.removeEventListener("pointerleave", onLeave)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [max])

  return (
    <div ref={outerRef} className={className} style={{ perspective: "1400px" }}>
      <div ref={innerRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {children}
      </div>
    </div>
  )
}
