import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Revisión Técnica 2026 - Calendario por Patente",
  description:
    "Calendario de revisión técnica Chile 2026 según último dígito de la patente. Hoy te toca.",
  alternates: {
    canonical: "https://www.portal-automotriz.cl/revision-tecnica",
  },
};

export default function RevisionTecnicaPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-portal-blue font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al inicio
      </Link>
      <h1 className="text-2xl font-bold text-portal-blue mb-4">
        Revisión Técnica 2026
      </h1>
      <p className="text-gray-600 mb-6">
        En la página de inicio encontrará la sección &quot;Hoy te toca&quot; con el
        calendario de revisión técnica para todo Chile según el último dígito
        de su patente.
      </p>
      <Link
        href="/#titulo-hoy-te-toca"
        className="inline-block px-4 py-2 bg-portal-blue text-white rounded-lg hover:bg-[#002d85]"
      >
        Ver calendario Revisión Técnica
      </Link>
    </div>
  );
}
