"use client";

import { reserveCta } from "@/content/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function StickyReserve() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const reservation = document.getElementById("reservation");
      const pastHero = window.scrollY > (hero?.offsetHeight ?? 600) * 0.55;
      const rect = reservation?.getBoundingClientRect();
      const nearForm =
        rect != null && rect.top < window.innerHeight && rect.bottom > 0;
      setVisible(pastHero && !nearForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "safe-bottom fixed inset-x-0 bottom-0 z-40 px-4 pb-4 transition-all duration-400 md:hidden",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <a
        href={reserveCta.href}
        className="flex min-h-12 w-full items-center justify-center rounded-full bg-ink text-[0.75rem] font-medium uppercase tracking-[0.12em] text-paper shadow-[0_16px_40px_rgba(28,22,18,0.28)]"
      >
        {reserveCta.label}
      </a>
    </div>
  );
}
