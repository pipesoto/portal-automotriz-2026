"use client";

import { useState, useMemo } from "react";
import { MapPin, Phone, Clock, ExternalLink, Search, Building2, DollarSign } from "lucide-react";
import { REGIONES_PRT, PLANTAS_PRT, MTT_URL, type PlantaRevisionTecnica } from "@/data/plantasRevisionTecnica";
import datosPRT from "@/data/plantasPRT.json";

const PRT_URL = "https://www.prt.cl";

type PlantaPRTJson = {
  id: string;
  region: string;
  comuna: string;
  concesionaria: string;
  direccion: string;
  telefono: string | null;
  horario: string;
  tarifas: Record<string, string> | null;
};

type DatosPRT = {
  fuente: string;
  regiones: string[];
  comunasByRegion: Record<string, string[]>;
  plantas: PlantaPRTJson[];
};

/** Nombre a mostrar: concesionaria (JSON) o nombre (fallback). */
function nombrePlanta(planta: PlantaPRTJson | PlantaRevisionTecnica): string {
  if ("concesionaria" in planta && planta.concesionaria) return planta.concesionaria;
  if ("nombre" in planta && planta.nombre) return planta.nombre;
  return "Planta PRT";
}

const datosOficiales = datosPRT as DatosPRT;
const usaDatosOficiales = datosOficiales.plantas.length > 0;

export default function PlantasRevisionTecnica() {
  const [region, setRegion] = useState(usaDatosOficiales ? "" : "rm");
  const [comuna, setComuna] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const comunasOpciones = useMemo(() => {
    if (usaDatosOficiales && region) {
      const list = datosOficiales.comunasByRegion[region] || [];
      return [{ value: "", label: "Todas las comunas" }, ...list.map((c) => ({ value: c, label: c }))];
    }
    return [];
  }, [region]);

  const plantasFiltradas = useMemo(() => {
    if (usaDatosOficiales) {
      if (!region) return [];
      let list = datosOficiales.plantas.filter((p) => p.region === region);
      if (comuna) list = list.filter((p) => p.comuna === comuna);
      if (busqueda.trim()) {
        const q = busqueda.toLowerCase();
        const nombreOConcesionaria = (p: (typeof datosOficiales.plantas)[0]) =>
          ("concesionaria" in p ? p.concesionaria : (p as { nombre?: string }).nombre) || "";
        list = list.filter(
          (p) =>
            p.comuna.toLowerCase().includes(q) ||
            nombreOConcesionaria(p).toLowerCase().includes(q) ||
            p.direccion.toLowerCase().includes(q)
        );
      }
      return list;
    }
    let list = PLANTAS_PRT.filter((p) => p.regionId === region);
    if (busqueda.trim()) {
      const q = busqueda.toLowerCase();
      list = list.filter(
        (p) =>
          p.comuna.toLowerCase().includes(q) ||
          p.nombre.toLowerCase().includes(q) ||
          p.direccion.toLowerCase().includes(q) ||
          p.operador.toLowerCase().includes(q)
      );
    }
    return list;
  }, [usaDatosOficiales, region, comuna, busqueda]);

  return (
    <section
      className="py-8 md:py-10"
      aria-labelledby="titulo-plantas-prt"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2
          id="titulo-plantas-prt"
          className="flex items-center gap-2 text-xl font-bold text-white mb-2"
        >
          <MapPin className="w-5 h-5 text-electric-blue" aria-hidden />
          Plantas de Revisión Técnica en Chile
        </h2>
        <p className="text-sm text-slate-400 mb-6">
          {usaDatosOficiales
            ? "Datos oficiales de prt.cl. Seleccione región y comuna."
            : "Ubicación, dirección y horarios. Ejecute npm run parse-prt con el Excel de prt.cl para cargar el listado oficial."}
        </p>

        <div className="glass-card p-6 transition-shadow duration-300 hover:shadow-glass-hover mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={usaDatosOficiales ? "" : "sm:col-span-2"}>
              <label htmlFor="region-prt" className="block text-sm font-medium text-slate-300 mb-1">
                Región
              </label>
              <select
                id="region-prt"
                value={region}
                onChange={(e) => {
                  setRegion(e.target.value);
                  setComuna("");
                }}
                className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white focus:ring-2 focus:ring-electric-blue outline-none transition"
              >
                {usaDatosOficiales ? (
                  <>
                    <option value="" className="bg-slate-800 text-white">
                      Selecciona región
                    </option>
                    {datosOficiales.regiones.map((r) => (
                      <option key={r} value={r} className="bg-slate-800 text-white">
                        {r}
                      </option>
                    ))}
                  </>
                ) : (
                  REGIONES_PRT.map((r) => (
                    <option key={r.id} value={r.id} className="bg-slate-800 text-white">
                      {r.nombre}
                    </option>
                  ))
                )}
              </select>
            </div>
            {usaDatosOficiales && comunasOpciones.length > 0 && (
              <div>
                <label htmlFor="comuna-prt" className="block text-sm font-medium text-slate-300 mb-1">
                  Comuna
                </label>
                <select
                  id="comuna-prt"
                  value={comuna}
                  onChange={(e) => setComuna(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white focus:ring-2 focus:ring-electric-blue outline-none transition"
                >
                  {comunasOpciones.map((c) => (
                    <option key={c.value} value={c.value} className="bg-slate-800 text-white">
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className={usaDatosOficiales ? "lg:col-span-2" : "sm:col-span-2"}>
              <label htmlFor="busqueda-prt" className="block text-sm font-medium text-slate-300 mb-1">
                Buscar (concesionaria, comuna, dirección)
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" aria-hidden />
                <input
                  id="busqueda-prt"
                  type="text"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Ej: Quilicura, Applus..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/20 bg-slate-800/80 text-white placeholder-slate-500 focus:ring-2 focus:ring-electric-blue outline-none transition"
                />
              </div>
            </div>
          </div>
        </div>

        {plantasFiltradas.length === 0 ? (
          <div className="glass-card p-6 text-center text-slate-400">
            <p className="mb-4">
              {usaDatosOficiales
                ? "No hay plantas con ese criterio en esta región/comuna."
                : "No hay plantas con ese criterio. Ejecute npm run parse-prt con el Excel de prt.cl."}
            </p>
            <a
              href={usaDatosOficiales ? PRT_URL : MTT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-electric-blue hover:text-electric-blue/80"
            >
              {usaDatosOficiales ? "Ver prt.cl" : "Consultar MTT"}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <ul className="space-y-4">
            {plantasFiltradas.map((planta) => {
              const nombreDisplay = nombrePlanta(planta);
              const tarifasObj = usaDatosOficiales && "tarifas" in planta ? (planta as PlantaPRTJson).tarifas : null;
              return (
                <li key={planta.id}>
                  <article className="glass-card p-4 sm:p-5 transition-shadow duration-300 hover:shadow-glass-hover">
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <Building2 className="w-5 h-5 text-electric-blue flex-shrink-0" aria-hidden />
                        <h3 className="font-semibold text-white">{nombreDisplay}</h3>
                      </div>
                      <p className="text-sm text-emerald/90 font-medium">
                        {planta.comuna}
                        {usaDatosOficiales && "region" in planta && planta.region && ` · ${planta.region}`}
                      </p>
                      <div className="grid gap-2 text-sm text-slate-300">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" aria-hidden />
                          <span>{planta.direccion}</span>
                        </div>
                        {"telefono" in planta && planta.telefono && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-electric-blue flex-shrink-0" aria-hidden />
                            <span>{planta.telefono}</span>
                          </div>
                        )}
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-electric-blue flex-shrink-0 mt-0.5" aria-hidden />
                          <span>{planta.horario}</span>
                        </div>
                      </div>
                      {tarifasObj && Object.keys(tarifasObj).length > 0 && (
                        <div className="mt-2 pt-3 border-t border-white/10">
                          <p className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
                            <DollarSign className="w-4 h-4 text-emerald-400" aria-hidden />
                            Tarifas
                          </p>
                          <ul className="space-y-1 text-sm text-slate-400">
                            {Object.entries(tarifasObj).map(([label, valor]) => {
                              const valorNum = String(valor).replace(/\D/g, "");
                              const mostrar = valorNum ? "$" + Number(valorNum).toLocaleString("es-CL") : "$" + valor;
                              return (
                                <li key={label} className="flex justify-between gap-2">
                                  <span>{label}</span>
                                  <span className="text-emerald-300 font-medium">{mostrar}</span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      )}
                      {"operador" in planta && planta.operador && (
                        <p className="text-xs text-slate-500">Operador: {planta.operador}</p>
                      )}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-6 glass-card px-4 py-3 flex flex-wrap items-center justify-center gap-2 text-sm text-slate-400">
          <span>
            {usaDatosOficiales ? "Fuente oficial: " : "Listado referencial. Para datos oficiales: "}
          </span>
          <a
            href={PRT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-electric-blue hover:text-electric-blue/80 font-medium"
          >
            prt.cl
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <span className="text-white/40">·</span>
          <a
            href={MTT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-electric-blue hover:text-electric-blue/80 font-medium"
          >
            MTT - mtt.gob.cl
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
