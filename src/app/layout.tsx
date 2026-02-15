import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";
import JsonLdFaq from "@/components/JsonLdFaq";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: {
    default: "Portal Automotriz Chile 2026: SOAP, Multas y Revisión Técnica",
    template: "%s | Portal Automotriz",
  },
  description:
    "Consulta de multas de tránsito, comparación de precios SOAP 2026 y calendario de revisión técnica en Chile. Todo en un solo lugar.",
  keywords:
    "SOAP 2026, multas tránsito Chile, revisión técnica, TAG, permiso circulación, Ley Jacinta, patente Chile",
  openGraph: {
    title: "Portal Automotriz Chile 2026: SOAP, Multas y Revisión Técnica",
    description:
      "Consulta de multas de tránsito, comparación de precios SOAP 2026 y calendario de revisión técnica en Chile. Todo en un solo lugar.",
    url: "https://www.portal-automotriz.cl",
    locale: "es_CL",
    type: "website",
  },
  robots: "index, follow",
  alternates: { canonical: "https://www.portal-automotriz.cl" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className="scroll-smooth">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8910568649783577"
          crossOrigin="anonymous"
        />
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
