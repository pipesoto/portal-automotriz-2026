"use client";

import { Calendar, MessageCircle, TrendingUp } from "lucide-react";

const WHATSAPP_NUMBER = "56912345678";
const WHATSAPP_MSG = "Hola, quiero que me avisen cuando se publique el calendario de restricción vehicular 2026 oficial del MTT. Portal Automotriz Chile.";

// Valores oficiales SII (Servicio de Impuestos Internos) - actualizar según mes
// UTM Feb 2026: $69.611 (fuente: sii.cl/valores_y_fechas/utm/utm2026.htm)
// UF referencial 2026: ~$39.700 (varía día a día; fuente: SII / valoruf.cl)
const UTM_ACTUAL = 69611;
const UF_REFERENCIAL = 39700;

export default function WidgetsInfo() {
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

  return (
    <section
      className="py-6"
      aria-label="Información rápida"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-electric-blue/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-electric-blue" aria-hidden />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-white">
                Restricción Vehicular 2026
              </h3>
              <p className="text-sm text-slate-400 mt-0.5">
                Calendario 2026: Pendiente de publicación oficial por el MTT.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-emerald/20 text-emerald border border-emerald/40 hover:bg-emerald/30 transition"
              >
                <MessageCircle className="w-4 h-4" />
                Avísame por WhatsApp
              </a>
            </div>
          </div>

          <div className="glass-card p-4 flex items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-emerald" aria-hidden />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Valor UTM (referencial)
              </h3>
              <p className="text-2xl font-bold text-emerald mt-0.5">
                ${UTM_ACTUAL.toLocaleString("es-CL")}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Fuente: SII. Valor mensual; consulta sii.cl para el mes vigente.
              </p>
            </div>
          </div>

          <div className="glass-card p-4 flex items-center gap-4 sm:col-span-2 lg:col-span-1">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-electric-blue/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-electric-blue" aria-hidden />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">
                Valor UF (referencial)
              </h3>
              <p className="text-2xl font-bold text-emerald mt-0.5">
                ${UF_REFERENCIAL.toLocaleString("es-CL")}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Varía día a día. Fuente: SII / valoruf.cl
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 glass-card px-4 py-3 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
          <span>
            <strong className="text-white">UTM:</strong> ${UTM_ACTUAL.toLocaleString("es-CL")} (SII)
          </span>
          <span className="text-white/40">·</span>
          <span>
            <strong className="text-white">UF:</strong> ${UF_REFERENCIAL.toLocaleString("es-CL")} aprox
          </span>
          <span className="text-slate-500 text-xs">
            Para calcular multas en pesos. Consulta valores vigentes en{" "}
            <a href="https://www.sii.cl" target="_blank" rel="noopener noreferrer" className="text-electric-blue hover:underline">sii.cl</a>.
          </span>
        </div>
      </div>
    </section>
  );
}
