// Contenido de las páginas por servicio (/paginas-web-cordoba, etc.). Cada una apunta a una búsqueda concreta.
export type Service = {
  slug: string
  /** Título de la pestaña y de Google */
  metaTitle: string
  metaDescription: string
  eyebrow: string
  h1: string
  intro: string
  includes: { title: string; text: string }[]
  forWho: string[]
  steps: { title: string; text: string }[]
  /** Nombres de proyectos de lib/site-data.ts */
  projectNames: string[]
  faqs: { q: string; a: string }[]
  /** Mensaje que llega por WhatsApp al tocar "Cotizar" */
  whatsapp: string
}

export const services: Service[] = [
  {
    slug: "paginas-web-cordoba",
    metaTitle: "Diseño de páginas web en Córdoba | Autogestiva",
    metaDescription:
      "Diseñamos páginas web a medida en Córdoba: institucionales, landing pages y sitios para profesionales y empresas. Rápidas, seguras y listas para aparecer en Google.",
    eyebrow: "Páginas web a medida",
    h1: "Diseño de páginas web en Córdoba",
    intro:
      "Hacemos sitios web profesionales para empresas, estudios y comercios de Córdoba y de todo el país. Código propio, diseño a tu marca y pensados desde el primer día para aparecer en Google y convertir visitas en consultas.",
    includes: [
      { title: "Diseño a medida", text: "Nada de plantillas genéricas: el sitio se diseña con tu marca, tus colores y tu forma de comunicar." },
      { title: "Rápida y adaptada al celular", text: "Se ve y carga bien en cualquier dispositivo, algo que Google tiene muy en cuenta al posicionar." },
      { title: "Preparada para Google (SEO)", text: "Títulos, descripciones, datos estructurados y mapa del sitio configurados desde el inicio." },
      { title: "Formulario y WhatsApp", text: "Tus clientes te escriben directo, sin vueltas, y la consulta te llega ordenada." },
      { title: "Dominio, hosting y certificado", text: "Nos ocupamos de publicarla y dejarla funcionando con HTTPS." },
      { title: "Autogestionable si lo necesitás", text: "Si querés cambiar textos o novedades por tu cuenta, armamos un panel simple." },
    ],
    forWho: [
      "Empresas y pymes que quieren presentarse con una imagen profesional",
      "Estudios jurídicos, contables y profesionales independientes",
      "Comercios y negocios que hoy dependen solo de redes sociales",
      "Quienes necesitan una landing page para una campaña o un lanzamiento",
    ],
    steps: [
      { title: "Conversamos", text: "Entendemos tu negocio, qué querés lograr y quiénes son tus clientes." },
      { title: "Diseñamos y desarrollamos", text: "Te mostramos avances y ajustamos antes de publicar." },
      { title: "Publicamos y acompañamos", text: "La dejamos online, medimos cómo funciona y seguimos mejorándola." },
    ],
    projectNames: ["Wavi", "Jarabus", "Posty", "Estudio Jurídico CONVS", "FA Automotores", "Cambel Red Jurídica", "Santa Remera", "Zonabot", "La Comanda Tejeda", "Rumbo"],
    faqs: [
      { q: "¿Cuánto cuesta una página web?", a: "Depende de cuántas secciones necesite y si lleva funciones extra, como panel de administración o formularios especiales. Contanos qué necesitás por WhatsApp y te pasamos un presupuesto claro." },
      { q: "¿En cuánto tiempo está lista?", a: "Una página institucional o una landing suele estar lista en pocas semanas. Los sitios con más funciones llevan más tiempo; lo acordamos al presupuestar." },
      { q: "¿Trabajan solo con empresas de Córdoba?", a: "Estamos en Córdoba, pero trabajamos de forma remota con clientes de toda Argentina." },
      { q: "¿La página va a aparecer en Google?", a: "La entregamos con la base técnica de SEO bien resuelta. El posicionamiento depende además de la competencia y del contenido, y lo trabajamos en conjunto." },
      { q: "¿Podré modificar el contenido yo mismo?", a: "Sí, si lo necesitás armamos un panel simple para que edites textos, imágenes o novedades sin tocar código." },
    ],
    whatsapp: "Hola, quiero cotizar una página web.",
  },
  {
    slug: "sistemas-de-gestion",
    metaTitle: "Sistemas de gestión (ERP) a medida | Autogestiva",
    metaDescription:
      "Desarrollamos sistemas de gestión y ERP a medida para pymes: clientes, stock, pagos, turnos, reportes y paneles de control. Reemplazá las planillas por un sistema hecho para tu negocio.",
    eyebrow: "ERP y sistemas internos",
    h1: "Sistemas de gestión a medida para tu empresa",
    intro:
      "Si tu negocio funciona con planillas, papeles y mensajes sueltos, te armamos un sistema hecho a tu forma de trabajar: ordena la información, automatiza tareas repetitivas y te muestra cómo va todo en un solo lugar.",
    includes: [
      { title: "Gestión de clientes", text: "Fichas, historial, vencimientos y avisos, en vez de buscar en mil planillas." },
      { title: "Stock, pagos y turnos", text: "Controlá inventario, cobros, horarios o reservas según lo que tu negocio necesite." },
      { title: "Paneles y reportes", text: "Los números importantes, claros y actualizados, para decidir con datos." },
      { title: "Usuarios y permisos", text: "Cada persona del equipo ve y hace solo lo que le corresponde." },
      { title: "Acceso desde cualquier lugar", text: "Funciona en el navegador, desde la computadora o el celular, sin instalar nada." },
      { title: "Crece con vos", text: "Empezamos por lo más urgente y vamos sumando módulos a medida que lo necesites." },
    ],
    forWho: [
      "Pymes que hoy gestionan todo en Excel o en papel",
      "Negocios con turnos, horarios, inventarios o cuentas corrientes",
      "Instituciones y equipos que necesitan ordenar procesos internos",
      "Quienes probaron un sistema genérico y les queda corto o complicado",
    ],
    steps: [
      { title: "Relevamos tu operación", text: "Vemos cómo trabajás hoy y qué te hace perder más tiempo." },
      { title: "Desarrollamos por etapas", text: "Primero lo esencial, probado con tu equipo, y después se suma lo demás." },
      { title: "Implementamos y damos soporte", text: "Cargamos tus datos, capacitamos al equipo y seguimos acompañando." },
    ],
    projectNames: ["Colegio UTN", "Gestión Jurídica", "Inventarios ITS Villada", "JARA BUS Gestión"],
    faqs: [
      { q: "¿Qué es un ERP o sistema de gestión?", a: "Es un programa que reúne en un solo lugar la información y los procesos de tu negocio: clientes, ventas, stock, pagos, turnos y reportes." },
      { q: "¿Por qué a medida y no uno ya hecho?", a: "Un sistema genérico te obliga a adaptar tu forma de trabajar al programa. A medida hacemos lo contrario: el sistema se ajusta a cómo trabajás." },
      { q: "¿Pueden pasar mis planillas de Excel al sistema?", a: "Sí, migramos tu información existente para que no empieces de cero." },
      { q: "¿Cuánto tarda y cuánto cuesta?", a: "Depende de qué procesos incluya. Empezamos por un primer módulo acotado y vamos ampliando, así controlás tiempos e inversión." },
    ],
    whatsapp: "Hola, quiero cotizar un sistema de gestión a medida.",
  },
  {
    slug: "cartas-digitales",
    metaTitle: "Cartas digitales y catálogos con QR | Autogestiva",
    metaDescription:
      "Carta digital para restaurantes, bares y cafés, y catálogos online para comercios. Con código QR, fácil de actualizar por tu cuenta y con tu marca. Desde Córdoba para todo el país.",
    eyebrow: "Cartas y catálogos digitales",
    h1: "Cartas digitales y catálogos con QR para tu negocio",
    intro:
      "Mostrá tu menú o tus productos de forma clara, linda y siempre actualizada. Cambiás precios y platos desde un panel simple, sin pedirle a nadie y sin reimprimir nada.",
    includes: [
      { title: "Código QR para tus mesas", text: "Tus clientes escanean y ven la carta al instante, sin descargar nada." },
      { title: "Actualización inmediata", text: "Cambiá precios, agregá platos o marcá lo agotado en segundos, desde el celular." },
      { title: "Diseño con tu marca", text: "Colores, tipografía y estilo propios, no una plantilla igual a la de todos." },
      { title: "Categorías, fotos y detalles", text: "Secciones, descripciones, alérgenos o promociones, como lo necesites." },
      { title: "Pedido por WhatsApp", text: "Si querés, el cliente arma su pedido y te llega directo por WhatsApp." },
      { title: "También para comercios", text: "El mismo sistema sirve como catálogo de productos para negocios que no son gastronómicos." },
    ],
    forWho: [
      "Restaurantes, bares, cafeterías y casas de comida",
      "Comercios y tiendas que quieren mostrar su catálogo online",
      "Locales que cambian precios seguido y no quieren reimprimir",
      "Eventos y propuestas temporales con su propio menú",
    ],
    steps: [
      { title: "Nos pasás tu carta", text: "Con tus productos, precios y la identidad de tu marca." },
      { title: "La armamos y la probamos", text: "Diseñamos la carta, generamos el QR y la revisamos con vos." },
      { title: "Te enseñamos a actualizarla", text: "Aprendés a usar el panel en minutos y listo." },
    ],
    projectNames: ["La Comanda", "Cantina Digital", "ITS Boutique"],
    faqs: [
      { q: "¿Cuánto cuesta una carta digital?", a: "Depende del tamaño de la carta y de las funciones que quieras, como pedidos por WhatsApp. Escribinos y te pasamos un presupuesto." },
      { q: "¿Puedo cambiar los precios yo mismo?", a: "Sí, desde un panel simple, en cualquier momento y sin costo extra por cada cambio." },
      { q: "¿Los clientes tienen que descargar una app?", a: "No. Escanean el QR y la carta se abre en el navegador del celular." },
      { q: "¿Sirve para un negocio que no es gastronómico?", a: "Sí. Funciona también como catálogo digital de productos para cualquier comercio." },
    ],
    whatsapp: "Hola, quiero cotizar una carta digital.",
  },
]

export const getService = (slug: string) => services.find((s) => s.slug === slug)
