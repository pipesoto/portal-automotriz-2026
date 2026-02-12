import Link from "next/link";
import { ExternalLink } from "lucide-react";

const officialLinks = [
  {
    name: "Registro Civil",
    url: "https://www.registrocivil.cl",
    description: "Consulta de multas y certificados",
  },
  {
    name: "MTT - Ministerio de Transportes",
    url: "https://www.mtt.gob.cl",
    description: "Normativa y tránsito",
  },
  {
    name: "TGR - Tesorería General de la República",
    url: "https://www.tgr.cl",
    description: "Pago de permisos y multas",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="font-semibold text-electric-blue mb-2">
              Fuentes oficiales
            </h3>
            <p className="text-sm text-slate-400 mb-3">
              Enlaces a organismos del Estado de Chile para consultas y pagos.
            </p>
            <ul className="space-y-2">
              {officialLinks.map(({ name, url, description }) => (
                <li key={url}>
                  <Link
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-slate-300 hover:text-electric-blue transition"
                  >
                    {name}
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                  </Link>
                  <span className="block text-xs text-slate-500">
                    {description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-electric-blue mb-2">Portal</h3>
            <ul className="space-y-1 text-sm text-slate-400">
              <li>
                <Link href="/comparador-soap" className="hover:text-electric-blue transition">
                  Comparador SOAP 2026
                </Link>
              </li>
              <li>
                <Link href="/multas-tag" className="hover:text-electric-blue transition">
                  Multas y TAG
                </Link>
              </li>
              <li>
                <Link href="/revision-tecnica" className="hover:text-electric-blue transition">
                  Revisión Técnica
                </Link>
              </li>
              <li>
                <Link href="/guias" className="hover:text-electric-blue transition">
                  Guías
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-electric-blue mb-2">Chile 2026</h3>
            <p className="text-sm text-slate-400">
              Herramienta de utilidad para conductores. SOAP, multas, revisión
              técnica y permiso de circulación. No somos un organismo oficial.
            </p>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} Portal Automotriz Chile 2026. Uso
          informativo.
        </div>
      </div>
    </footer>
  );
}
