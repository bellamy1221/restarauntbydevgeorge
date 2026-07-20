"use client";

import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/ui/Wordmark";
import { navigation, reserveCta } from "@/content/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,color] duration-500",
        scrolled || open
          ? "bg-paper/90 text-ink shadow-[0_1px_0_rgba(28,22,18,0.08)] backdrop-blur-md"
          : "bg-transparent text-paper",
      )}
    >
      <div className="container-wide flex h-[var(--nav-h)] items-center justify-between px-[var(--gutter)]">
        <Wordmark
          size="sm"
          className={scrolled || open ? "text-ink" : "text-paper"}
        />

        <nav
          className="hidden items-center gap-8 lg:flex"
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="link-underline text-[0.75rem] font-medium uppercase tracking-[0.14em] opacity-90 hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            href={reserveCta.href}
            variant={scrolled || open ? "primary" : "on-dark"}
            className="!hidden !min-h-10 !px-4 !py-2.5 !text-[0.7rem] lg:!inline-flex"
          >
            {reserveCta.label}
          </Button>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Меню</span>
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300",
                  open && "translate-y-[7px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[7px] h-px w-full bg-current transition-opacity duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-[14px] h-px w-full bg-current transition-transform duration-300",
                  open && "-translate-y-[7px] -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-x-0 top-[var(--nav-h)] bottom-0 z-40 bg-paper text-ink transition-[opacity,visibility] duration-400 lg:hidden",
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0",
        )}
      >
        <nav
          className="flex h-full flex-col justify-between px-[var(--gutter)] pb-10 pt-8"
          aria-label="Мобильная навигация"
        >
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="block border-b border-ink/10 py-4 font-display text-3xl tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href={reserveCta.href}
            className="w-full"
            onClick={() => setOpen(false)}
          >
            {reserveCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
