"use client";

import { useState, useEffect } from "react";
import { Fuel, ExternalLink } from "lucide-react";
import { fetchPreciosCombustible, type PreciosCombustible } from "@/lib/preciosCombustible";

const PRECIOBENCINA_URL = "https://www.preciobencina.cl/";

const ITEMS = [
  { tipo: "93", key: "93" as const, unidad: "L" },
  { tipo: "95", key: "95" as const, unidad: "L" },
  { tipo: "97", key: "97" as const, unidad: "L" },
  { tipo: "Diésel", key: "diesel" as const, unidad: "L" },
];

export default function FuelWidget() {
  const [precios, setPrecios] = useState<PreciosCombustible | null>(null);

  useEffect(() => {
    fetchPreciosCombustible().then(setPrecios);
  }, []);

  return (
    <aside
      className="glass-card p-4 animate-fade-in"
      aria-labelledby="fuel-widget-title"
    >
      <h3
        id="fuel-widget-title"
        className="flex items-center gap-2 text-sm font-semibold text-white mb-3"
      >
        <Fuel className="w-4 h-4 text-electric-blue" aria-hidden />
        Bencina hoy · Chile
      </h3>
      <p className="text-xs text-slate-500 mb-3">
        Precio promedio referencial · Se actualiza diariamente
      </p>
      {precios ? (
        <>
          <ul className="space-y-2">
            {ITEMS.map(({ tipo, key, unidad }) => (
              <li
                key={tipo}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-slate-300">{tipo}</span>
                <span className="font-semibold text-emerald">
                  ${precios[key].toLocaleString("es-CL")}
                  <span className="text-slate-500 font-normal text-xs">/{unidad}</span>
                </span>
              </li>
            ))}
          </ul>
          {precios.actualizado && (
            <p className="mt-2 text-[10px] text-slate-500">
              Actualizado: {precios.actualizado}
            </p>
          )}
        </>
      ) : (
        <p className="text-sm text-slate-500">Cargando precios…</p>
      )}
      <p className="mt-3 text-[10px] text-slate-500">
        Varía por zona y estación. Fuente: {precios?.fuente ?? "referencial"}.
      </p>
    </aside>
  );
}
