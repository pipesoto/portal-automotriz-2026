"use client";

import { useState } from "react";
import { CheckSquare } from "lucide-react";

// Ítems según requisitos de la revisión técnica (MTT / prt.cl): inspección visual y técnica.
const ITEMS = [
  {
    id: "documentacion",
    label: "Documentación al día",
    desc: "Permiso de circulación vigente y certificado de revisión técnica anterior (o homologación si es primera vez).",
  },
  {
    id: "luces",
    label: "Luces y señalización",
    desc: "Focos delanteros y traseros, intermitentes, luz de patente y retrovisores operativos; se verifica con luxómetro.",
  },
  {
    id: "neumaticos",
    label: "Neumáticos (dibujo ≥ 1,6 mm)",
    desc: "Dibujo mayor o igual a 1,6 mm, sin cortes ni deformaciones visibles.",
  },
  {
    id: "frenos",
    label: "Frenos",
    desc: "Eficacia de freno de servicio y auxiliar; se mide en planta con frenómetro.",
  },
  {
    id: "vidrios",
    label: "Vidrios y visibilidad",
    desc: "Parabrisas y vidrios sin trizaduras; limpiaparabrisas operativos; sin láminas prohibidas.",
  },
  {
    id: "emisiones",
    label: "Emisiones contaminantes",
    desc: "Sin humo visible; certificado de emisiones al día cuando corresponda.",
  },
  {
    id: "seguridad",
    label: "Elementos de seguridad",
    desc: "Cinturones operativos; kit de emergencia: extintor cargado, chaleco reflectante, gata y llave cruz.",
  },
];

export default function ChecklistPreRevision() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const total = ITEMS.length;
  const completados = Object.values(checked).filter(Boolean).length;

  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-checklist"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-checklist"
          className="flex items-center gap-2 text-xl font-bold text-white mb-2"
        >
          <CheckSquare className="w-5 h-5 text-electric-blue" aria-hidden />
          Checklist Pre-Revisión Técnica
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Marque cada ítem antes de ir a la revisión técnica.
        </p>

        <div className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover">
          <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
            <span>
              {completados} de {total} completados
            </span>
            {completados === total && (
              <span className="font-medium text-emerald">Listo para revisión</span>
            )}
          </div>
          <ul className="space-y-3">
            {ITEMS.map(({ id, label, desc }) => (
              <li key={id}>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={!!checked[id]}
                    onChange={() => toggle(id)}
                    className="mt-1 w-5 h-5 rounded border-white/30 bg-slate-800/80 text-electric-blue focus:ring-2 focus:ring-electric-blue"
                  />
                  <span className="flex-1">
                    <span
                      className={`font-medium transition ${
                        checked[id] ? "text-emerald line-through" : "text-white group-hover:text-slate-200"
                      }`}
                    >
                      {label}
                    </span>
                    <span className="block text-sm text-slate-400">{desc}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-slate-500">
            Referencia:{" "}
            <a
              href="https://www.prt.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="text-electric-blue underline"
            >
              prt.cl
            </a>{" "}
            / MTT. Consulte requisitos exactos según tipo de vehículo (B, A1, A2).
          </p>
        </div>
      </div>
    </section>
  );
}
