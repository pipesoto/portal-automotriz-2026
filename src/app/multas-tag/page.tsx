import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Multas y TAG Chile - Consulta por Patente",
  description:
    "Consulte multas de tránsito y estado TAG por patente. Formato chileno AA-BB-11. Enlaces a Registro Civil y TGR.",
};

export default function MultasTagPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-portal-blue font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al inicio
      </Link>
      <h1 className="text-2xl font-bold text-portal-blue mb-4">
        Multas y TAG
      </h1>
      <p className="text-gray-600 mb-6">
        Use el buscador de multas en la página de inicio ingresando su patente
        (formato AA-BB-11 o AABB11). Será redirigido al Registro Civil para la
        consulta oficial.
      </p>
      <Link
        href="/"
        className="inline-block px-4 py-2 bg-portal-blue text-white rounded-lg hover:bg-[#002d85]"
      >
        Ir al buscador de multas
      </Link>
    </div>
  );
}
