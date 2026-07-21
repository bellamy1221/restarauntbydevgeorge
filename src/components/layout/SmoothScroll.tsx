"use client";

import { ReactLenis, type LenisRef } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    let detachScroll: (() => void) | undefined;

    const tick = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();

    const attach = () => {
      if (cancelled) return;
      const lenis = lenisRef.current?.lenis;
      if (!lenis) {
        requestAnimationFrame(attach);
        return;
      }
      lenis.on("scroll", ScrollTrigger.update);
      detachScroll = () => lenis.off("scroll", ScrollTrigger.update);
      requestAnimationFrame(refresh);
    };
    attach();

    window.addEventListener("load", refresh);
    window.addEventListener("resize", refresh);

    return () => {
      cancelled = true;
      detachScroll?.();
      gsap.ticker.remove(tick);
      window.removeEventListener("load", refresh);
      window.removeEventListener("resize", refresh);
    };
  }, [enabled]);

  if (!enabled) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        lerp: 0.08,
        smoothWheel: true,
        syncTouch: false,
        autoRaf: false,
        overscroll: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
