import type { MetadataRoute } from "next"
import { services } from "@/lib/services"

const SITE = "https://www.autogestiva.com.ar"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...services.map((s) => ({ url: `${SITE}/${s.slug}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: 0.8 })),
  ]
}
