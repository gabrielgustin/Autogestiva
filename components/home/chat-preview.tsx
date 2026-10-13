"use client"

import { useEffect, useState } from "react"
import { WhatsAppIcon } from "@/components/home/primitives"
import { contact } from "@/lib/site-data"

export type ChatField = "nombre" | "apellido" | "consulta" | null

/* Espacio del mensaje: muestra lo escrito o, si está vacío, qué dato va ahí */
function Slot({ value, placeholder, active }: { value: string; placeholder: string; active: boolean }) {
  const filled = value.trim().length > 0
  return (
    <span
      className={
        filled
          ? "font-semibold text-ink"
          : `rounded px-1.5 py-0.5 text-ink/45 transition-colors duration-300 ${active ? "bg-brand/15 text-brand" : "bg-ink/[0.07]"}`
      }
    >
      {filled ? value : placeholder}
      {active && <span className="animate-blink ml-px inline-block h-[1.05em] w-px translate-y-[0.18em] bg-brand" />}
    </span>
  )
}

/*
 * Vista previa del mensaje que se va a abrir en WhatsApp: se arma en vivo con lo que la persona escribe
 * en el formulario, usando el mismo texto que después se envía.
 */
export function ChatPreview({
  nombre,
  apellido,
  consulta,
  active,
}: {
  nombre: string
  apellido: string
  consulta: string
  active: ChatField
}) {
  // la hora se completa en el navegador para que el HTML del servidor y el del cliente coincidan
  const [time, setTime] = useState("")
  useEffect(() => {
    const update = () => setTime(new Date().toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit", hour12: false }))
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [])

  const ready = Boolean(nombre.trim() && apellido.trim() && consulta.trim())

  return (
    <div aria-hidden="true" className="max-w-md">
      <p className="eyebrow mb-4 flex items-center gap-3 text-muted-ink">
        <span className="h-px w-8 bg-ink/25" />
        Vista previa del mensaje
      </p>
      <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_80px_-50px_rgba(11,19,34,0.45)]">
        <div className="flex items-center gap-3 bg-ink px-5 py-4 text-white">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500">
            <WhatsAppIcon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="font-display text-[15px] font-semibold leading-tight">Autogestiva</p>
            <p className="font-mono text-[11px] text-white/60">{contact.phoneLabel}</p>
          </div>
        </div>

        <div className="bg-blueprint bg-paper px-5 pb-6 pt-7">
          <div
            className={`relative ml-auto max-w-[92%] rounded-2xl rounded-tr-sm px-4 py-3 text-[15px] leading-relaxed text-ink/80 shadow-sm transition-colors duration-500 ${
              ready ? "bg-[#d9fdd3]" : "bg-white"
            }`}
          >
            Hola, mi nombre es <Slot value={nombre} placeholder="Nombre" active={active === "nombre"} />{" "}
            <Slot value={apellido} placeholder="Apellido" active={active === "apellido"} />. Mi consulta es:{" "}
            <Slot value={consulta} placeholder="Tu consulta" active={active === "consulta"} />
            <span className="mt-1 block text-right font-mono text-[10px] text-ink/45">{time || " "}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
