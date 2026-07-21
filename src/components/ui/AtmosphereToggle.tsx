"use client";

import { cn } from "@/lib/utils";

export type AtmosphereMode = "pranzo" | "cena";

type AtmosphereToggleProps = {
  value: AtmosphereMode;
  onChange: (value: AtmosphereMode) => void;
  className?: string;
};

export function AtmosphereToggle({
  value,
  onChange,
  className,
}: AtmosphereToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-white/20 bg-black/25 p-1 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl",
        className,
      )}
      role="group"
      aria-label="Атмосфера зала"
    >
      {(
        [
          { id: "pranzo" as const, label: "Pranzo", hint: "День" },
          { id: "cena" as const, label: "Cena", hint: "Вечер" },
        ] as const
      ).map((opt) => {
        const active = value === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            data-cursor="hover"
            aria-pressed={active}
            onClick={() => onChange(opt.id)}
            className={cn(
              "relative min-w-[7.5rem] rounded-full px-5 py-2.5 text-[0.78rem] font-semibold tracking-[0.06em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
              active
                ? "bg-paper text-ink shadow-sm"
                : "text-paper/75 hover:text-paper",
            )}
          >
            <span className="block leading-none">{opt.label}</span>
            <span
              className={cn(
                "mt-1 block text-[0.58rem] uppercase tracking-[0.16em]",
                active ? "text-ink/45" : "text-paper/40",
              )}
            >
              {opt.hint}
            </span>
          </button>
        );
      })}
    </div>
  );
}
