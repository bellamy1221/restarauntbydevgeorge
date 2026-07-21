"use client";

import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import { LiquidBlob } from "@/components/motion/LiquidBlob";
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
        "[data-hero-mask]",
        { clipPath: "inset(18% 12% 18% 12% round 0px)" },
        { clipPath: "inset(0% 0% 0% 0% round 0px)", duration: 1.8 },
        0,
      )
        .fromTo(
          "[data-hero-image]",
          { scale: 1.18 },
          { scale: 1, duration: 2.4 },
          0,
        )
        .fromTo(
          "[data-hero-fade]",
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.15,
            stagger: 0.1,
          },
          0.45,
        )
        .fromTo(
          "[data-hero-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.2 },
          0.7,
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
      <div
        data-hero-mask
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: "inset(18% 12% 18% 12%)" }}
      >
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
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_40%,rgba(154,106,78,0.22),transparent_55%)]" />
        <LiquidBlob
          variant="wine"
          className="left-[-20%] top-[-10%] h-[70%] w-[70%] opacity-70"
        />
      </div>

      <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-[var(--gutter)] pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="container-wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p
                data-hero-fade
                className="mb-5 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-paper/75"
              >
                {copy.hero.eyebrow}
              </p>

              <h1
                data-hero-fade
                className="font-display text-[clamp(3rem,9vw,7.5rem)] font-medium uppercase leading-[0.9] tracking-[0.12em] text-paper"
              >
                Vincenzo
              </h1>

              <div
                data-hero-line
                className="mt-6 h-px w-32 origin-left bg-paper/40 md:w-48"
              />

              <p
                data-hero-fade
                className="mt-6 max-w-xl font-display text-[clamp(1.4rem,3vw,2.15rem)] leading-snug text-paper/90"
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
                <Magnetic>
                  <Button href={reserveCta.href} variant="on-dark">
                    {reserveCta.label}
                  </Button>
                </Magnetic>
                <Magnetic strength={0.2}>
                  <Button
                    href={menuCta.href}
                    variant="secondary"
                    className="border-paper/35 text-paper hover:border-paper/70 hover:bg-paper/5"
                  >
                    {menuCta.label}
                  </Button>
                </Magnetic>
              </div>
            </div>

            <div
              data-hero-fade
              className="hidden lg:col-span-4 lg:block lg:pb-2"
            >
              <div className="ml-auto max-w-[14rem] border border-paper/20 bg-ink/30 p-5 backdrop-blur-sm">
                <p className="text-[0.65rem] uppercase tracking-[0.16em] text-paper/50">
                  Сегодня вечером
                </p>
                <p className="mt-3 font-display text-xl leading-snug text-paper/90">
                  Стол у окна. Паста. Тихий свет.
                </p>
                <a
                  href="#reservation"
                  className="link-underline mt-4 inline-block text-[0.7rem] uppercase tracking-[0.14em] text-paper/70"
                >
                  Выбрать место →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
