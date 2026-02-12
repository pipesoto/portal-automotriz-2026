import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";
import JsonLdFaq from "@/components/JsonLdFaq";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "SOAP 2026 y Multas de Tránsito Chile - Consulta Gratis",
  description:
    "Consulta multas de tránsito, compara precios SOAP 2026, revisión técnica y TAG. Portal oficial de utilidad para conductores en Chile. Registro Civil, MTT, TGR.",
  keywords:
    "SOAP 2026, multas tránsito Chile, revisión técnica, TAG, permiso circulación, Ley Jacinta, patente Chile",
  openGraph: {
    title: "SOAP 2026 y Multas de Tránsito Chile - Consulta Gratis",
    description:
      "Consulta multas, SOAP, revisión técnica y TAG. Herramienta oficial para conductores en Chile.",
    locale: "es_CL",
    type: "website",
  },
  robots: "index, follow",
  alternates: { canonical: "https://portalautomotrizchile.cl" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className="scroll-smooth">
      <head>
        <JsonLdFaq />
      </head>
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col`}
      >
        <AdPlaceholder position="header" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
