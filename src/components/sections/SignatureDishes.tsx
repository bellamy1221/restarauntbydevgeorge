"use client";

import { TextReveal } from "@/components/motion/TextReveal";
import { copy } from "@/content/copy";
import { featuredDishes, formatPrice } from "@/content/menu";
import { restaurant } from "@/content/restaurant";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function SignatureDishes() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const dishes = featuredDishes.slice(0, 4);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (reduced || !pinRef.current) return;

        const panels = gsap.utils.toArray<HTMLElement>("[data-dish-panel]");
        const images = gsap.utils.toArray<HTMLElement>("[data-dish-visual]");
        if (!panels.length) return;

        gsap.set(panels.slice(1), { autoAlpha: 0, y: 24 });
        gsap.set(images.slice(1), { autoAlpha: 0, scale: 1.06 });
        gsap.set([panels[0], images[0]], { autoAlpha: 1, y: 0, scale: 1 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: pinRef.current,
            start: "top top+=72",
            end: () => `+=${Math.round(window.innerHeight * panels.length * 0.7)}`,
            pin: true,
            scrub: 0.45,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinSpacing: true,
            fastScrollEnd: true,
            onUpdate: (self) => {
              const idx = Math.min(
                panels.length - 1,
                Math.round(self.progress * (panels.length - 1)),
              );
              setActive(idx);
            },
          },
        });

        panels.forEach((_, i) => {
          if (i === 0) return;
          const at = i;
          tl.to(panels[i - 1], { autoAlpha: 0, y: -20, duration: 0.4 }, at)
            .to(images[i - 1], { autoAlpha: 0, scale: 0.97, duration: 0.4 }, at)
            .fromTo(
              panels[i],
              { autoAlpha: 0, y: 28 },
              { autoAlpha: 1, y: 0, duration: 0.45 },
              at + 0.05,
            )
            .fromTo(
              images[i],
              { autoAlpha: 0, scale: 1.08 },
              { autoAlpha: 1, scale: 1, duration: 0.5 },
              at + 0.05,
            );
        });

        // Ensure pin metrics after images settle
        const refresh = () => ScrollTrigger.refresh();
        const imgs = pinRef.current.querySelectorAll("img");
        imgs.forEach((img) => {
          if (!img.complete) img.addEventListener("load", refresh, { once: true });
        });
        requestAnimationFrame(refresh);
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  const goTo = (index: number) => {
    setActive(index);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (window.matchMedia("(min-width: 1024px)").matches && !reduced) {
      const st = ScrollTrigger.getAll().find(
        (t) => t.trigger === pinRef.current,
      );
      if (st) {
        const progress = index / Math.max(dishes.length - 1, 1);
        const y = st.start + (st.end - st.start) * progress;
        window.scrollTo({ top: y, behavior: "smooth" });
        return;
      }
    }
    // Mobile / reduced: crossfade via state-driven classes below
  };

  return (
    <section
      ref={root}
      className="relative bg-ink text-paper"
      aria-labelledby="signature-title"
    >
      <div className="relative overflow-x-clip px-[var(--gutter)] pb-12 pt-[clamp(3.5rem,8vw,6.5rem)] lg:pb-16">
        <div className="container-wide">
          <p className="text-[0.65rem] uppercase tracking-[0.18em] text-metal">
            Signature
          </p>
          <TextReveal
            as="h2"
            id="signature-title"
            text={copy.signature.title}
            className="mt-3 max-w-2xl font-display text-[clamp(1.75rem,3.8vw,2.75rem)] font-semibold leading-[1.12] tracking-[-0.02em]"
          />
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-paper/65">
            {copy.signature.lead}
          </p>

          {/* Desktop pinned showcase — compact, no dead space */}
          <div ref={pinRef} className="mt-8 hidden lg:block">
            <div className="grid grid-cols-12 items-stretch gap-8">
              <div className="relative col-span-7 aspect-[5/4] overflow-hidden rounded-[1.5rem]">
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
                        className="object-cover brightness-[0.92] contrast-[1.04]"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/65 via-transparent to-ink/15" />
                  </div>
                ))}
              </div>

              <div className="relative col-span-5 flex min-h-[18rem] flex-col justify-center">
                {dishes.map((dish, i) => (
                  <article
                    key={dish.id}
                    data-dish-panel
                    className="absolute inset-x-0 top-1/2 -translate-y-1/2"
                    style={{ zIndex: dishes.length - i }}
                    aria-hidden={active !== i}
                  >
                    <p className="font-mono text-[0.7rem] text-metal">
                      {String(i + 1).padStart(2, "0")} /{" "}
                      {String(dishes.length).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 font-display text-[clamp(1.6rem,2.4vw,2.35rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
                      {dish.name}
                    </h3>
                    <p className="mt-3 max-w-sm text-sm font-medium leading-relaxed text-paper/70">
                      {dish.sensory ?? dish.description}
                    </p>
                    <p className="mt-4 font-mono text-sm text-metal">
                      {formatPrice(dish.price, restaurant.currency)}
                    </p>
                  </article>
                ))}

                <div
                  className="absolute bottom-0 left-0 flex gap-2"
                  role="tablist"
                  aria-label="Signature-блюда"
                >
                  {dishes.map((dish, i) => (
                    <button
                      key={dish.id}
                      type="button"
                      role="tab"
                      aria-selected={active === i}
                      aria-label={`Блюдо ${i + 1}: ${dish.name}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]",
                        active === i ? "w-8 bg-paper" : "w-1.5 bg-paper/35 hover:bg-paper/55",
                      )}
                      onClick={() => goTo(i)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile / tablet — compact stack */}
          <div className="mt-8 space-y-10 lg:hidden">
            {dishes.map((dish, i) => (
              <article key={dish.id}>
                {dish.image && (
                  <div className="relative aspect-[5/4] overflow-hidden rounded-[1.35rem]">
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <p className="mt-3 font-mono text-[0.7rem] text-metal">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 font-display text-[1.65rem] font-semibold leading-snug tracking-[-0.02em]">
                  {dish.name}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-paper/70">
                  {dish.sensory ?? dish.description}
                </p>
                <p className="mt-3 font-mono text-sm text-metal">
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
