import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdPlaceholder from "@/components/AdPlaceholder";
import JsonLdFaq from "@/components/JsonLdFaq";
import JsonLdWebSite from "@/components/JsonLdWebSite";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const SITE_URL = "https://www.portal-automotriz.cl";
const TITLE = "Portal Automotriz Chile 2026: SOAP, Multas y Revisión Técnica";
const DESCRIPTION =
  "Consulta multas por patente, compara precios SOAP 2026 y revisión técnica Chile. Multas de tránsito, SOAP y calendario de revisión técnica en un solo lugar.";

export const metadata: Metadata = {
  title: {
    default: TITLE,
    template: "%s | Portal Automotriz",
  },
  description: DESCRIPTION,
  keywords: [
    "multas",
    "consulta multas Chile",
    "multas tránsito por patente",
    "SOAP",
    "SOAP 2026",
    "precios SOAP Chile",
    "comparar SOAP",
    "revisión técnica",
    "revisión técnica 2026",
    "revisión técnica Chile",
    "calendario revisión técnica",
    "TAG Chile",
    "permiso circulación 2026",
    "Ley Jacinta",
    "patente Chile",
  ],
  authors: [{ name: "Portal Automotriz Chile" }],
  creator: "Portal Automotriz Chile",
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Portal Automotriz Chile 2026",
    locale: "es_CL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: "index, follow",
  alternates: { canonical: SITE_URL },
  verification: {
    google: "5cf7c1cd72c8efa9",
  },
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
        <JsonLdWebSite />
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
