"use client"

import type React from "react"
import { useState } from "react"
import { Check, Mail, MapPin, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/home/hero"
import { ProjectsGallery } from "@/components/home/projects-gallery"
import { ProcessTimeline } from "@/components/home/process-timeline"
import { ClientsScroller } from "@/components/home/clients-scroller"
import { DashboardMockup } from "@/components/home/mockups"
import { ChatPreview, type ChatField } from "@/components/home/chat-preview"
import { ServicesGrid } from "@/components/home/services-grid"
import { SolutionsDeck } from "@/components/home/solutions-deck"
import { ScrollFillText, SplitHeading, Spotlight, Tilt } from "@/components/home/effects"
import { CtaButton, Eyebrow, Reveal, WhatsAppIcon, scrollToSection, useOnScreen } from "@/components/home/primitives"
import {
  contact,
  erpFeatures,
  footerSolutions,
  processSteps,
  techStack,
} from "@/lib/site-data"

const container = "mx-auto max-w-[1320px] px-5 md:px-8"

export default function HomePage() {
  const { ref: techRef, onScreen: techOnScreen } = useOnScreen<HTMLDivElement>()
  const [nombre, setNombre] = useState("")
  const [apellido, setApellido] = useState("")
  const [consulta, setConsulta] = useState("")
  const [activeField, setActiveField] = useState<ChatField>(null)

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hola, mi nombre es ${nombre} ${apellido}. Mi consulta es: ${consulta}`
    const whatsappUrl = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const goToContact = () => scrollToSection("contacto")

  const inputClass =
    "block w-full rounded-none border-0 border-b border-ink/20 bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-brand"

  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink">
      <Navbar />

      <main>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <Hero onCta={goToContact} />

        {/* ── Portfolio ────────────────────────────────────────── */}
        <ProjectsGallery />

        {/* ── Tech marquee ─────────────────────────────────────── */}
        <section className="border-y border-line bg-white py-7">
          <p className="eyebrow mb-6 text-center text-muted-ink">Construido con tecnologías modernas</p>
          <div ref={techRef} className="marquee-mask relative overflow-hidden">
            <div
              className="animate-marquee flex w-max items-center"
              style={{ animationPlayState: techOnScreen ? "running" : "paused" }}
            >
              {[...techStack, ...techStack].map((tech, i) => (
                <span key={i} className="flex items-center whitespace-nowrap">
                  <span className="font-display px-7 text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    {tech}
                  </span>
                  <span className="font-mono text-lg text-orange-500">/</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── Services ─────────────────────────────────────────── */}
        <section id="servicios" className="scroll-mt-20 py-24 md:py-32">
          <div className={container}>
            <Eyebrow index="02">Servicios</Eyebrow>
            <SplitHeading className="font-display h-section mt-5 max-w-3xl text-balance">
              Todo lo que tu presencia digital necesita
            </SplitHeading>
            <ScrollFillText className="font-display mt-8 max-w-4xl text-balance text-[clamp(1.35rem,2.6vw,2.15rem)] font-medium leading-[1.25] tracking-tight text-ink">
              Un equipo, todas las piezas: diseño, desarrollo, rendimiento y posicionamiento bajo un mismo criterio técnico.
            </ScrollFillText>

            <ServicesGrid />
          </div>
        </section>

        {/* ── Solutions ────────────────────────────────────────── */}
        <section id="soluciones" className="scroll-mt-20 border-t border-line bg-paper-2 py-24 md:py-32">
          <div className={container}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow index="03">Soluciones</Eyebrow>
                <SplitHeading className="font-display h-section mt-5 text-balance">
                  Soluciones a medida para cada tipo de negocio
                </SplitHeading>
              </div>
              <Reveal delay={0.15} className="lg:col-span-5">
                <p className="text-lg text-muted-ink">
                  Desde una landing que convierte hasta un ERP que automatiza tu operación. Elegimos el camino correcto
                  para vos.
                </p>
              </Reveal>
            </div>

            <SolutionsDeck />
          </div>
        </section>

        {/* ── Sistemas de gestión (ERP) ────────────────────────── */}
        <section id="sistemas" className="scroll-mt-20 border-y border-line bg-white py-24 md:py-32">
          <div className={container}>
            <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-20">
              <Reveal className="order-2 pb-8 lg:order-1">
                <Tilt>
                  <DashboardMockup />
                </Tilt>
              </Reveal>
              <Reveal delay={0.1} className="order-1 lg:order-2">
                <Eyebrow index="04">ERP / Sistemas de gestión</Eyebrow>
                <SplitHeading className="font-display h-section mt-5 text-balance">
                  Sistemas de gestión que impulsan tu operación
                </SplitHeading>
                <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-ink">
                  Desarrollamos plataformas internas a medida que automatizan tareas y digitalizan procesos clave.
                  Nuestros sistemas ayudaron a empresas a reducir hasta un 80% del tiempo operativo, mejorando su
                  seguridad, eficiencia y rentabilidad.
                </p>
                <div className="mt-9">
                  <CtaButton onClick={goToContact} variant="ink">
                    Contactanos
                  </CtaButton>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.1} className="mt-20">
              <div className="grid grid-cols-1 border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
                {erpFeatures.map((f) => {
                  const Icon = f.icon
                  return (
                    <div key={f.title} className="border-b border-r border-line p-6 md:p-7">
                      <Icon className="h-6 w-6 text-brand" />
                      <p className="font-display mt-5 text-xl font-semibold tracking-tight">{f.title}</p>
                      <p className="mt-1.5 text-[15px] text-muted-ink">{f.text}</p>
                    </div>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Process ──────────────────────────────────────────── */}
        <section id="como-funciona" className="scroll-mt-20 py-24 md:py-32">
          <div className={container}>
            <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow index="05">Proceso</Eyebrow>
                <SplitHeading className="font-display h-section mt-5 text-balance">
                  De la idea al lanzamiento en 3 pasos
                </SplitHeading>
              </div>
              <p className="text-lg text-muted-ink lg:col-span-5">
                Un camino claro y transparente. Así acompañamos tu proyecto desde la primera charla hasta que estás
                online.
              </p>
            </Reveal>

            <ProcessTimeline steps={processSteps} />
          </div>
        </section>

        {/* ── Clients ──────────────────────────────────────────── */}
        <section id="clientes" className="scroll-mt-20 border-t border-line bg-paper-2 py-24 md:py-28">
          <div className={container}>
            <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <Eyebrow index="06">Clientes</Eyebrow>
                <SplitHeading className="font-display h-section mt-5 text-balance">
                  Marcas que ya confían en nosotros
                </SplitHeading>
              </div>
              <p className="text-lg text-muted-ink lg:col-span-5">
                Negocios de rubros muy distintos eligieron nuestras soluciones digitales para crecer.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-14">
            <ClientsScroller />
          </Reveal>
        </section>

        {/* ── CTA band ─────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-brand py-24 text-white md:py-32">
          <div className="bg-blueprint-inv pointer-events-none absolute inset-0" />
          <div
            className="pointer-events-none absolute -bottom-40 -right-20 h-[620px] w-[620px]"
            style={{ background: "radial-gradient(closest-side, #00376f, transparent)" }}
          />
          {/* la grilla se enciende cerca del cursor */}
          <Spotlight className="bg-blueprint-spot" />
          <div className={`${container} relative`}>
            <SplitHeading className="font-display h-mega max-w-5xl text-balance">
              ¿Listo para transformar tu presencia digital?
            </SplitHeading>
            <Reveal delay={0.25}>
              <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <p className="max-w-xl text-lg text-white/85 md:text-xl">
                  Asesoría gratuita para entender qué solución necesita tu negocio. Sin complicaciones, entrega rápida
                  y con soporte incluido.
                </p>
                <CtaButton onClick={goToContact} variant="light" className="shrink-0 self-start md:self-auto">
                  ¡Me interesa!
                </CtaButton>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <section id="contacto" className="scroll-mt-20 py-24 md:py-32">
          <div className={`${container} grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20`}>
            <Reveal>
              <Eyebrow index="07">Contacto</Eyebrow>
              <SplitHeading className="font-display h-section mt-5 text-balance">Hablemos de tu proyecto</SplitHeading>
              <p className="mt-6 max-w-md text-lg text-muted-ink">
                Contanos qué necesitás y te asesoramos sin cargo. Respondemos por WhatsApp a la brevedad.
              </p>
              {/* En pantallas grandes, el mensaje se ve armarse mientras se completa el formulario */}
              <div className="mt-12 hidden lg:block">
                <ChatPreview nombre={nombre} apellido={apellido} consulta={consulta} active={activeField} />
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="rounded-3xl border border-line bg-white p-7 shadow-[0_40px_80px_-45px_rgba(11,19,34,0.4)] md:p-10">
                <form onSubmit={handleWhatsAppSubmit} className="space-y-7">
                  <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                    <div>
                      <label htmlFor="nombre" className="eyebrow block text-muted-ink">
                        Nombre
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        onFocus={() => setActiveField("nombre")}
                        onBlur={() => setActiveField(null)}
                        autoComplete="given-name"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="apellido" className="eyebrow block text-muted-ink">
                        Apellido
                      </label>
                      <input
                        type="text"
                        id="apellido"
                        onFocus={() => setActiveField("apellido")}
                        onBlur={() => setActiveField(null)}
                        autoComplete="family-name"
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="consulta" className="eyebrow block text-muted-ink">
                      Tu consulta
                    </label>
                    <textarea
                      id="consulta"
                      onFocus={() => setActiveField("consulta")}
                      onBlur={() => setActiveField(null)}
                      rows={4}
                      value={consulta}
                      onChange={(e) => setConsulta(e.target.value)}
                      required
                      placeholder="Contanos qué tipo de proyecto tenés en mente..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-green-600 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-green-700 active:scale-[0.98]"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Enviar por WhatsApp
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="relative overflow-hidden bg-ink text-white">
        <div className={`${container} relative pb-10 pt-20`}>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <img
                src="/images/logo-autogestiva.png"
                alt="Logo Autogestiva"
                width={380}
                height={151}
                className="-ml-1 h-[72px] w-auto"
                style={{ filter: "brightness(0) invert(1)" }}
                loading="lazy"
                decoding="async"
              />
              <p className="mt-5 max-w-sm leading-relaxed text-white/70">
                Desarrollo web y sistemas de gestión a medida. Transformamos la presencia digital de tu negocio con
                tecnología moderna.
              </p>
            </div>

            <div className="md:col-span-4">
              <h3 className="eyebrow text-white/65">Soluciones</h3>
              <ul className="mt-5 space-y-3">
                {footerSolutions.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="text-white/75 transition-colors hover:text-white">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h3 className="eyebrow text-white/65">Contacto</h3>
              <ul className="mt-5 space-y-3">
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
                  <span className="text-white/75">{contact.location}</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
                  <a href={`mailto:${contact.email}`} className="break-all text-white/75 hover:text-white">
                    {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-1 h-4 w-4 shrink-0 text-brand-soft" />
                  <a href={contact.phoneHref} className="text-white/75 hover:text-white">
                    {contact.phoneLabel}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pr-16 pt-7 text-sm text-white/65 sm:flex-row sm:items-center sm:justify-between md:pr-20">
            <p>© {new Date().getFullYear()} Autogestiva. Todos los derechos reservados.</p>
            <a
              href={contact.adminUrl}
              className="transition-colors hover:text-white"
            >
              Acceso Admin
            </a>
          </div>
        </div>
      </footer>

      <a
        href={`https://wa.me/${contact.whatsappNumber}?text=Hola!`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30 transition-transform duration-300 hover:scale-110 hover:bg-green-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-green-500/40 md:bottom-6 md:right-6"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  )
}
