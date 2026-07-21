import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "on-dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink-soft focus-visible:ring-offset-paper",
  secondary:
    "bg-transparent text-ink border border-ink/25 hover:border-ink/60 hover:bg-ink/[0.03]",
  ghost: "bg-transparent text-ink hover:bg-ink/[0.04]",
  "on-dark":
    "bg-paper text-ink hover:bg-cream focus-visible:ring-offset-ink",
};

type ButtonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  href?: string;
  onClick?: ComponentProps<"button">["onClick"];
} & Omit<ComponentProps<"button">, "className" | "onClick">;

export function Button({
  children,
  variant = "primary",
  className,
  href,
  type = "button",
  onClick,
  ...props
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.78rem] font-semibold tracking-[0.08em] uppercase transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-12",
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick as ComponentProps<"a">["onClick"]}
      >
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
