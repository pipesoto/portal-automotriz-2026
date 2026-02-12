"use client";

import { useMemo } from "react";
import { DollarSign, ExternalLink, Award } from "lucide-react";

type TipoVehiculo = "auto" | "moto" | "camioneta" | "pesados";

interface PrecioRow {
  aseguradora: string;
  auto: number;
  moto: number;
  camioneta: number;
  pesados: number;
  url?: string;
}

const PRECIOS: PrecioRow[] = [
  { aseguradora: "Consorcio", auto: 28990, moto: 14990, camioneta: 32990, pesados: 45990 },
  { aseguradora: "HDI", auto: 26990, moto: 13990, camioneta: 30990, pesados: 42990 },
  { aseguradora: "Sura", auto: 27990, moto: 14490, camioneta: 31990, pesados: 44990 },
  { aseguradora: "SoapBomberos", auto: 25990, moto: 13490, camioneta: 29990, pesados: 41990 },
  { aseguradora: "Falabella Seguros", auto: 27490, moto: 14290, camioneta: 31490, pesados: 43990 },
];

function formatPeso(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export default function TablaPreciosSOAP({
  tipoVehiculo,
}: {
  tipoVehiculo: string;
}) {
  const col = tipoVehiculo as TipoVehiculo;
  const colKey = ["auto", "moto", "camioneta", "pesados"].includes(col)
    ? col
    : "auto";

  const { sorted, cheapestAseguradora } = useMemo(() => {
    const s = [...PRECIOS].sort(
      (a, b) => (a[colKey] as number) - (b[colKey] as number)
    );
    const cheapest = s[0]?.aseguradora ?? null;
    return { sorted: s, cheapestAseguradora: cheapest };
  }, [colKey]);

  const handleIrOferta = (aseguradora: string) => {
    const urls: Record<string, string> = {
      Consorcio: "https://www.consorcio.cl",
      HDI: "https://www.hdi.cl",
      Sura: "https://www.sura.cl",
      SoapBomberos: "https://www.soapbomberos.cl",
      "Falabella Seguros": "https://www.falabella.com/falabella-cl/seguros",
    };
    const url = urls[aseguradora] || "https://www.google.com/search?q=SOAP+Chile+" + encodeURIComponent(aseguradora);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-tabla-precios"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-tabla-precios"
          className="flex items-center gap-2 text-xl font-bold text-white mb-4"
        >
          <DollarSign className="w-5 h-5 text-electric-blue" aria-hidden />
          Tabla de Precios SOAP Nacional 2026
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          Precios referenciales por tipo de vehículo. Consulte en cada
          aseguradora para cotización final.
        </p>

        <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-2xl border border-white/10 bg-slate-800/60 backdrop-blur-sm shadow-glass overflow-hidden">
          <table className="w-full min-w-[320px]">
            <thead>
              <tr className="bg-electric-blue text-white">
                <th className="text-left px-4 py-3 font-semibold">
                  Aseguradora
                </th>
                <th className="text-right px-4 py-3 font-semibold">Auto</th>
                <th className="text-right px-4 py-3 font-semibold">Moto</th>
                <th className="text-right px-4 py-3 font-semibold">
                  Camioneta
                </th>
                <th className="text-right px-4 py-3 font-semibold">Pesados</th>
                <th className="text-right px-4 py-3 font-semibold w-32">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => {
                const isCheapest = row.aseguradora === cheapestAseguradora;
                return (
                  <tr
                    key={row.aseguradora}
                    className={
                      i % 2 === 0
                        ? "bg-slate-800/70"
                        : "bg-slate-700/50"
                    }
                  >
                    <td className="px-4 py-3 font-medium text-white">
                      <span className="flex items-center gap-2">
                        {row.aseguradora}
                        {isCheapest && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald/20 text-emerald border border-emerald/40">
                            <Award className="w-3 h-3" />
                            Más Económico
                          </span>
                        )}
                      </span>
                    </td>
                    <td
                      className={`text-right px-4 py-3 ${
                        colKey === "auto"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {formatPeso(row.auto)}
                    </td>
                    <td
                      className={`text-right px-4 py-3 ${
                        colKey === "moto"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {formatPeso(row.moto)}
                    </td>
                    <td
                      className={`text-right px-4 py-3 ${
                        colKey === "camioneta"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {formatPeso(row.camioneta)}
                    </td>
                    <td
                      className={`text-right px-4 py-3 ${
                        colKey === "pesados"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {formatPeso(row.pesados)}
                    </td>
                    <td className="text-right px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleIrOferta(row.aseguradora)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                          isCheapest
                            ? "bg-emerald text-white hover:bg-emerald-light"
                            : "bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30"
                        }`}
                      >
                        Ir a la oferta
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
