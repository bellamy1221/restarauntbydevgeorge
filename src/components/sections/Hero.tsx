"use client";

import { Button } from "@/components/ui/Button";
import { restaurant } from "@/content/restaurant";
import { copy } from "@/content/copy";
import { menuCta, reserveCta } from "@/content/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-hero-image]",
        { scale: 1.12 },
        { scale: 1, duration: 2.2 },
        0,
      ).fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 1.1, stagger: 0.12 },
        0.35,
      );
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
      aria-label="VINCENZO"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div data-hero-image className="absolute inset-0 h-full w-full">
          <Image
            src="/images/hero/dining.jpg"
            alt="Накрытый стол в тёплом вечернем свете"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(28,22,18,0.45)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-[var(--gutter)] pb-16 pt-28 md:pb-20 md:pt-32">
        <div className="container-wide">
          <p
            data-hero-fade
            className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/75"
          >
            {copy.hero.eyebrow}
          </p>

          <h1
            data-hero-fade
            className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-medium uppercase leading-[0.92] tracking-[0.14em] text-paper"
          >
            Vincenzo
          </h1>

          <p
            data-hero-fade
            className="mt-6 max-w-xl font-display text-2xl leading-snug text-paper/90 md:text-3xl"
          >
            {restaurant.tagline}
          </p>

          <p
            data-hero-fade
            className="mt-4 max-w-lg text-sm leading-relaxed text-paper/70 md:text-base"
          >
            {copy.hero.lead}
          </p>

          <div data-hero-fade className="mt-10 flex flex-wrap gap-3">
            <Button href={reserveCta.href} variant="on-dark">
              {reserveCta.label}
            </Button>
            <Button
              href={menuCta.href}
              variant="secondary"
              className="border-paper/35 text-paper hover:border-paper/70 hover:bg-paper/5"
            >
              {menuCta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
