"use client";

import Link from "next/link";
import { FileText, Calendar, Wrench, ArrowRight } from "lucide-react";

const ARTICULOS = [
  {
    id: "apelar-multas",
    titulo: "Cómo apelar multas",
    desc: "Pasos y plazos para presentar un reclamo ante una multa de tránsito en Chile.",
    href: "#",
    icono: FileText,
  },
  {
    id: "permiso-circulacion",
    titulo: "Calendario de Permiso de Circulación 2026",
    desc: "Fechas por dígito de patente y cómo pagar en línea.",
    href: "#",
    icono: Calendar,
  },
  {
    id: "revision-tecnica",
    titulo: "Qué revisar antes de la revisión técnica",
    desc: "Checklist y consejos para aprobar a la primera.",
    href: "#revision-tecnica",
    icono: Wrench,
  },
];

export default function BlogFeed() {
  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-blog"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-blog"
          className="text-xl font-bold text-white mb-2"
        >
          Artículos de ayuda
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          Guías rápidas para multas, permiso de circulación y revisión técnica.
        </p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ARTICULOS.map(({ id, titulo, desc, href, icono: Icono }) => (
            <article
              key={id}
              className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover group"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-electric-blue/20 flex items-center justify-center">
                  <Icono className="w-5 h-5 text-electric-blue" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-white mb-1 group-hover:text-electric-blue transition">
                    {titulo}
                  </h3>
                  <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                    {desc}
                  </p>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 text-sm font-medium text-electric-blue hover:text-electric-blue/80 transition"
                  >
                    Leer más
                    <ArrowRight className="w-4 h-4" aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
