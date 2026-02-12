"use client";

import { useState } from "react";
import { Calculator, Save } from "lucide-react";

const IMPUESTO_TASA = 0.015;
const GASTOS_NOTARIA_REGISTRO = 36000;
const COSTO_INFORME_TIPICO = 15000;

export default function CalculadoraTransferencia() {
  const [valorAuto, setValorAuto] = useState<string>("");

  const valor = valorAuto ? parseFloat(valorAuto.replace(/\D/g, "")) : 0;
  const impuesto = valor > 0 ? valor * IMPUESTO_TASA : 0;
  const total = impuesto + GASTOS_NOTARIA_REGISTRO;

  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-calc-transferencia"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-calc-transferencia"
          className="flex items-center gap-2 text-xl font-bold text-white mb-2"
        >
          <Calculator className="w-5 h-5 text-electric-blue" aria-hidden />
          Calculadora de Transferencia
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Fórmula legal: Impuesto 1,5% del valor + gastos Registro Civil. Hazlo tú mismo y ahorra.
        </p>

        <div className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover">
          <label htmlFor="valor-auto" className="block text-sm font-medium text-slate-300 mb-2">
            Valor del vehículo (CLP)
          </label>
          <input
            id="valor-auto"
            type="text"
            inputMode="numeric"
            value={valorAuto}
            onChange={(e) =>
              setValorAuto(
                e.target.value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")
              )
            }
            placeholder="Ej: 5.500.000"
            className="w-full max-w-xs px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-slate-500 focus:ring-2 focus:ring-electric-blue outline-none transition mb-6"
          />

          {valor > 0 && (
            <div className="space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Impuesto (Valor × 1,5%)</span>
                <strong className="text-emerald">
                  ${Math.round(impuesto).toLocaleString("es-CL")}
                </strong>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Gastos Notaría/Registro</span>
                <strong className="text-emerald">
                  ${GASTOS_NOTARIA_REGISTRO.toLocaleString("es-CL")}
                </strong>
              </div>
              <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                <span className="font-medium text-white">Total</span>
                <span className="text-xl font-bold text-electric-blue">
                  ${Math.round(total).toLocaleString("es-CL")}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-emerald/15 border border-emerald/30 flex items-center gap-2">
                <Save className="w-5 h-5 text-emerald flex-shrink-0" aria-hidden />
                <div>
                  <span className="font-semibold text-white block">Ahorro vs. informe comercial</span>
                  <span className="text-sm text-slate-300">
                    Hacer el trámite tú mismo evita pagar informes de hasta $
                    {COSTO_INFORME_TIPICO.toLocaleString("es-CL")}+. Usa multas y
                    revisión técnica gratis en este portal.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
