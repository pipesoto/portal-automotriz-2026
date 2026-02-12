/**
 * Placeholder para AdSense. Estrategicamente entre secciones para maximizar CTR.
 * Reemplazar por bloque AdSense cuando esté aprobado.
 */
type Position = "header" | "between" | "floating-mobile";

const styles: Record<Position, string> = {
  header:
    "w-full min-h-[70px] flex items-center justify-center rounded-xl border border-white/10 bg-slate-800/40 backdrop-blur-sm py-3 px-4",
  between:
    "w-full max-w-2xl mx-auto my-4 min-h-[120px] flex items-center justify-center rounded-2xl border border-white/10 bg-slate-800/40 backdrop-blur-sm py-4 px-4",
  "floating-mobile":
    "fixed bottom-0 left-0 right-0 z-40 min-h-[50px] flex items-center justify-center rounded-t-2xl border-t border-white/10 bg-slate-900/95 backdrop-blur-md py-3 md:hidden safe-area-pb",
};

export default function AdPlaceholder({ position }: { position: Position }) {
  return (
    <div
      className={styles[position]}
      role="presentation"
      aria-label="Espacio publicitario"
    >
      <span className="text-slate-500 text-xs font-medium">
        [ Anuncio ]
      </span>
    </div>
  );
}
