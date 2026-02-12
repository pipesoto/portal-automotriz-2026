import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Comparador SOAP 2026 - Precios por Aseguradora | Portal Automotriz Chile",
  description:
    "Compare precios SOAP 2026: Consorcio, HDI, Sura, SoapBomberos, Falabella. Auto, moto, camioneta y pesados.",
};

export default function ComparadorSoapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-portal-blue font-medium mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al inicio
      </Link>
      <h1 className="text-2xl font-bold text-portal-blue mb-4">
        Comparador SOAP 2026
      </h1>
      <p className="text-gray-600 mb-6">
        En la página de inicio encontrará la tabla de precios nacional y el
        selector por tipo de vehículo. Use el enlace inferior para comparar
        precios.
      </p>
      <Link
        href="/#titulo-tabla-precios"
        className="inline-block px-4 py-2 bg-portal-blue text-white rounded-lg hover:bg-[#002d85]"
      >
        Ver tabla de precios SOAP
      </Link>
    </div>
  );
}
