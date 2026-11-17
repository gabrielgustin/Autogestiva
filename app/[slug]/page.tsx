import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Check, Mail, MapPin, Phone } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { CtaButton, Eyebrow, Reveal } from "@/components/home/primitives"
import { contact, projects } from "@/lib/site-data"
import { getService, services } from "@/lib/services"

const SITE_URL = "https://www.autogestiva.com.ar"
const container = "mx-auto max-w-[1320px] px-5 md:px-8"

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const service = getService((await params).slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: { canonical: `/${service.slug}` },
    openGraph: { title: service.metaTitle, description: service.metaDescription, url: `/${service.slug}` },
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const service = getService((await params).slug)
  if (!service) notFound()

  const url = `${SITE_URL}/${service.slug}`
  const whatsapp = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(service.whatsapp)}`
  const shown = service.projectNames.flatMap((n) => projects.filter((p) => p.name === n))
  const others = services.filter((s) => s.slug !== service.slug)

  // Datos estructurados: migas de pan, el servicio y las preguntas frecuentes
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: service.eyebrow, item: url },
        ],
      },
      {
        "@type": "Service",
        name: service.h1,
        description: service.metaDescription,
        url,
        provider: { "@id": `${SITE_URL}/#empresa` },
        areaServed: { "@type": "Country", name: "Argentina" },
      },
      {
        "@type": "FAQPage",
        mainEntity: service.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-paper font-sans text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />

      <main>
        {/* Cabecera */}
        <section className="bg-blueprint relative border-b border-line">
          <div className={`${container} pb-16 pt-12 md:pb-24 md:pt-20`}>
            <nav aria-label="Miga de pan" className="text-sm text-muted-ink">
              <a href="/" className="hover:text-ink">Inicio</a> <span className="mx-1.5">/</span>
              <span className="text-ink">{service.eyebrow}</span>
            </nav>
            <div className="mt-8">
              <Eyebrow>{service.eyebrow}</Eyebrow>
            </div>
            <h1 className="font-display h-mega mt-5 max-w-5xl text-balance">{service.h1}</h1>
            <p className="mt-7 max-w-2xl text-pretty text-lg leading-relaxed text-muted-ink md:text-xl">{service.intro}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <CtaButton href={whatsapp}>Cotizá tu proyecto</CtaButton>
              <a href="#preguntas" className="text-[15px] font-medium text-ink/75 underline-offset-4 hover:underline">
                Ver preguntas frecuentes
              </a>
            </div>
          </div>
        </section>

        {/* Qué incluye */}
        <section className="py-20 md:py-28">
          <div className={container}>
            <Reveal>
              <Eyebrow index="01">Qué incluye</Eyebrow>
              <h2 className="font-display h-section mt-5 max-w-3xl text-balance">Todo lo que necesitás, resuelto</h2>
            </Reveal>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {service.includes.map((item) => (
                <div key={item.title} className="bg-white p-7">
                  <h3 className="font-display text-xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-2.5 leading-relaxed text-muted-ink">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Para quién + proceso */}
        <section className="border-y border-line bg-white py-20 md:py-28">
          <div className={`${container} grid gap-16 lg:grid-cols-2`}>
            <div>
              <Eyebrow index="02">Para quién es</Eyebrow>
              <h2 className="font-display h-section mt-5 text-balance">Pensado para tu tipo de negocio</h2>
              <ul className="mt-8 space-y-4">
                {service.forWho.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-orange-500" />
                    <span className="text-lg leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow index="03">Cómo trabajamos</Eyebrow>
              <h2 className="font-display h-section mt-5 text-balance">De la idea al lanzamiento en 3 pasos</h2>
              <ol className="mt-8 space-y-6">
                {service.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-5">
                    <span className="font-mono text-sm text-orange-700">0{i + 1}</span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-tight">{step.title}</h3>
                      <p className="mt-1.5 leading-relaxed text-muted-ink">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* Proyectos del rubro */}
        {shown.length > 0 && (
          <section className="py-20 md:py-28">
            <div className={container}>
              <Eyebrow index="04">Trabajos reales</Eyebrow>
              <h2 className="font-display h-section mt-5 text-balance">Proyectos que hicimos</h2>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {shown.map((p) => (
                  <article key={p.name} className="overflow-hidden rounded-2xl border border-line bg-white">
                    {p.desktop && (
                      <img
                        src={p.desktop}
                        alt={`Captura del sitio de ${p.name}, realizado por Autogestiva`}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover object-top"
                      />
                    )}
                    <div className="p-6">
                      <h3 className="font-display text-xl font-semibold tracking-tight">{p.name}</h3>
                      {p.type && <p className="mt-1 text-sm text-muted-ink">{p.type}</p>}
                      {p.description && <p className="mt-3 leading-relaxed text-muted-ink">{p.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Preguntas frecuentes */}
        <section id="preguntas" className="border-t border-line bg-white py-20 md:py-28">
          <div className={`${container} max-w-4xl`}>
            <Eyebrow index="05">Preguntas frecuentes</Eyebrow>
            <h2 className="font-display h-section mt-5 text-balance">Lo que más nos preguntan</h2>
            <div className="mt-10 divide-y divide-line border-y border-line">
              {service.faqs.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold">
                    {f.q}
                    <span className="text-2xl font-light text-orange-500 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-3 max-w-3xl leading-relaxed text-muted-ink">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="bg-ink py-20 text-white md:py-28">
          <div className={container}>
            <h2 className="font-display h-section max-w-3xl text-balance">¿Hablamos de tu proyecto?</h2>
            <p className="mt-5 max-w-xl text-lg text-white/70">
              Contanos qué necesitás y te respondemos con una propuesta clara, sin compromiso.
            </p>
            <div className="mt-9">
              <CtaButton href={whatsapp} variant="light">Escribinos por WhatsApp</CtaButton>
            </div>
            <div className="mt-14 border-t border-white/10 pt-8">
              <p className="eyebrow text-white/65">Otros servicios</p>
              <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
                {others.map((s) => (
                  <li key={s.slug}>
                    <a href={`/${s.slug}`} className="text-white/80 underline-offset-4 hover:text-white hover:underline">
                      {s.eyebrow}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-ink text-white">
        <div className={`${container} border-t border-white/10 py-8`}>
          <ul className="flex flex-col gap-3 text-sm text-white/75 sm:flex-row sm:flex-wrap sm:gap-x-8">
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-brand-soft" />{contact.location}</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-brand-soft" /><a href={`mailto:${contact.email}`} className="hover:text-white">{contact.email}</a></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-brand-soft" /><a href={contact.phoneHref} className="hover:text-white">{contact.phoneLabel}</a></li>
          </ul>
          <p className="mt-6 text-sm text-white/65">© {new Date().getFullYear()} Autogestiva. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
