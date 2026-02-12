"use client";

import { useState, useMemo } from "react";
import { Calendar, MessageCircle, X, Lightbulb } from "lucide-react";

// Calendario oficial según MTT / prt.cl: un mes por último dígito de patente (vehículos Tipo B).
// Marzo = renovación permisos de circulación; Diciembre = rezagados.
const CALENDARIO_DIGITO: { digito: string; meses: string; tip: string }[] = [
  { digito: "0", meses: "Febrero", tip: "Revisa luces, frenos y neumáticos. Lleva documentación al día y revisión anterior si aplica." },
  { digito: "1", meses: "Abril", tip: "Asegúrate que el vehículo no tenga fugas de aceite o líquidos. Nivel de aceite correcto." },
  { digito: "2", meses: "Mayo", tip: "Sistema de escape sin filtraciones. Espejos y parabrisas en buen estado." },
  { digito: "3", meses: "Junio", tip: "Cinturones de seguridad operativos. Limpiaparabrisas y lavaparabrisas funcionando." },
  { digito: "4", meses: "Julio", tip: "Batería en buen estado. Conexiones sin corrosión. Arranque en frío sin problemas." },
  { digito: "5", meses: "Agosto", tip: "Suspensión sin holguras. Amortiguadores en buen estado. Sin ruidos anormales." },
  { digito: "6", meses: "Septiembre", tip: "Dirección precisa, sin juego. Alineación y balanceo al día si hubo cambio de neumáticos." },
  { digito: "7", meses: "Octubre", tip: "Documentación: permiso de circulación, SOAP y revisión técnica anterior vigentes." },
  { digito: "8", meses: "Noviembre", tip: "Emisiones: motor bien regulado. Si tiene más de 10 años, considera una afinación previa." },
  { digito: "9", meses: "Enero", tip: "Lleva el vehículo limpio y sin elementos que obstruyan la visión del evaluador." },
];

const WHATSAPP_NUMBER = "56912345678";
const WHATSAPP_MSG = "Hola, quiero que me recuerden la fecha de mi revisión técnica según mi patente. Portal Automotriz Chile 2026.";

const MES_ACTUAL_ES = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

export default function HoyTeToca() {
  const [selectedDigito, setSelectedDigito] = useState<string | null>(null);
  const mesActual = useMemo(() => new Date().getMonth(), []);
  const nombreMesActual = MES_ACTUAL_ES[mesActual];

  const isActual = (meses: string) =>
    meses.toLowerCase().includes(nombreMesActual.toLowerCase());

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-hoy-te-toca"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-hoy-te-toca"
          className="flex items-center gap-2 text-xl font-bold text-white mb-2"
        >
          <Calendar className="w-5 h-5 text-electric-blue" aria-hidden />
          Hoy te toca · Revisión Técnica 2026
        </h2>
        <p className="text-sm text-slate-400 mb-4">
          Según el último dígito de su patente. Haga clic en un número para ver
          consejos para pasar la revisión.
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald text-white font-medium text-sm hover:bg-emerald-light transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Recordarme por WhatsApp
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {CALENDARIO_DIGITO.map(({ digito, meses, tip }) => {
            const esActual = isActual(meses);
            const isSelected = selectedDigito === digito;
            return (
              <button
                key={digito}
                type="button"
                onClick={() => setSelectedDigito(isSelected ? null : digito)}
                className={`
                  glass-card p-4 text-center transition-all duration-300 text-left
                  ${esActual ? "animate-pulse-border ring-2 ring-electric-blue" : ""}
                  ${isSelected ? "ring-2 ring-electric-blue shadow-glass-hover" : ""}
                  hover:shadow-glass-hover focus:outline-none focus:ring-2 focus:ring-electric-blue
                `}
                aria-pressed={isSelected}
                aria-label={`Dígito ${digito}, ${meses}. ${esActual ? "Actual." : ""} Clic para consejos.`}
              >
                <span
                  className={`block text-2xl font-bold ${
                    esActual ? "text-emerald" : "text-electric-blue"
                  }`}
                >
                  {digito}
                </span>
                <span className="block text-xs text-slate-400 mt-1">{meses}</span>
                {esActual && (
                  <span className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald/20 text-emerald border border-emerald/40">
                    Actual
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {selectedDigito && (
          <div
            className="mt-6 glass-card p-4 animate-fade-in border-electric-blue/20"
            role="dialog"
            aria-labelledby="tip-title"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 text-electric-blue font-semibold mb-2">
                <Lightbulb className="w-4 h-4 flex-shrink-0" />
                <span id="tip-title">
                  Consejos para pasar la revisión · Dígito {selectedDigito}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDigito(null)}
                className="p-1 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white"
                aria-label="Cerrar consejos"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-slate-300">
              {
                CALENDARIO_DIGITO.find((c) => c.digito === selectedDigito)
                  ?.tip
              }
            </p>
          </div>
        )}

        <p className="mt-4 text-xs text-slate-500">
          Fuente: MTT / prt.cl. Marzo = renovación permisos de circulación;
          Diciembre = rezagados. Consulte fechas exactas en su municipalidad, en{" "}
          <a
            href="https://www.prt.cl/Paginas/Calendario.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-blue underline"
          >
            prt.cl
          </a>{" "}
          o en{" "}
          <a
            href="https://www.mtt.gob.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-electric-blue underline"
          >
            mtt.gob.cl
          </a>
          .
        </p>
      </div>
    </section>
  );
}
