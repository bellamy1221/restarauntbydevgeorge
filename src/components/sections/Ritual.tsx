"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Aperitivo",
    text: "Тихий старт. Бокал, лёгкий разговор, настройка на вечер.",
  },
  {
    n: "02",
    title: "Antipasti & Crudo",
    text: "Свежесть и точность. Первые текстуры без спешки.",
  },
  {
    n: "03",
    title: "Pasta",
    text: "Сердце ужина. Температура, плотность, чистый вкус.",
  },
  {
    n: "04",
    title: "Secondo",
    text: "Глубже и спокойнее. Мясо, рыба или овощи сезона.",
  },
  {
    n: "05",
    title: "Dolce & Digestivo",
    text: "Мягкое завершение. Кофе, amaro, ещё немного тишины.",
  },
];

export function Ritual() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) return;

      gsap.from("[data-ritual-step]", {
        opacity: 0.15,
        y: 40,
        stagger: 0.12,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root.current,
          start: "top 70%",
        },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="section-pad relative overflow-hidden bg-ink text-paper"
      aria-labelledby="ritual-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(154,106,78,0.18),transparent_55%)]" />
      <div className="container-wide relative">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-metal">
            Ритм вечера
          </p>
          <TextReveal
            as="h2"
            text="Ужин как последовательность, а не спектакль"
            className="mt-4 max-w-3xl font-display text-[clamp(2.1rem,4.8vw,3.6rem)] leading-[1.08] tracking-tight"
          />
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-paper/60 md:text-base">
            Не меню ради меню — спокойный сценарий вечера. Можно пройти целиком
            или остановиться там, где хочется.
          </p>
        </Reveal>

        <ol className="mt-16 grid gap-4 md:grid-cols-5 md:gap-3">
          {steps.map((step) => (
            <li
              key={step.n}
              data-ritual-step
              className="group rounded-[1.5rem] border border-paper/10 bg-paper/[0.04] p-5 transition-colors duration-500 hover:border-paper/25 hover:bg-paper/[0.07] md:min-h-[18rem] md:p-6"
            >
              <p className="font-mono text-[0.7rem] text-metal">{step.n}</p>
              <h3 className="mt-6 font-display text-2xl tracking-wide md:text-[1.65rem]">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-paper/55">
                {step.text}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
