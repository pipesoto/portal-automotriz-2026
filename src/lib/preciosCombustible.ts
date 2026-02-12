export type PreciosCombustible = {
  "93": number;
  "95": number;
  "97": number;
  diesel: number;
  fuente?: string;
  actualizado?: string;
};

const FALLBACK: PreciosCombustible = {
  "93": 1190,
  "95": 1240,
  "97": 1320,
  diesel: 1050,
};

export async function fetchPreciosCombustible(): Promise<PreciosCombustible> {
  try {
    const res = await fetch("/api/precios-combustible");
    if (!res.ok) return FALLBACK;
    const data = await res.json();
    return {
      "93": Number(data["93"]) || FALLBACK["93"],
      "95": Number(data["95"]) || FALLBACK["95"],
      "97": Number(data["97"]) || FALLBACK["97"],
      diesel: Number(data.diesel) || FALLBACK.diesel,
      fuente: data.fuente,
      actualizado: data.actualizado,
    };
  } catch {
    return FALLBACK;
  }
}

/** Precio por defecto para calculadora (bencina 95 como referencia). */
export const PRECIO_LITRO_DEFAULT = 1240;
