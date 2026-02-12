/**
 * Validación de patente chilena.
 * Formatos aceptados: AA-BB-11 o AABB11 (2 letras, 2 letras, 2 números)
 */
const PATENTE_REGEX = /^[A-Za-z]{2}-?[A-Za-z]{2}-?\d{2}$|^[A-Za-z]{2}[A-Za-z]{2}\d{2}$/;

export function normalizarPatente(input: string): string {
  const limpio = input.trim().toUpperCase().replace(/\s/g, "");
  if (limpio.length === 6 && !limpio.includes("-")) {
    return `${limpio.slice(0, 2)}-${limpio.slice(2, 4)}-${limpio.slice(4, 6)}`;
  }
  return limpio;
}

export function validarPatenteChilena(patente: string): boolean {
  const normalizada = normalizarPatente(patente);
  if (normalizada.length !== 8 && normalizada.length !== 6) return false;
  const sinGuiones = normalizada.replace(/-/g, "");
  return PATENTE_REGEX.test(sinGuiones) && sinGuiones.length === 6;
}

export function formatoPatenteDisplay(patente: string): string {
  if (!validarPatenteChilena(patente)) return patente;
  const n = normalizarPatente(patente);
  return n.length === 8 ? n : `${n.slice(0, 2)}-${n.slice(2, 4)}-${n.slice(4, 6)}`;
}
