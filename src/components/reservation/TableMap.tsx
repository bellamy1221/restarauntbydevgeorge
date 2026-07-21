"use client";

import {
  floorTables,
  zoneLabels,
  type FloorTable,
  type TableZone,
} from "@/content/tables";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

type TableMapProps = {
  guests: number;
  selectedId: string | null;
  onSelect: (table: FloorTable | null) => void;
};

const statusLabel = {
  available: "Свободен",
  held: "Подтверждается",
  unavailable: "Занят",
} as const;

export function TableMap({ guests, selectedId, onSelect }: TableMapProps) {
  const [zone, setZone] = useState<TableZone | "all">("all");
  const [focusId, setFocusId] = useState<string | null>(null);

  const tables = useMemo(() => {
    return floorTables.filter((t) => {
      if (zone !== "all" && t.zone !== zone) return false;
      return true;
    });
  }, [zone]);

  const selected = floorTables.find((t) => t.id === selectedId) ?? null;
  const focus = floorTables.find((t) => t.id === focusId) ?? selected;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[0.7rem] uppercase tracking-[0.16em] text-stone">
            Выберите стол
          </p>
          <p className="mt-1 text-sm text-ink/55">
            Интерактивный план зала. Статусы — sample, для живой загрузки
            подключите систему бронирования.
          </p>
        </div>
        <div
          className="flex flex-wrap gap-1"
          role="tablist"
          aria-label="Зоны зала"
        >
          {(
            [
              ["all", "Все"],
              ["window", "Окно"],
              ["hall", "Зал"],
              ["bar", "Бар"],
              ["private", "Private"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={zone === id}
              data-cursor="hover"
              className={cn(
                "rounded-full px-3 py-2 text-[0.65rem] uppercase tracking-[0.12em] transition-colors",
                zone === id
                  ? "bg-ink text-paper"
                  : "bg-ink/[0.04] text-ink/55 hover:text-ink",
              )}
              onClick={() => setZone(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <div
          className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[linear-gradient(145deg,#ebe3d7_0%,#ddd2c3_45%,#d4c7b6_100%)]"
          role="img"
          aria-label="План зала VINCENZO"
        >
          {/* Room architecture hints */}
          <div className="absolute inset-x-[8%] top-[8%] h-[3%] rounded-full bg-ink/10" />
          <div className="absolute bottom-[10%] left-[8%] right-[30%] h-px bg-ink/10" />
          <div className="absolute bottom-[18%] right-[6%] top-[12%] w-[18%] rounded-sm border border-dashed border-ink/15 bg-ink/[0.03]">
            <span className="absolute left-1/2 top-3 -translate-x-1/2 text-[0.55rem] uppercase tracking-[0.16em] text-ink/35">
              Бар
            </span>
          </div>
          <div className="absolute bottom-[8%] right-[6%] h-[22%] w-[22%] rounded-sm border border-ink/10 bg-burgundy/[0.06]">
            <span className="absolute left-1/2 top-2 -translate-x-1/2 text-[0.55rem] uppercase tracking-[0.16em] text-burgundy/50">
              Private
            </span>
          </div>
          <div className="pointer-events-none absolute left-[6%] top-[10%] bottom-[12%] w-px bg-gradient-to-b from-transparent via-ink/15 to-transparent" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 text-[0.55rem] uppercase tracking-[0.2em] text-ink/30">
            Окна
          </span>

          {tables.map((table) => {
            const fits = table.seats >= guests;
            const disabled =
              table.status !== "available" || !fits;
            const active = selectedId === table.id;

            return (
              <button
                key={table.id}
                type="button"
                data-cursor="hover"
                disabled={disabled}
                aria-pressed={active}
                aria-label={`Стол ${table.label}, ${table.seats} мест, ${zoneLabels[table.zone]}, ${statusLabel[table.status]}`}
                className={cn(
                  "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center border transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  table.shape === "round" ? "rounded-full" : "rounded-2xl",
                  disabled && "cursor-not-allowed opacity-35",
                  !disabled && "hover:scale-105 hover:shadow-[0_12px_40px_rgba(28,22,18,0.18)]",
                  active
                    ? "z-10 border-burgundy bg-burgundy text-paper shadow-[0_16px_50px_rgba(106,48,48,0.35)] scale-105"
                    : table.status === "held"
                      ? "border-terracotta/50 bg-terracotta/15 text-ink"
                      : "border-ink/20 bg-paper/80 text-ink backdrop-blur-[2px]",
                )}
                style={{
                  left: `${table.x}%`,
                  top: `${table.y}%`,
                  width: `${table.w}%`,
                  height: `${table.h}%`,
                }}
                onMouseEnter={() => setFocusId(table.id)}
                onMouseLeave={() => setFocusId(null)}
                onFocus={() => setFocusId(table.id)}
                onBlur={() => setFocusId(null)}
                onClick={() => onSelect(active ? null : table)}
              >
                <span className="font-display text-sm tracking-wide md:text-base">
                  {table.label}
                </span>
                <span className="text-[0.55rem] uppercase tracking-[0.12em] opacity-70">
                  {table.seats} мест
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col justify-between rounded-[1.75rem] border border-ink/10 bg-paper p-5 md:p-6">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.16em] text-stone">
              Карточка стола
            </p>
            {focus ? (
              <div className="mt-4 space-y-3">
                <h3 className="font-display text-3xl tracking-wide text-ink">
                  Стол {focus.label}
                </h3>
                <p className="text-sm text-ink/60">
                  {zoneLabels[focus.zone]} · {focus.seats}{" "}
                  {focus.seats === 1 ? "место" : focus.seats < 5 ? "места" : "мест"}
                </p>
                <p className="text-sm text-ink/55">
                  {focus.note ?? "Комфортное место в зале VINCENZO."}
                </p>
                <p
                  className={cn(
                    "text-[0.7rem] uppercase tracking-[0.14em]",
                    focus.status === "available" && "text-olive",
                    focus.status === "held" && "text-terracotta",
                    focus.status === "unavailable" && "text-stone",
                  )}
                >
                  {statusLabel[focus.status]}
                  {focus.seats < guests ? " · мало мест для вашей компании" : ""}
                </p>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-relaxed text-ink/50">
                Наведите или выберите стол на плане. Можно оставить заявку и без
                выбора — просто укажите пожелания в комментарии.
              </p>
            )}
          </div>

          <div className="mt-8 space-y-2 border-t border-ink/10 pt-4 text-[0.7rem] text-ink/45">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-burgundy" /> Свободен
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-terracotta/70" />{" "}
              Подтверждается
            </div>
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-ink/25" /> Занят / не
              подходит по местам
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
