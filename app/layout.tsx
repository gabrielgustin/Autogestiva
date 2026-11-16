import type React from "react"
import "./globals.css"
import type { Metadata, Viewport } from "next"
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"
import { contact } from "@/lib/site-data"

const SITE_URL = "https://www.autogestiva.com.ar"
const TITLE = "Desarrollo web y sistemas a medida en Córdoba | Autogestiva"
const DESCRIPTION =
  "Agencia de desarrollo web en Córdoba, Argentina. Hacemos páginas web, tiendas online, cartas digitales y sistemas de gestión (ERP) a medida, para clientes de todo el país. Pedí tu presupuesto."

// Datos estructurados para que Google entienda quiénes somos, qué hacemos y dónde
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#empresa`,
      name: "Autogestiva",
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo-autogestiva.png`,
      image: `${SITE_URL}/og.png`,
      description: DESCRIPTION,
      email: contact.email,
      telephone: contact.phoneHref.replace("tel:", ""),
      priceRange: "$$",
      address: { "@type": "PostalAddress", addressLocality: "Córdoba", addressRegion: "Córdoba", addressCountry: "AR" },
      areaServed: [
        { "@type": "City", name: "Córdoba" },
        { "@type": "Country", name: "Argentina" },
      ],
      knowsAbout: ["Desarrollo web", "Diseño web", "Tiendas online", "Sistemas de gestión", "ERP", "SEO", "Cartas digitales"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios",
        itemListElement: [
          "Desarrollo de páginas web a medida",
          "Landing pages",
          "Tiendas online y e-commerce",
          "Sistemas de gestión (ERP) a medida",
          "Catálogos y cartas digitales",
        ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#web`,
      url: SITE_URL,
      name: "Autogestiva",
      inLanguage: "es-AR",
      publisher: { "@id": `${SITE_URL}/#empresa` },
    },
  ],
}

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" })
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  keywords: [
    "desarrollo web",
    "desarrollo web Córdoba",
    "diseño de páginas web",
    "programador web",
    "agencia de desarrollo web",
    "páginas web",
    "tiendas online",
    "e-commerce",
    "ERP",
    "sistemas de gestión",
    "SEO",
    "Autogestiva",
    "Córdoba",
    "Argentina",
  ],
  openGraph: {
    title: TITLE,
    description:
      "Páginas web, tiendas online y sistemas de gestión a medida que escalan con tu negocio.",
    type: "website",
    locale: "es_AR",
    siteName: "Autogestiva",
    url: "/",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Autogestiva · Soluciones digitales que escalan tu negocio" }],
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
}

export const viewport: Viewport = {
  themeColor: "#0057b8",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`scroll-smooth bg-paper ${geist.variable} ${geistMono.variable} ${bricolage.variable}`}
    >
      <body className={geist.className}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  )
}
