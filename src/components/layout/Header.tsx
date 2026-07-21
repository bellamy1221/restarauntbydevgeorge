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
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header className="fixed inset-x-0 top-0 z-50 px-[var(--gutter)] pt-4 md:pt-5">
      <div
        className={cn(
          "container-wide mx-auto flex h-14 items-center justify-between rounded-full border px-4 transition-all duration-500 md:h-16 md:px-5",
          scrolled || open
            ? "border-ink/10 bg-paper/90 text-ink shadow-[0_18px_50px_rgba(28,22,18,0.12)] backdrop-blur-xl"
            : "border-white/15 bg-black/20 text-paper backdrop-blur-md",
        )}
      >
        <Wordmark
          size="sm"
          className={scrolled || open ? "text-ink" : "text-paper"}
        />

        <nav
          className="hidden items-center gap-7 lg:flex"
          aria-label="Основная навигация"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] opacity-80 transition-opacity hover:opacity-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            href={reserveCta.href}
            variant={scrolled || open ? "primary" : "on-dark"}
            className="!hidden !min-h-10 !rounded-full !px-4 !py-2 !text-[0.68rem] lg:!inline-flex"
          >
            {reserveCta.label}
          </Button>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setOpen((v) => !v)}
          >
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
          "fixed inset-x-0 top-[4.75rem] z-40 mx-[var(--gutter)] overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper/95 text-ink shadow-[0_30px_80px_rgba(28,22,18,0.18)] backdrop-blur-xl transition-all duration-400 lg:hidden",
          open
            ? "visible max-h-[80svh] opacity-100"
            : "invisible max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-6 py-6" aria-label="Мобильная навигация">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className="block border-b border-ink/8 py-3.5 font-display text-2xl tracking-wide"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <Button
            href={reserveCta.href}
            className="mt-6 w-full rounded-full"
            onClick={() => setOpen(false)}
          >
            {reserveCta.label}
          </Button>
        </nav>
      </div>
    </header>
  );
}
