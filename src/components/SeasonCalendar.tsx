import Link from "next/link";
import { monthNames, seasons } from "@/lib/seasons";

/**
 * "Calendario del revendedor": 12 meses × 4 temporadas.
 * Barra dorada = meses de venta · punto = fecha recomendada para surtir.
 */
export function SeasonCalendar({
  currentMonth,
  compact = false,
  onNavigate,
}: {
  currentMonth?: number | null;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  const cols = compact
    ? "grid-cols-[4.75rem_repeat(12,minmax(0,1fr))]"
    : "grid-cols-[5.5rem_repeat(12,minmax(0,1fr))] sm:grid-cols-[9rem_repeat(12,minmax(0,1fr))]";
  return (
    <div className="w-full" role="table" aria-label="Calendario de temporadas de venta">
      <div role="row" className={`grid ${cols} gap-[3px] pb-2`}>
        <span role="columnheader" className="sr-only">
          Temporada
        </span>
        {monthNames.map((m, i) => (
          <span
            key={m}
            role="columnheader"
            className={`text-center font-bold uppercase ${compact ? "text-[0.55rem]" : "text-[0.6rem] sm:text-[0.7rem]"} ${
              currentMonth === i + 1 ? "text-gold" : "text-cream/45"
            }`}
          >
            {compact ? (
              m[0]
            ) : (
              <>
                <span className="sm:hidden">{m[0]}</span>
                <span className="hidden sm:inline">{m}</span>
              </>
            )}
          </span>
        ))}
      </div>
      {seasons.map((s) => (
        <div
          key={s.slug}
          role="row"
          className={`grid ${cols} items-center gap-[3px] py-[3px]`}
        >
          <Link
            role="rowheader"
            href={`/temporadas/${s.slug}`}
            onClick={onNavigate}
            className={`truncate pr-2 font-bold text-cream/85 transition-colors hover:text-gold ${
              compact ? "text-[0.7rem]" : "text-xs sm:text-sm"
            }`}
          >
            {compact ? s.name.split(" ")[0] : s.name.replace(" y adornos navideños", "").replace(" escolares", "")}
          </Link>
          {monthNames.map((m, i) => {
            const active = s.activeMonths.includes(i + 1);
            const stock = s.stockBy.month === i + 1;
            return (
              <span
                key={m}
                role="cell"
                aria-label={`${m}: ${active ? "en venta" : "fuera de temporada"}${stock ? ", fecha para surtir" : ""}`}
                className={`relative block ${compact ? "h-2.5" : "h-4 sm:h-5"} rounded-[3px] ${
                  active ? "bg-gradient-to-b from-gold-light to-gold" : "bg-cream/[0.07]"
                } ${currentMonth === i + 1 ? "ring-1 ring-cream/70" : ""}`}
              >
                {stock && (
                  <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
                )}
              </span>
            );
          })}
        </div>
      ))}
      {!compact && (
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-cream/55">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-4 rounded-[2px] bg-gold" /> Meses de venta
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="relative inline-block h-2.5 w-4 rounded-[2px] bg-gold">
              <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink" />
            </span>
            Fecha recomendada para surtir
          </span>
        </p>
      )}
    </div>
  );
}
