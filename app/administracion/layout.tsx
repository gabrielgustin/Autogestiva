import type { Metadata } from "next"

// El panel es privado: no debe aparecer en buscadores.
export const metadata: Metadata = {
  title: { default: "Administración | Autogestiva", template: "%s | Autogestiva" },
  robots: { index: false, follow: false },
}

export default function AdministracionLayout({ children }: { children: React.ReactNode }) {
  return children
}
