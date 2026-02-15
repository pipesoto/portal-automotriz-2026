"use client";

import { useState, useEffect } from "react";
import { Search, Shield, AlertCircle, History, Loader2, ExternalLink, X, Copy } from "lucide-react";
import { validarPatenteChilena, normalizarPatente } from "@/lib/patente";

const STORAGE_KEY = "portal-multas-history";
const MAX_HISTORY = 8;
const CONSULTA_MULTAS_BASE =
  "https://consultamultas.srcei.cl/ConsultaMultas/consultaMultasExterna.do";

const TIPOS_VEHICULO = [
  { id: "auto", label: "Automóvil" },
  { id: "moto", label: "Motocicletas" },
  { id: "camioneta", label: "Camioneta" },
  { id: "pesados", label: "Minibús" },
] as const;

function getHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw) as unknown;
    return Array.isArray(arr) ? arr.slice(0, MAX_HISTORY) : [];
  } catch {
    return [];
  }
}

function saveHistory(patente: string) {
  const normalized = normalizarPatente(patente);
  const prev = getHistory().filter((p) => p !== normalized);
  const next = [normalized, ...prev].slice(0, MAX_HISTORY);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}

interface HeroDashboardProps {
  tipoVehiculo: string;
  onTipoVehiculoChange: (tipo: string) => void;
}

type TabId = "multas" | "soap";
type ModalMultas = "idle" | "loading" | "ready";

export default function HeroDashboard({
  tipoVehiculo,
  onTipoVehiculoChange,
}: HeroDashboardProps) {
  const [tab, setTab] = useState<TabId>("multas");
  const [patente, setPatente] = useState("");
  const [patenteError, setPatenteError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [buscarPressed, setBuscarPressed] = useState(false);
  const [modalMultas, setModalMultas] = useState<ModalMultas>("idle");
  const [mostrarRetencion, setMostrarRetencion] = useState(false);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handlePatenteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, "");
    setPatente(value);
    setPatenteError(null);
  };

  const handleBuscarMultas = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patente.trim()) {
      setPatenteError("Ingrese una patente");
      return;
    }
    if (!validarPatenteChilena(patente)) {
      setPatenteError("Formato inválido. Use AA-BB-11 o AABB11");
      return;
    }
    setPatenteError(null);
    saveHistory(patente);
    setHistory(getHistory());
    setBuscarPressed(true);
    setTimeout(() => setBuscarPressed(false), 200);
    setModalMultas("loading");
    setTimeout(() => setModalMultas("ready"), 2000);
  };

  const handleVerResultadosOficiales = () => {
    window.open(CONSULTA_MULTAS_BASE, "_blank", "noopener,noreferrer");
    setMostrarRetencion(true);
    setModalMultas("idle");
  };

  const pickFromHistory = (item: string) => {
    setPatente(item);
    setPatenteError(null);
  };

  return (
    <section
      className="relative py-8 md:py-10"
      aria-label="Herramientas principales"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center tracking-tight">
            SOAP, Multas y Revisión Técnica Chile 2026
          </h1>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald/20 text-emerald border border-emerald/40 shadow-sm">
            100% Gratuito
          </span>
        </div>
        {mostrarRetencion ? (
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto rounded-xl glass-card px-4 py-3 border border-emerald/20 bg-emerald/10">
            ¿Ya revisaste tus multas? No te vayas, usa nuestra calculadora de TAG y Combustible abajo para planificar tu viaje.
          </p>
        ) : (
          <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            Consulta multas de tránsito, compara precios SOAP y revisión técnica 2026. Todo en un solo lugar. Sin costo.
          </p>
        )}

        <div className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover">
          <div className="flex border-b border-white/10 mb-6">
            <button
              type="button"
              onClick={() => setTab("multas")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-t-xl transition ${
                tab === "multas"
                  ? "bg-electric-blue text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              aria-pressed={tab === "multas"}
            >
              <Search className="w-4 h-4" />
              Multas
            </button>
            <button
              type="button"
              onClick={() => setTab("soap")}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 text-sm font-medium rounded-t-xl transition ${
                tab === "soap"
                  ? "bg-electric-blue text-white"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              aria-pressed={tab === "soap"}
            >
              <Shield className="w-4 h-4" />
              SOAP
            </button>
          </div>

          {tab === "multas" && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-white mb-2">
                Buscador de Multas de Tránsito
              </h2>
              <p className="text-sm text-slate-400 mb-4">
                Ingrese su patente (AA-BB-11 o AABB11) o elija del historial.
              </p>
              <form onSubmit={handleBuscarMultas} noValidate>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={patente}
                    onChange={handlePatenteChange}
                    placeholder="Ej: ABCD12"
                    maxLength={8}
                    className="flex-1 px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-slate-500 focus:ring-2 focus:ring-electric-blue focus:border-electric-blue outline-none transition"
                    aria-label="Patente del vehículo"
                    aria-invalid={!!patenteError}
                    aria-describedby={patenteError ? "patente-error" : undefined}
                  />
                  <button
                    type="submit"
                    className={`px-4 py-3 bg-electric-blue text-white font-medium rounded-xl hover:bg-electric-blue-hover transition-all active:scale-[0.98] btn-glow ${
                      buscarPressed ? "scale-95" : ""
                    }`}
                  >
                    Buscar multas
                  </button>
                </div>
                {patenteError && (
                  <p
                    id="patente-error"
                    className="mt-2 flex items-center gap-1 text-sm text-red-400"
                    role="alert"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {patenteError}
                  </p>
                )}
              </form>
              {history.length > 0 && (
                <div className="mt-4">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-2">
                    <History className="w-3.5 h-3.5" />
                    Historial de búsqueda
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {history.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => pickFromHistory(item)}
                        className="px-3 py-1.5 rounded-lg text-sm font-medium bg-white/10 border border-white/20 text-slate-300 hover:bg-electric-blue/20 hover:border-electric-blue/40 hover:text-white transition"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "soap" && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-white mb-2">
                Comparador SOAP 2026
              </h2>
              <p className="text-sm text-slate-400 mb-4">
                Seleccione el tipo de vehículo (Automóvil, Camioneta, Motocicletas o Minibús) para ver precios según la tabla CMF.
              </p>
              <label htmlFor="tipo-vehiculo" className="sr-only">
                Tipo de vehículo
              </label>
              <select
                id="tipo-vehiculo"
                value={tipoVehiculo}
                onChange={(e) => onTipoVehiculoChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white focus:ring-2 focus:ring-electric-blue focus:border-electric-blue outline-none transition"
              >
                {TIPOS_VEHICULO.map(({ id, label }) => (
                  <option key={id} value={id} className="bg-slate-800 text-white">
                    {label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-slate-500">
                La tabla de precios se actualiza según su selección.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Buscador Multas Retenedor */}
      {(modalMultas === "loading" || modalMultas === "ready") && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-multas-title"
        >
          <div className="glass-card max-w-md w-full p-6 relative">
            <button
              type="button"
              onClick={() => setModalMultas("idle")}
              className="absolute top-4 right-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
            {modalMultas === "loading" && (
              <>
                <div className="flex justify-center mb-4">
                  <Loader2 className="w-12 h-12 text-electric-blue animate-spin" aria-hidden />
                </div>
                <h2 id="modal-multas-title" className="text-lg font-semibold text-white text-center mb-2">
                  Conectando con el Registro de Multas de Tránsito No Pagadas...
                </h2>
                <p className="text-sm text-slate-400 text-center">
                  Un momento, por favor.
                </p>
              </>
            )}
            {modalMultas === "ready" && (
              <>
                <h2 id="modal-multas-title" className="text-lg font-semibold text-white text-center mb-3">
                  Listo para consultar
                </h2>
                <p className="text-sm text-slate-400 text-center mb-3">
                  Los resultados oficiales están en el sitio del Registro Civil. Sin costo.
                </p>
                {patente && (
                  <div className="mb-4 p-3 rounded-xl bg-slate-800/80 border border-white/10">
                    <p className="text-sm text-slate-300 text-center mb-2">
                      Tu patente (sin guión): si no aparece en el sitio, cópiala y pégala en la casilla.
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <code className="px-3 py-1.5 rounded-lg bg-slate-700 text-white font-mono text-lg">
                        {normalizarPatente(patente).replace(/-/g, "")}
                      </code>
                      <button
                        type="button"
                        onClick={() => {
                          const txt = normalizarPatente(patente).replace(/-/g, "");
                          navigator.clipboard?.writeText(txt);
                        }}
                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium bg-white/10 text-slate-300 hover:bg-electric-blue/20 hover:text-white transition"
                      >
                        <Copy className="w-4 h-4" />
                        Copiar
                      </button>
                    </div>
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleVerResultadosOficiales}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-electric-blue text-white font-medium rounded-xl hover:bg-electric-blue-hover transition-all btn-glow"
                >
                  Ver Resultados Oficiales (Gratis)
                  <ExternalLink className="w-4 h-4" />
                </button>
                <p className="mt-3 text-xs text-slate-500 text-center">
                  Si te bloquean, entra por{" "}
                  <a
                    href="https://www.chileatiende.gob.cl/fichas/3439-certificado-de-multas-de-transito-no-pagadas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-electric-blue hover:underline"
                  >
                    ChileAtiende → Certificado de multas
                  </a>
                  .
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
