import {
  BookOpen,
  Building2,
  Code2,
  Globe,
  LayoutDashboard,
  Lightbulb,
  MousePointerClick,
  Palette,
  Rocket,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  type LucideIcon,
} from "lucide-react"

export const contact = {
  location: "Córdoba, Argentina",
  email: "autogestiva.info@gmail.com",
  phoneLabel: "+54 9 351 268-1910",
  phoneHref: "tel:+5493512681910",
  whatsappNumber: "5493512681910",
  adminUrl: "/administracion",
}

export const navServices: { icon: LucideIcon; title: string; description: string; href: string }[] = [
  {
    icon: Globe,
    title: "Páginas web",
    description: "Sitios a medida que convierten visitas en clientes.",
    href: "/paginas-web-cordoba",
  },
  {
    icon: LayoutDashboard,
    title: "ERP / Sistemas de gestión",
    description: "Plataformas internas que automatizan tus procesos.",
    href: "/sistemas-de-gestion",
  },
  {
    icon: BookOpen,
    title: "Catálogos digitales y Cartas",
    description: "Mostrá tus productos de forma clara y autogestionable.",
    href: "/cartas-digitales",
  },
]

export const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Tailwind CSS",
  "WordPress",
  "Laravel",
  "PostgreSQL",
  "Vercel",
  "Supabase",
]

export const services: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: Palette,
    title: "Diseño web personalizado",
    description:
      "Trabajamos desde el wireframe hasta la identidad visual final. Pensamos cada sitio como una herramienta de marca: clara, funcional y alineada con tus objetivos.",
  },
  {
    icon: Search,
    title: "Optimización SEO",
    description:
      "Optimizamos estructura, velocidad y contenido para que Google (y tus clientes) te encuentren. Tráfico orgánico de calidad y mejores posiciones.",
  },
  {
    icon: Smartphone,
    title: "Diseño responsive",
    description:
      "Cada sitio se adapta a todos los dispositivos. Optimizamos la experiencia en mobile, tablet y desktop para que naveguen sin trabas.",
  },
  {
    icon: Server,
    title: "Hosting privado",
    description:
      "Servidores propios con monitoreo 24/7. Tiempos de carga rápidos, máxima seguridad y soporte especializado. Tu sitio siempre online.",
  },
]

export type Solution = {
  title: string
  description: string
  icon: LucideIcon
  features: string[]
  badge?: string
}

export const solutions: Solution[] = [
  {
    title: "Páginas Webs",
    description:
      "Páginas profesionales diseñadas para captar clientes y convertir visitas en ventas. Perfectas para lanzar productos, servicios o campañas puntuales.",
    icon: Globe,
    features: ["Diseño orientado a conversión", "Responsive y veloz", "Formularios de contacto", "SEO optimizado"],
  },
  {
    title: "Webs Institucionales",
    description:
      "Sitios corporativos que presentan tu empresa, servicios y equipo de forma profesional. Dan presencia formal y confianza a tu marca en internet.",
    icon: Building2,
    features: ["Presencia profesional", "Secciones institucionales", "Información de contacto", "Diseño a tu marca"],
  },
  {
    title: "ERP / Sistemas de gestión",
    description:
      "Plataformas internas a medida que automatizan tareas y digitalizan tus procesos clave. Menos trabajo manual, más control y eficiencia.",
    icon: LayoutDashboard,
    badge: "Nuevo",
    features: ["Automatización de procesos", "Roles y permisos", "Reportes en tiempo real", "Integraciones a medida"],
  },
  {
    title: "Catálogos / Cartas Digitales",
    description:
      "Catálogos autogestionables para emprendimientos y tiendas. Mostrá tus productos de forma atractiva, organizada y siempre actualizada.",
    icon: BookOpen,
    features: ["100% autogestionable", "Actualización en tiempo real", "Acceso por código QR", "Búsqueda y filtros"],
  },
]

export const erpFeatures: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MousePointerClick, title: "Automatización", text: "Menos tareas manuales, más foco." },
  { icon: ShieldCheck, title: "Roles y permisos", text: "Control total y datos seguros." },
  { icon: TrendingUp, title: "Reportes en vivo", text: "Decisiones con información real." },
  { icon: Code2, title: "A medida", text: "Se adapta a tus procesos, no al revés." },
]

export const processSteps: { title: string; description: string; icon: LucideIcon; tags: string[] }[] = [
  {
    title: "Análisis y Diseño",
    description:
      "Analizamos tus necesidades específicas y diseñamos una solución personalizada, alineada con tu marca y tus objetivos de negocio.",
    icon: Lightbulb,
    tags: ["Reunión inicial", "Objetivos", "Wireframes"],
  },
  {
    title: "Desarrollo",
    description:
      "Construimos tu solución con foco en la experiencia de usuario y la facilidad de gestión. Desarrollo ágil, transparente y con tecnología moderna.",
    icon: Rocket,
    tags: ["Diseño a medida", "Tecnología moderna", "Revisiones"],
  },
  {
    title: "Lanzamiento y Capacitación",
    description:
      "Lanzamos tu proyecto y te capacitamos para que gestiones el contenido de forma autónoma. Soporte continuo después del despegue.",
    icon: MousePointerClick,
    tags: ["Puesta online", "Capacitación", "Soporte continuo"],
  },
]

export type Client = {
  name: string
  logo: string
  url: string
  /** Fondo de la tarjeta del logo (cada logo necesita el suyo para leerse bien) */
  tile: string
  /** Los logos que ya vienen a color no se pasan a escala de grises */
  keepColor?: boolean
  /** Logos casi cuadrados necesitan más alto para leerse igual que los apaisados */
  tall?: boolean
}

export const clients: Client[] = [
  {
    name: "Traslados Jarabus",
    logo: "/images/clients/jarabus.jpg",
    url: "https://trasladosjarabus.com.ar",
    tile: "#000000",
  },
  {
    name: "Estudio Jurídico CONVS",
    logo: "/images/clients/convs.png",
    url: "https://estudiojuridicoconvs.com.ar",
    tile: "#2d3127",
  },
  {
    name: "Tempograss",
    logo: "/images/clients/tempograss.png",
    url: "https://tempograss.vercel.app",
    tile: "#0f172a",
  },
  {
    name: "SEA - Villada",
    logo: "/images/clients/sea-villada.png",
    url: "https://portalsea.com.ar/villada",
    tile: "#ffffff",
  },
  {
    name: "Gimnasio Life Gym",
    logo: "/images/clients/life-gym.png",
    url: "https://gimnasiolifegym.com.ar",
    tile: "#833d9f",
    keepColor: true,
  },
  {
    name: "Mara Saúl Estética",
    logo: "/images/clients/mara-saul.png",
    url: "https://v0-mara-saul.vercel.app",
    tile: "#0f172a",
  },
  {
    name: "Visual Henderson",
    logo: "/images/clients/visual-henderson.png",
    url: "https://visual-henderson.netlify.app",
    tile: "#040a15",
  },
  {
    name: "Cambel Red Jurídica",
    logo: "/images/clients/cambel.png",
    url: "https://cambelredjuridica.com.ar",
    tile: "#0f172a",
  },
  {
    name: "Zonabot Espacio Tecnológico",
    logo: "/images/clients/zonabot.png",
    url: "https://www.zonabot.com.ar",
    tile: "#f5d9a8",
    keepColor: true,
  },
  {
    name: "ITS Villada",
    logo: "/images/clients/its-villada.png",
    url: "#",
    tile: "#ffffff",
    keepColor: true,
    tall: true,
  },
  {
    name: "ITS Boutique",
    logo: "/images/clients/its-boutique.png",
    url: "#",
    tile: "#ffffff",
    keepColor: true,
    tall: true,
  },
  {
    name: "FA Automotores",
    logo: "/images/clients/fa-automotores.png",
    url: "https://automotores-federicoarce.vercel.app",
    tile: "#0a0a0a",
    keepColor: true,
  },
  {
    name: "Posty",
    logo: "/images/clients/posty.png",
    url: "https://www.posty.com.ar",
    tile: "#fff6e8",
    keepColor: true,
  },
]

export type Project = {
  name: string
  url?: string
  /** Tipo de solución, solo cuando está definido */
  type?: string
  description?: string
  /** Capturas reales del sitio en producción */
  desktop?: string
  /** Dirección que se muestra en el navegador del mockup, si no es la del sitio */
  desktopUrl?: string
  mobile?: string
  logo?: string
  /** Colores tomados de la marca de cada cliente */
  bg: string
  accent: string
  dark: boolean
}

export const projects: Project[] = [
  {
    name: "Wavi",
    url: "https://somoswavi.com",
    type: "Agencia de comunicación",
    description: "Sitio de una agencia de estrategia, contenido e influencers para marcas.",
    desktop: "/images/work/wavi.jpg",
    mobile: "/images/work/wavi-mobile.jpg",
    bg: "#1c0fb5",
    accent: "#ff7a1f",
    dark: true,
  },
  {
    name: "Jarabus",
    url: "https://trasladosjarabus.com.ar",
    type: "E-commerce",
    description: "Tienda online con reserva y venta de pasajes de forma autogestionable.",
    desktop: "/images/work/jarabus-web.jpg",
    mobile: "/images/work/jarabus-mobile.jpg",
    bg: "#100506",
    accent: "#e02424",
    dark: true,
  },
  {
    name: "JARA BUS Gestión",
    type: "Sistema de gestión",
    description: "Sistema interno de la empresa de traslados: agenda de viajes, choferes, planillas, cierres semanales y documentación.",
    desktop: "/images/work/jarabus-gestion.jpg",
    mobile: "/images/work/jarabus-gestion-mobile.jpg",
    bg: "#1c1917",
    accent: "#d6342c",
    dark: true,
  },
  {
    name: "Posty",
    url: "https://www.posty.com.ar",
    type: "Aplicación web",
    description: "Planifica y arma el contenido de Instagram de cada negocio, listo para aprobar y publicar.",
    desktopUrl: "posty.com.ar",
    desktop: "/images/work/posty.jpg",
    mobile: "/images/work/posty-mobile.jpg",
    bg: "#fff6e8",
    accent: "#ff6b4a",
    dark: false,
  },
  {
    name: "Colegio UTN",
    type: "Sistema de gestión",
    description: "Planificador de horarios escolares: grilla por curso y docente, aulas y detección automática de choques.",
    desktop: "/images/work/colegio-utn.jpg",
    mobile: "/images/work/colegio-utn-mobile.jpg",
    bg: "#0b2a8c",
    accent: "#8fb4ff",
    dark: true,
  },
  {
    name: "La Comanda",
    url: "https://lacomanda-xi.vercel.app",
    type: "Carta digital",
    description: "Menú o catálogo autogestionable, ideal para gastronomía y comercios.",
    desktop: "/images/work/la-comanda-web.jpg",
    mobile: "/images/work/la-comanda-mobile.jpg",
    bg: "#efe1cd",
    accent: "#4a2c20",
    dark: false,
  },
  {
    name: "Estudio Jurídico CONVS",
    url: "https://estudiojuridicoconvs.com.ar",
    type: "Página web",
    desktop: "/images/work/convs.jpg",
    mobile: "/images/work/convs-mobile.jpg",
    bg: "#2d3127",
    accent: "#c9a98c",
    dark: true,
  },
  {
    name: "FA Automotores",
    url: "https://automotores-federicoarce.vercel.app",
    type: "Concesionaria",
    description: "Catálogo de autos y motos con stock, financiación y contacto directo por WhatsApp.",
    desktop: "/images/work/federico-arce.jpg",
    mobile: "/images/work/federico-arce-mobile.jpg",
    bg: "#0a0a0a",
    accent: "#e5332a",
    dark: true,
  },
  {
    name: "Cambel Red Jurídica",
    url: "https://cambelredjuridica.com.ar",
    type: "Página web",
    description: "Sitio de una red de estudios jurídicos con especialidades y novedades legales.",
    desktop: "/images/work/cambel.jpg",
    mobile: "/images/work/cambel-mobile.jpg",
    bg: "#0a2b40",
    accent: "#eb654d",
    dark: true,
  },
  {
    name: "Santa Remera",
    url: "https://www.santaremera.com.ar",
    type: "Página web",
    description: "Remeras y buzos personalizados con diseñador en vivo y precio al instante.",
    desktop: "/images/work/santa-remera.jpg",
    mobile: "/images/work/santa-remera-mobile.jpg",
    bg: "#fbf1e6",
    accent: "#e86a2c",
    dark: false,
  },
  {
    name: "Zonabot",
    url: "https://www.zonabot.com.ar",
    type: "Web institucional",
    desktop: "/images/work/zonabot.jpg",
    mobile: "/images/work/zonabot-mobile.jpg",
    bg: "#f5d9a8",
    accent: "#e8792b",
    dark: false,
  },
  {
    name: "Inventarios ITS Villada",
    type: "Sistema de gestión",
    description: "Inventario de laboratorios y áreas del instituto: stock, mínimos, responsables e historial.",
    desktop: "/images/work/inventarios-villada.jpg",
    desktopUrl: "inventariosvillada.vercel.app/responsable",
    mobile: "/images/work/inventarios-villada-mobile.jpg",
    bg: "#1f6fb8",
    accent: "#3fd6c4",
    dark: true,
  },
  {
    name: "Cantina Digital",
    url: "https://www.grupoalgarbe.com.ar",
    type: "Catálogo digital",
    description: "Catálogo y pedidos online de la cantina del colegio: menú del día, snacks, bebidas y fotocopias.",
    desktop: "/images/work/cantina-savio.jpg",
    mobile: "/images/work/cantina-savio-mobile.jpg",
    bg: "#0f2a52",
    accent: "#2f6fd0",
    dark: true,
  },
  {
    name: "ITS Boutique",
    url: "https://its-boutique.vercel.app/app",
    type: "Catálogo digital",
    description: "Catálogo de la tienda del colegio: uniformes, herramientas y librería, con pedido por WhatsApp.",
    desktop: "/images/work/its-boutique.jpg",
    mobile: "/images/work/its-boutique-mobile.jpg",
    bg: "#1e4c8f",
    accent: "#e23b3b",
    dark: true,
  },
  {
    name: "Gestión Jurídica",
    type: "Sistema de gestión",
    description: "Software para estudios de abogados: expedientes, agenda de vencimientos, clientes, documentos y asistente con IA.",
    desktop: "/images/work/gestion-juridica.jpg",
    mobile: "/images/work/gestion-juridica-mobile.jpg",
    bg: "#1b2a4a",
    accent: "#d9b56a",
    dark: true,
  },
  {
    name: "Rumbo",
    url: "https://rumbo-alpha-rosy.vercel.app",
    type: "Página web",
    description: "Buscador de viajes por rango de fechas: compara vuelos, micros, paquetes y alojamientos.",
    desktop: "/images/work/rumbo.jpg",
    mobile: "/images/work/rumbo-mobile.jpg",
    bg: "#0e6670",
    accent: "#ff7a45",
    dark: true,
  },
  {
    name: "Life Gym",
    url: "https://gimnasiolifegym.com.ar",
    type: "Página web",
    description: "Sitio de un gimnasio con actividades, información del lugar y contacto directo.",
    desktop: "/images/work/life-gym.jpg",
    mobile: "/images/work/life-gym-mobile.jpg",
    bg: "#0a0a0a",
    accent: "#d9b3ff",
    dark: true,
  },
  {
    name: "Mara Saúl Estética",
    url: "https://v0-mara-saul.vercel.app",
    type: "Página web",
    description: "Centro de estética con cursos profesionales, buscador de cursos y contacto por WhatsApp.",
    desktop: "/images/work/mara-saul.jpg",
    mobile: "/images/work/mara-saul-mobile.jpg",
    bg: "#3d3fa3",
    accent: "#00967f",
    dark: true,
  },
  {
    name: "PipetLabor",
    url: "https://www.pipetlabor.com.ar",
    type: "Página web",
    description: "Laboratorio de calibración de micropipetas: servicios, productos y contacto.",
    desktop: "/images/work/pipetlabor.jpg",
    mobile: "/images/work/pipetlabor-mobile.jpg",
    bg: "#172a56",
    accent: "#0a4bff",
    dark: true,
  },
  {
    name: "La Comanda Tejeda",
    url: "https://web-lacomanda.vercel.app",
    type: "Página web",
    description: "Sitio del restaurante con carta, eventos y reservas de mesa.",
    desktop: "/images/work/la-comanda-web.jpg",
    mobile: "/images/work/la-comanda-web-mobile.jpg",
    bg: "#140d08",
    accent: "#d4a06a",
    dark: true,
  },
]

// Galería del home: selección y orden (de más a menos llamativo). Los proyectos que no están acá
// aparecen solo en las páginas de cada servicio.
const HOME_ORDER = [
  "Wavi",
  "Posty",
  "FA Automotores",
  "Cambel Red Jurídica",
  "Santa Remera",
  "Rumbo",
  "Cantina Digital",
  "La Comanda",
  "Jarabus",
  "Zonabot",
]
export const homeProjects = HOME_ORDER.map((name) => {
  const project = projects.find((p) => p.name === name)
  if (!project) throw new Error(`HOME_ORDER: no existe el proyecto "${name}"`)
  return project
})

export const footerSolutions = [
  { label: "Páginas web", href: "/paginas-web-cordoba" },
  { label: "ERP / Sistemas de gestión", href: "/sistemas-de-gestion" },
  { label: "Catálogos Digitales / Cartas Digitales", href: "/cartas-digitales" },
]

export const prettyUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/\/$/, "")
