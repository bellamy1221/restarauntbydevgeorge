"use client";

import { Reveal } from "@/components/motion/Reveal";
import { copy } from "@/content/copy";
import { featuredDishes, formatPrice } from "@/content/menu";
import { restaurant } from "@/content/restaurant";
import Image from "next/image";
import { cn } from "@/lib/utils";

const layouts = [
  "md:col-span-7",
  "md:col-span-5 md:mt-24",
  "md:col-span-5",
  "md:col-span-7 md:-mt-16",
];

export function SignatureDishes() {
  const dishes = featuredDishes.slice(0, 4);

  return (
    <section
      className="section-pad bg-ink text-paper"
      aria-labelledby="signature-title"
    >
      <div className="container-wide">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-metal">
            Signature
          </p>
          <h2
            id="signature-title"
            className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
          >
            {copy.signature.title}
          </h2>
          <p className="mt-5 max-w-xl text-base text-paper/65">
            {copy.signature.lead}
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 md:grid-cols-12 md:gap-8">
          {dishes.map((dish, i) => (
            <Reveal
              key={dish.id}
              className={cn(layouts[i] ?? "md:col-span-6")}
              delay={i * 0.05}
            >
              <article className="group">
                {dish.image && (
                  <div
                    className={cn(
                      "relative overflow-hidden",
                      i % 2 === 0 ? "aspect-[4/5]" : "aspect-[5/4]",
                    )}
                  >
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover brightness-[0.92] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-80" />
                  </div>
                )}
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl tracking-wide md:text-3xl">
                      {dish.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-paper/60">
                      {dish.sensory ?? dish.description}
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-sm text-metal">
                    {formatPrice(dish.price, restaurant.currency)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
