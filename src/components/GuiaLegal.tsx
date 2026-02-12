"use client";

import { Scale, Smartphone, Camera } from "lucide-react";

const LEYES = [
  {
    id: "ley-jacinta",
    titulo: "Ley Jacinta",
    icono: Scale,
    texto:
      "Protección integral a víctimas de accidentes. Endurece los requisitos médicos para obtener licencia.",
  },
  {
    id: "ley-no-chat",
    titulo: "Ley No Chat",
    icono: Smartphone,
    texto:
      "Infracción Gravísima. Prohíbe manipular celulares incluso en luz roja. Multas de hasta 3 UTM y suspensión de licencia.",
  },
  {
    id: "ley-cati",
    titulo: "Ley CATI",
    icono: Camera,
    texto:
      "Cámaras automáticas que multan exceso de velocidad y luces rojas. Las multas se notifican al dueño del vehículo.",
  },
];

export default function GuiaLegal() {
  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-guia-legal"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-guia-legal"
          className="text-xl font-bold text-white mb-2"
        >
          En Simple · Conoce tus Derechos
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Leyes de tránsito explicadas en simple. Para que entiendas todo gratis.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {LEYES.map(({ id, titulo, icono: Icono, texto }) => (
            <article
              key={id}
              className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icono className="w-5 h-5 text-electric-blue" aria-hidden />
                <h3 className="font-semibold text-white">{titulo}</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{texto}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
