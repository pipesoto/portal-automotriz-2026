import { NextResponse } from "next/server";

export const revalidate = 86400; // Revalidar cada 24 horas (precio día a día)

const FALLBACK = {
  "93": 1190,
  "95": 1240,
  "97": 1320,
  diesel: 1050,
  fuente: "referencial",
  actualizado: new Date().toISOString().slice(0, 10),
};

export type PreciosCombustibleResponse = {
  "93": number;
  "95": number;
  "97": number;
  diesel: number;
  fuente: string;
  actualizado: string;
};

export async function GET() {
  const apiUrl = process.env.COMBUSTIBLE_API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(apiUrl, { next: { revalidate: 86400 } });
      if (!res.ok) throw new Error("API no disponible");
      const data = await res.json();
      const precios: PreciosCombustibleResponse = {
        "93": Number(data["93"] ?? data.bencina93 ?? data.gasolina93) || FALLBACK["93"],
        "95": Number(data["95"] ?? data.bencina95 ?? data.gasolina95) || FALLBACK["95"],
        "97": Number(data["97"] ?? data.bencina97 ?? data.gasolina97) || FALLBACK["97"],
        diesel: Number(data.diesel ?? data.gasoleo) || FALLBACK.diesel,
        fuente: data.fuente ?? "API",
        actualizado: data.actualizado ?? new Date().toISOString().slice(0, 10),
      };
      return NextResponse.json(precios);
    } catch {
      // Si falla la API externa, devolver fallback
    }
  }
  return NextResponse.json({
    ...FALLBACK,
    actualizado: new Date().toISOString().slice(0, 10),
  });
}
