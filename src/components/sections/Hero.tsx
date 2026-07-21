"use client";

import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/motion/Magnetic";
import {
  AtmosphereToggle,
  type AtmosphereMode,
} from "@/components/ui/AtmosphereToggle";
import { restaurant } from "@/content/restaurant";
import { menuCta, reserveCta } from "@/content/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useRef, useState } from "react";

gsap.registerPlugin(useGSAP);

const scenes = {
  pranzo: {
    src: "/images/hero/lunch.jpg",
    alt: "Светлый зал VINCENZO днём",
    line: "Светлый зал. Лёгкий обед. Спокойный ритм.",
    overlay: "from-ink/20 via-ink/10 to-ink/40",
  },
  cena: {
    src: "/images/hero/dinner.jpg",
    alt: "Вечерний стол при свечах",
    line: "Тихий свет. Точная кухня. Долгий ужин.",
    overlay: "from-ink/60 via-ink/45 to-ink/82",
  },
} as const;

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const [mode, setMode] = useState<AtmosphereMode>("cena");
  const ready = useRef(false);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.fromTo(
        "[data-hero-fade]",
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.12,
        },
      );

      const pranzo = root.current?.querySelector(
        '[data-scene="pranzo"]',
      ) as HTMLElement | null;
      const cena = root.current?.querySelector(
        '[data-scene="cena"]',
      ) as HTMLElement | null;
      const veil = root.current?.querySelector(
        "[data-hero-veil]",
      ) as HTMLElement | null;

      if (!pranzo || !cena) return;

      if (!ready.current) {
        gsap.set(cena, { opacity: 1, clipPath: "circle(140% at 50% 55%)" });
        gsap.set(pranzo, { opacity: 0, clipPath: "circle(0% at 50% 55%)" });
        ready.current = true;
        return;
      }

      if (reduced) {
        gsap.set(cena, {
          opacity: mode === "cena" ? 1 : 0,
          clipPath: "circle(140% at 50% 55%)",
        });
        gsap.set(pranzo, {
          opacity: mode === "pranzo" ? 1 : 0,
          clipPath: "circle(140% at 50% 55%)",
        });
        return;
      }

      const incoming = mode === "cena" ? cena : pranzo;
      const outgoing = mode === "cena" ? pranzo : cena;

      const tl = gsap.timeline();
      tl.set(incoming, {
        opacity: 1,
        clipPath: "circle(0% at 50% 55%)",
        scale: 1.06,
      })
        .to(veil, { opacity: 0.28, duration: 0.3, ease: "power2.out" }, 0)
        .to(
          incoming,
          {
            clipPath: "circle(140% at 50% 55%)",
            scale: 1,
            duration: 1.15,
            ease: "power3.inOut",
          },
          0.05,
        )
        .to(
          outgoing,
          { opacity: 0, duration: 0.85, ease: "power2.inOut" },
          0.2,
        )
        .to(veil, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.75);
    },
    { scope: root, dependencies: [mode] },
  );

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-ink text-paper"
      aria-label="VINCENZO"
    >
      {(["cena", "pranzo"] as const).map((key) => (
        <div
          key={key}
          data-scene={key}
          className="absolute inset-0"
          aria-hidden={mode !== key}
        >
          <Image
            src={scenes[key].src}
            alt={mode === key ? scenes[key].alt : ""}
            fill
            priority={key === "cena"}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b ${scenes[key].overlay}`}
          />
        </div>
      ))}

      <div
        data-hero-veil
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_55%,rgba(242,235,226,0.2),transparent_42%)] opacity-0"
      />

      <div className="relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-[var(--gutter)] pb-16 pt-28 text-center">
        <p
          data-hero-fade
          className="mb-6 text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-paper/80"
        >
          Современная итальянская кухня
        </p>

        <h1
          data-hero-fade
          className="font-display text-[clamp(3.4rem,10vw,8rem)] font-bold uppercase leading-[0.88] tracking-[0.1em] text-paper"
        >
          Vincenzo
        </h1>

        <p
          data-hero-fade
          className="font-display-italic mt-6 max-w-xl text-[clamp(1.45rem,2.8vw,2.15rem)] leading-snug text-paper/95"
        >
          {restaurant.tagline}
        </p>

        <div data-hero-fade className="mt-10">
          <AtmosphereToggle value={mode} onChange={setMode} />
        </div>

        <p
          data-hero-fade
          className="mt-6 max-w-md text-[0.95rem] font-medium leading-relaxed text-paper/75"
        >
          {scenes[mode].line}
        </p>

        <div
          data-hero-fade
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Magnetic>
            <Button href={reserveCta.href} variant="on-dark">
              {reserveCta.label}
            </Button>
          </Magnetic>
          <Magnetic strength={0.18}>
            <Button
              href={menuCta.href}
              variant="secondary"
              className="rounded-full border-paper/35 text-paper hover:border-paper/70 hover:bg-paper/10"
            >
              {menuCta.label}
            </Button>
          </Magnetic>
        </div>

        <a
          data-hero-fade
          href="#reservation"
          className="mt-12 text-[0.7rem] uppercase tracking-[0.18em] text-paper/55 transition-colors hover:text-paper"
        >
          Выбрать стол на плане
        </a>
      </div>
    </section>
  );
}
