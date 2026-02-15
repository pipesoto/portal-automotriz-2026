"use client";

import { useState, useEffect } from "react";
import HeroDashboard from "@/components/HeroDashboard";
import TablaPreciosSOAP from "@/components/TablaPreciosSOAP";
import HoyTeToca from "@/components/HoyTeToca";
import FuelWidget from "@/components/FuelWidget";
import GuiaLegal from "@/components/GuiaLegal";
import CalculadoraViajes from "@/components/CalculadoraViajes";
import CalculadoraTransferencia from "@/components/CalculadoraTransferencia";
import ChecklistPreRevision from "@/components/ChecklistPreRevision";
import PlantasRevisionTecnica from "@/components/PlantasRevisionTecnica";
import PreciosPorRegionComuna from "@/components/PreciosPorRegionComuna";
import WidgetsInfo from "@/components/WidgetsInfo";
import BlogFeed from "@/components/BlogFeed";
import AdPlaceholder from "@/components/AdPlaceholder";

export default function HomePage() {
  const [tipoVehiculo, setTipoVehiculo] = useState("auto");

  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.slice(1) : "";
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleTipoVehiculoChange = (value: string) => {
    setTipoVehiculo(value);
    setTimeout(
      () =>
        document
          .getElementById("tabla-precios-soap")
          ?.scrollIntoView({ behavior: "smooth" }),
      0
    );
  };

  return (
    <div className="min-h-screen bg-midnight">
      {/* Sección Multas: consulta por patente */}
      <section id="multas" aria-labelledby="titulo-multas">
        <h2 id="titulo-multas" className="sr-only">
          Consulta de Multas de Tránsito por Patente
        </h2>
        <HeroDashboard
          tipoVehiculo={tipoVehiculo}
          onTipoVehiculoChange={handleTipoVehiculoChange}
        />
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdPlaceholder position="between" />
      </div>

      {/* Sección SOAP: comparador y tabla de precios */}
      <section id="soap" aria-labelledby="titulo-tabla-precios">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8 items-start">
          <div className="min-w-0" id="tabla-precios-soap">
            <TablaPreciosSOAP tipoVehiculo={tipoVehiculo} />

            <div className="my-6">
              <AdPlaceholder position="between" />
            </div>

            {/* Sección Revisión Técnica: calendario y plantas */}
            <section id="revision-tecnica" aria-labelledby="titulo-hoy-te-toca">
              <HoyTeToca />

              <PlantasRevisionTecnica />
            </section>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start order-first lg:order-last">
            <FuelWidget />
          </aside>
        </div>
      </section>

      <WidgetsInfo />

      <CalculadoraViajes />

      <PreciosPorRegionComuna />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <AdPlaceholder position="between" />
      </div>

      {/* Sección Guías: normativa y derechos */}
      <section id="guias" aria-labelledby="titulo-guia-legal">
        <GuiaLegal />
      </section>

      <CalculadoraTransferencia />

      <ChecklistPreRevision />

      <BlogFeed />

      <AdPlaceholder position="floating-mobile" />
    </div>
  );
}
