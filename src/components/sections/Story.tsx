"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { LiquidBlob } from "@/components/motion/LiquidBlob";
import { copy } from "@/content/copy";
import Image from "next/image";

export function Story() {
  return (
    <section
      id="about"
      className="section-pad relative overflow-hidden bg-paper"
      aria-labelledby="story-title"
    >
      <LiquidBlob
        variant="warm"
        className="right-[-18%] top-[-20%] h-[55%] w-[55%] opacity-60"
      />

      <div className="container-wide relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            О ресторане
          </p>
          <TextReveal
            as="h2"
            text={copy.story.title}
            className="mt-4 max-w-md font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-ink"
          />
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft/85 md:text-lg">
            {copy.story.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative lg:col-span-7" delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4] lg:ml-8">
            <Image
              src="/images/interior/private.jpg"
              alt="Вечерняя атмосфера ресторана"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover brightness-[0.9] contrast-[1.05] transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-ink/25 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 left-0 hidden w-48 overflow-hidden border border-paper shadow-[0_20px_60px_rgba(28,22,18,0.2)] md:block lg:-left-4 lg:w-56">
            <div className="relative aspect-[3/4]">
              <Image
                src="/images/atmosphere/olive.jpg"
                alt="Оливковое масло"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
