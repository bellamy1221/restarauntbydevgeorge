"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  reverse?: boolean;
};

export function Marquee({ items, className, reverse }: MarqueeProps) {
  const row = [...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden border-y border-ink/10 py-4",
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max gap-10 whitespace-nowrap will-change-transform",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display text-2xl tracking-[0.12em] text-ink/35 md:text-3xl"
          >
            {item}
            <span className="mx-6 text-burgundy/40">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
