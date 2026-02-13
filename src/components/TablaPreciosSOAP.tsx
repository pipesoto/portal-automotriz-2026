"use client";

import { useMemo } from "react";
import { DollarSign, ExternalLink, Award, Info } from "lucide-react";
import preciosSoapData from "@/data/preciosSoap.json";

type TipoVehiculo = "auto" | "moto" | "camioneta" | "pesados";

interface PrecioRow {
  aseguradora: string;
  auto: number;
  moto: number;
  camioneta: number;
  pesados: number;
  url?: string;
  destacada?: boolean;
  tooltipAuto?: string;
}

type PreciosSoapJson = {
  fuente: string;
  actualizado: string;
  precios: PrecioRow[];
};

const datosSoap = preciosSoapData as PreciosSoapJson;
const usaPreciosReales = datosSoap.precios?.length > 0;

// Fallback cuando no hay Excel de la CMF cargado
const PRECIOS_FALLBACK: PrecioRow[] = [
  { aseguradora: "Consorcio", auto: 28990, moto: 14990, camioneta: 32990, pesados: 45990 },
  { aseguradora: "HDI", auto: 26990, moto: 13990, camioneta: 30990, pesados: 42990 },
  { aseguradora: "Sura", auto: 27990, moto: 14490, camioneta: 31990, pesados: 44990 },
  { aseguradora: "SoapBomberos", auto: 25990, moto: 13490, camioneta: 29990, pesados: 41990 },
  { aseguradora: "Falabella Seguros", auto: 27490, moto: 14290, camioneta: 31490, pesados: 43990 },
];

const PRECIOS = usaPreciosReales ? datosSoap.precios : PRECIOS_FALLBACK;

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

  const handleIrOferta = (row: PrecioRow) => {
    const url =
      row.url ||
      (() => {
        const name = row.aseguradora.toLowerCase().trim();
        const fallbacks: Record<string, string> = {
          consorcio: "https://sitio.consorcio.cl/soap",
          hdi: "https://www.hdi.cl/soap/",
          sura: "https://seguros.sura.cl/movilidad/seguro-obligatorio-soap",
          bomberos: "https://www.soapbomberos.cl",
          soapbomberos: "https://www.soapbomberos.cl",
        };
        return Object.entries(fallbacks).find(([key]) => name.includes(key))?.[1] ||
          "https://www.google.com/search?q=SOAP+Chile+" + encodeURIComponent(row.aseguradora);
      })();
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
        <p className="text-sm text-slate-400 mb-2">
          {usaPreciosReales
            ? "Precios de referencia desde la CMF. Consulte en cada aseguradora para cotización final."
            : "Precios referenciales de ejemplo. Para ver precios reales: descargue el Excel de la CMF y ejecute npm run parse-soap."}
        </p>
        {usaPreciosReales && datosSoap.actualizado && (
          <p className="text-xs text-slate-500 mb-2">
            Actualizado: {datosSoap.actualizado} · Fuente: {datosSoap.fuente}
          </p>
        )}
        <p className="text-sm text-amber-200/90 mb-4">
          Verifique en cada sitio (botón &quot;Ir a la oferta&quot;) — los precios pueden variar por vehículo y vigencia.
        </p>

        <p className="text-xs text-slate-500 mb-2 sm:hidden">
          Desliza horizontalmente para ver todos los precios y el botón &quot;Ir a la oferta&quot;.
        </p>
        <div className="overflow-x-auto -mx-4 sm:mx-0 rounded-2xl border border-white/10 bg-slate-800/60 backdrop-blur-sm shadow-glass overflow-hidden">
          <table className="w-full min-w-[42rem] table-fixed sm:table-auto">
            <thead>
              <tr className="bg-electric-blue text-white">
                <th className="text-left px-3 py-3 font-semibold w-44 sm:w-auto sticky left-0 z-10 bg-electric-blue">
                  Aseguradora
                </th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap" title="Automóvil (según Excel CMF)">Automóvil</th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap" title="Motocicletas">Motocicletas</th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap">
                  Camioneta
                </th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap" title="Minibús">Minibús</th>
                <th className="text-right px-3 py-3 font-semibold whitespace-nowrap min-w-[8rem] sticky right-0 z-10 bg-electric-blue">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((row, i) => {
                const isCheapest = row.aseguradora === cheapestAseguradora;
                const isDestacada = row.destacada || row.aseguradora.toLowerCase().includes("bomberos");
                const rowBg = i % 2 === 0 ? "bg-slate-800/70" : "bg-slate-700/50";
                return (
                  <tr
                    key={row.aseguradora}
                    className={rowBg}
                  >
                    <td className={`px-3 py-3 font-medium text-white sticky left-0 z-10 ${rowBg}`}>
                      <span className="flex items-center gap-2 flex-wrap">
                        {row.aseguradora}
                        {isDestacada && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                            Destacado
                          </span>
                        )}
                        {isCheapest && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald/20 text-emerald border border-emerald/40">
                            <Award className="w-3 h-3" />
                            Más Económico
                          </span>
                        )}
                      </span>
                    </td>
                    <td
                      className={`text-right px-3 py-3 whitespace-nowrap ${
                        colKey === "auto"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                      title={row.tooltipAuto}
                    >
                      <span className="inline-flex items-center gap-1 justify-end">
                        {formatPeso(row.auto)}
                        {row.tooltipAuto && (
                          <span
                            className="inline-flex text-slate-500 hover:text-amber-300 cursor-help"
                            title={row.tooltipAuto}
                            aria-label={row.tooltipAuto}
                          >
                            <Info className="w-3.5 h-3.5 flex-shrink-0" />
                          </span>
                        )}
                      </span>
                    </td>
                    <td
                      className={`text-right px-3 py-3 whitespace-nowrap ${
                        colKey === "moto"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {formatPeso(row.moto)}
                    </td>
                    <td
                      className={`text-right px-3 py-3 whitespace-nowrap ${
                        colKey === "camioneta"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {formatPeso(row.camioneta)}
                    </td>
                    <td
                      className={`text-right px-3 py-3 whitespace-nowrap ${
                        colKey === "pesados"
                          ? "text-electric-blue font-semibold"
                          : "text-slate-300"
                      }`}
                    >
                      {formatPeso(row.pesados)}
                    </td>
                    <td className={`text-right px-3 py-3 sticky right-0 z-10 ${rowBg}`}>
                      <button
                        type="button"
                        onClick={() => handleIrOferta(row)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                          isCheapest
                            ? "bg-emerald text-white hover:bg-emerald-light"
                            : "bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30"
                        }`}
                      >
                        Ir a la oferta
                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10">
          <p className="text-sm font-semibold text-amber-200 mb-1">
            Bomberos de Chile — Opción destacada por su valor social
          </p>
          <p className="text-sm text-slate-300 mb-2">
            El precio para automóviles contempla el precio base de $6.990 más una donación sugerida de $1.000 para la institución.
          </p>
          <p className="text-sm text-slate-300">
            Después de comprar tu SOAP, el siguiente paso es realizar el pago del permiso de circulación en tu Municipalidad. El SOAP es un requisito obligatorio para dicho trámite.
          </p>
          <a
            href="https://www.soapbomberos.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-electric-blue hover:text-electric-blue/80"
          >
            Ir a SoapBomberos.cl
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
