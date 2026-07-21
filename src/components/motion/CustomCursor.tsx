"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function subscribePointer(cb: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  fine.addEventListener("change", cb);
  reduced.addEventListener("change", cb);
  return () => {
    fine.removeEventListener("change", cb);
    reduced.removeEventListener("change", cb);
  };
}

function getCursorEnabled() {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CustomCursor() {
  const enabled = useSyncExternalStore(
    subscribePointer,
    getCursorEnabled,
    () => false,
  );
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let hovering = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      hovering = Boolean(
        t?.closest("a, button, [data-cursor='hover'], input, select, textarea"),
      );
    };

    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) scale(${hovering ? 1.85 : 1})`;
        ring.current.style.opacity = hovering ? "0.55" : "0.35";
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);
    document.documentElement.classList.add("has-custom-cursor");

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy mix-blend-difference"
        aria-hidden
      />
      <div
        ref={ring}
        className={cn(
          "pointer-events-none fixed left-0 top-0 z-[199] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/40",
          "transition-[opacity] duration-300",
        )}
        aria-hidden
      />
    </>
  );
}
