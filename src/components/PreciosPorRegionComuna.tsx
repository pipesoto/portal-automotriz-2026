"use client";

import { useState, useEffect, useMemo } from "react";
import { Fuel, MapPin } from "lucide-react";
import { fetchPreciosCombustible, type PreciosCombustible } from "@/lib/preciosCombustible";
import datosPRT from "@/data/plantasPRT.json";

type DatosZonas = {
  regiones: string[];
  comunasByRegion: Record<string, string[]>;
};

const datosZonas = datosPRT as DatosZonas;
const REGIONES = datosZonas.regiones?.length ? datosZonas.regiones : ["METROPOLITANA", "VALPARAÍSO", "BÍO BIO", "MAULE", "ARICA Y PARINACOTA", "TARAPACÁ", "ANTOFAGASTA", "ATACAMA", "COQUIMBO", "O´HIGGINS", "ÑUBLE", "ARAUCANÍA", "LOS RÍOS", "LOS LAGOS", "AYSEN", "MAGALLANES"];
const COMUNAS_BY_REGION: Record<string, string[]> = datosZonas.comunasByRegion || {};

const TIPOS = [
  { tipo: "93", key: "93" as const, unidad: "L" },
  { tipo: "95", key: "95" as const, unidad: "L" },
  { tipo: "97", key: "97" as const, unidad: "L" },
  { tipo: "Diésel", key: "diesel" as const, unidad: "L" },
];

export default function PreciosPorRegionComuna() {
  const [region, setRegion] = useState("");
  const [comuna, setComuna] = useState("");
  const [precios, setPrecios] = useState<PreciosCombustible | null>(null);

  useEffect(() => {
    fetchPreciosCombustible().then(setPrecios);
  }, []);

  const comunasOpciones = useMemo(() => {
    if (!region) return [];
    const list = COMUNAS_BY_REGION[region] || [];
    return [{ value: "", label: "Todas las comunas" }, ...list.map((c) => ({ value: c, label: c }))];
  }, [region]);

  const mostrarPrecios = region && precios;

  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-precios-zona"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-precios-zona"
          className="flex items-center gap-2 text-xl font-bold text-white mb-2"
        >
          <Fuel className="w-5 h-5 text-electric-blue" aria-hidden />
          Precios de combustible por región y comuna
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Seleccione su región y comuna para ver precios referenciales. Los valores pueden variar por estación de servicio.
        </p>

        <div className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="region-combustible" className="block text-sm font-medium text-slate-300 mb-1">
                Región
              </label>
              <select
                id="region-combustible"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setComuna("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white focus:ring-2 focus:ring-electric-blue outline-none transition"
              >
                <option value="" className="bg-slate-800 text-white">
                  Selecciona región
                </option>
                {REGIONES.map((r) => (
                  <option key={r} value={r} className="bg-slate-800 text-white">
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="comuna-combustible" className="block text-sm font-medium text-slate-300 mb-1">
                Comuna
              </label>
              <select
                id="comuna-combustible"
                value={comuna}
                onChange={(e) => setComuna(e.target.value)}
                disabled={!region}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white focus:ring-2 focus:ring-electric-blue outline-none transition disabled:opacity-50"
              >
                {comunasOpciones.length === 0 ? (
                  <option value="" className="bg-slate-800 text-white">
                    Primero elige una región
                  </option>
                ) : (
                  comunasOpciones.map((c) => (
                    <option key={c.value} value={c.value} className="bg-slate-800 text-white">
                      {c.label}
                    </option>
                  ))
                )}
              </select>
            </div>
          </div>

          {mostrarPrecios && (
            <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in">
              <p className="flex items-center gap-2 text-sm text-slate-400 mb-4">
                <MapPin className="w-4 h-4 text-electric-blue" aria-hidden />
                Precios referenciales para <strong className="text-white">{region}</strong>
                {comuna ? ` · ${comuna}` : ""}
              </p>
              <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {TIPOS.map(({ tipo, key, unidad }) => (
                  <li
                    key={tipo}
                    className="rounded-xl bg-slate-800/60 border border-white/10 p-4 text-center"
                  >
                    <span className="block text-sm text-slate-400 mb-1">{tipo}</span>
                    <span className="block text-xl font-bold text-emerald">
                      ${precios[key].toLocaleString("es-CL")}
                      <span className="text-slate-500 font-normal text-sm">/{unidad}</span>
                    </span>
                  </li>
                ))}
              </ul>
              {precios.actualizado && (
                <p className="mt-3 text-xs text-slate-500">
                  Actualizado: {precios.actualizado} · Fuente: {precios.fuente ?? "referencial"}
                </p>
              )}
            </div>
          )}

          {region && !precios && (
            <p className="mt-4 text-sm text-slate-500">Cargando precios…</p>
          )}
        </div>

        <p className="text-xs text-slate-500">
          Para precios por estación y bencinera consulte{" "}
          <a
            href="https://www.preciobencina.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-blue underline"
          >
            preciobencina.cl
          </a>{" "}
          o{" "}
          <a
            href="https://appbencinaenlinea.cne.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-blue underline"
          >
            Bencina en Línea (CNE)
          </a>
          .
        </p>
      </div>
    </section>
  );
}
