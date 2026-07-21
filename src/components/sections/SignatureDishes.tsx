"use client";

import { TextReveal } from "@/components/motion/TextReveal";
import { copy } from "@/content/copy";
import { featuredDishes, formatPrice } from "@/content/menu";
import { restaurant } from "@/content/restaurant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SignatureDishes() {
  const root = useRef<HTMLElement>(null);
  const dishes = featuredDishes.slice(0, 4);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (reduced) return;

        const panels = gsap.utils.toArray<HTMLElement>("[data-dish-panel]");
        const images = gsap.utils.toArray<HTMLElement>("[data-dish-visual]");

        gsap.set(panels.slice(1), { autoAlpha: 0, y: 40 });
        gsap.set(images.slice(1), { autoAlpha: 0, scale: 1.08 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${panels.length * 90}%`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        panels.forEach((_, i) => {
          if (i === 0) return;
          const step = i;
          tl.to(
            panels[step - 1],
            { autoAlpha: 0, y: -30, duration: 0.45 },
            step,
          )
            .to(
              images[step - 1],
              { autoAlpha: 0, scale: 0.96, duration: 0.45 },
              step,
            )
            .fromTo(
              panels[step],
              { autoAlpha: 0, y: 50 },
              { autoAlpha: 1, y: 0, duration: 0.55 },
              step + 0.05,
            )
            .fromTo(
              images[step],
              { autoAlpha: 0, scale: 1.1 },
              { autoAlpha: 1, scale: 1, duration: 0.65 },
              step + 0.05,
            );
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-ink text-paper"
      aria-labelledby="signature-title"
    >
      <div className="section-pad relative">
        <div className="container-wide">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-metal">
            Signature
          </p>
          <TextReveal
            as="h2"
            text={copy.signature.title}
            className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em]"
          />
          <p className="mt-5 max-w-xl text-base text-paper/65">
            {copy.signature.lead}
          </p>

          {/* Desktop pinned experience */}
          <div className="relative mt-14 hidden min-h-[70vh] lg:grid lg:grid-cols-12 lg:gap-10">
            <div className="relative col-span-7 overflow-hidden rounded-[2rem]">
              {dishes.map((dish, i) => (
                <div
                  key={dish.id}
                  data-dish-visual
                  className="absolute inset-0 overflow-hidden"
                  style={{ zIndex: dishes.length - i }}
                >
                  {dish.image && (
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="55vw"
                      className="object-cover brightness-[0.9] contrast-[1.05]"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />
                </div>
              ))}
            </div>

            <div className="relative col-span-5 flex items-center">
              {dishes.map((dish, i) => (
                <article
                  key={dish.id}
                  data-dish-panel
                  className="absolute inset-x-0"
                  style={{ zIndex: dishes.length - i }}
                >
                  <p className="font-mono text-xs text-metal">
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(dishes.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] xl:text-5xl">
                    {dish.name}
                  </h3>
                  <p className="mt-4 max-w-sm text-[0.95rem] font-medium leading-relaxed text-paper/70">
                    {dish.sensory ?? dish.description}
                  </p>
                  <p className="mt-6 font-mono text-sm text-metal">
                    {formatPrice(dish.price, restaurant.currency)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          {/* Mobile stacked */}
          <div className="mt-12 space-y-14 lg:hidden">
            {dishes.map((dish, i) => (
              <article key={dish.id}>
                {dish.image && (
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="mt-4 font-mono text-xs text-metal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-[-0.02em]">
                  {dish.name}
                </h3>
                <p className="mt-3 text-[0.95rem] font-medium text-paper/70">
                  {dish.sensory ?? dish.description}
                </p>
                <p className="mt-4 font-mono text-sm text-metal">
                  {formatPrice(dish.price, restaurant.currency)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
