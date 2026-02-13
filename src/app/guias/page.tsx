import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Guías SOAP, Multas y Revisión Técnica",
  description:
    "Guías sobre SOAP, multas de tránsito, revisión técnica, Ley Jacinta y permiso de circulación en Chile.",
  alternates: {
    canonical: "https://www.portal-automotriz.cl/guias",
  },
};

export default function GuiasPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-portal-blue font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al inicio
      </Link>
      <h1 className="text-2xl font-bold text-portal-blue mb-4">
        Guías
      </h1>
      <p className="text-gray-600 mb-6">
        Guías y contenido de utilidad sobre SOAP, multas, revisión técnica y
        documentación vehicular. Próximamente más contenido.
      </p>
      <ul className="list-disc list-inside text-gray-600 space-y-2">
        <li>
          <Link href="/" className="text-portal-blue hover:underline">
            Inicio - Herramientas principales
          </Link>
        </li>
        <li>
          <a
            href="https://www.mtt.gob.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portal-blue hover:underline"
          >
            MTT - Normativa
          </a>
        </li>
        <li>
          <a
            href="https://www.registrocivil.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-portal-blue hover:underline"
          >
            Registro Civil
          </a>
        </li>
      </ul>
    </div>
  );
}
