"use client";

import { useState, useEffect } from "react";
import { MapPin, Fuel, CreditCard, DollarSign } from "lucide-react";
import { fetchPreciosCombustible, PRECIO_LITRO_DEFAULT } from "@/lib/preciosCombustible";

const KM_POR_LITRO = 12;
const TAG_POR_KM_SANTIAGO = 220;
const PEAJE_TRONCAL_APROX = 2400;

export default function CalculadoraViajes() {
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [km, setKm] = useState<number | null>(null);
  const [precioLitro, setPrecioLitro] = useState(PRECIO_LITRO_DEFAULT);

  useEffect(() => {
    fetchPreciosCombustible().then((p) => setPrecioLitro(p["95"] || PRECIO_LITRO_DEFAULT));
  }, []);

  const handleCalcular = (e: React.FormEvent) => {
    e.preventDefault();
    if (!origen.trim() || !destino.trim()) return;
    const distanciaSimulada = Math.round(15 + Math.random() * 85);
    setKm(distanciaSimulada);
  };

  const esSantiago = destino.trim().toLowerCase().includes("santiago");
  const combustible = km !== null ? (km / KM_POR_LITRO) * precioLitro : 0;
  const tag = km !== null && esSantiago ? km * TAG_POR_KM_SANTIAGO : km !== null ? 0 : 0;
  const total = combustible + tag;

  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-calculadora"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-calculadora"
          className="flex items-center gap-2 text-xl font-bold text-white mb-2"
        >
          <MapPin className="w-5 h-5 text-electric-blue" aria-hidden />
          Calculadora de Viajes (TAG y Combustible)
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Origen y destino. Desglose: Combustible (distancia ÷ 12 × precio bencina 95, actualizado diariamente) y Peajes/TAG según destino.
        </p>

        <div className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover">
          <form onSubmit={handleCalcular} className="space-y-4">
            <div>
              <label htmlFor="origen" className="block text-sm font-medium text-slate-300 mb-1">
                Origen
              </label>
              <input
                id="origen"
                type="text"
                value={origen}
                onChange={(e) => setOrigen(e.target.value)}
                placeholder="Ej: Santiago Centro"
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-slate-500 focus:ring-2 focus:ring-electric-blue outline-none transition"
              />
            </div>
            <div>
              <label htmlFor="destino" className="block text-sm font-medium text-slate-300 mb-1">
                Destino
              </label>
              <input
                id="destino"
                type="text"
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                placeholder="Ej: Santiago / Viña del Mar"
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-slate-500 focus:ring-2 focus:ring-electric-blue outline-none transition"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-electric-blue text-white font-medium rounded-xl hover:bg-electric-blue-hover transition-colors active:scale-[0.98] btn-glow"
            >
              Calcular viaje
            </button>
          </form>

          {km !== null && (
            <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in space-y-3">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <MapPin className="w-4 h-4" />
                Distancia estimada: <strong className="text-white">{km} km</strong>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <Fuel className="w-4 h-4" />
                Combustible: ({km} km ÷ {KM_POR_LITRO}) × ${precioLitro.toLocaleString("es-CL")} ={" "}
                <strong className="text-emerald">${Math.round(combustible).toLocaleString("es-CL")}</strong>
              </div>
              {esSantiago ? (
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <CreditCard className="w-4 h-4" />
                  Peajes/TAG (Santiago): {km} km × ${TAG_POR_KM_SANTIAGO.toLocaleString("es-CL")}/km ={" "}
                  <strong className="text-emerald">${Math.round(tag).toLocaleString("es-CL")}</strong>
                </div>
              ) : (
                <p className="text-sm text-amber-200/90 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                  Considera peajes troncales adicionales (aprox $2.400 c/u) si sales de la región.
                </p>
              )}
              <div className="mt-4 p-4 rounded-xl bg-emerald/15 border border-emerald/30 flex items-center justify-between gap-2">
                <span className="flex items-center gap-2 font-semibold text-white">
                  <DollarSign className="w-5 h-5 text-emerald" />
                  Total Estimado de Viaje
                </span>
                <span className="text-2xl font-bold text-emerald">
                  ${Math.round(total).toLocaleString("es-CL")}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
