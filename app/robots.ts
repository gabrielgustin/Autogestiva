import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/administracion", "/api/"] },
    sitemap: "https://www.autogestiva.com.ar/sitemap.xml",
    host: "https://www.autogestiva.com.ar",
  }
}
