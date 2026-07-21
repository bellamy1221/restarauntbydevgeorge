import { cn } from "@/lib/utils";
import Link from "next/link";

type WordmarkProps = {
  className?: string;
  href?: string;
  size?: "sm" | "md" | "lg" | "hero";
};

const sizes = {
  sm: "text-[1.05rem] tracking-[0.2em] md:text-lg",
  md: "text-2xl tracking-[0.22em]",
  lg: "text-3xl tracking-[0.2em] md:text-4xl",
  hero: "text-[clamp(2.75rem,8vw,6.5rem)] tracking-[0.14em]",
};

export function Wordmark({
  className,
  href = "#top",
  size = "md",
}: WordmarkProps) {
  const content = (
    <span
      className={cn(
        "font-display font-semibold uppercase leading-none text-current",
        sizes[size],
        className,
      )}
    >
      Vincenzo
    </span>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="inline-flex items-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2"
      aria-label="VINCENZO — на главную"
    >
      {content}
    </Link>
  );
}

export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-current/30 font-display text-sm font-semibold tracking-widest",
        className,
      )}
    >
      V
    </span>
  );
}
