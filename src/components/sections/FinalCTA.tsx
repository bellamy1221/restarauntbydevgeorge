"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy";
import { restaurant } from "@/content/restaurant";
import { reserveCta } from "@/content/navigation";
import Image from "next/image";
import { LiquidBlob } from "@/components/motion/LiquidBlob";

export function FinalCTA() {
  return (
    <section
      className="relative min-h-[80svh] overflow-hidden bg-ink text-paper"
      aria-labelledby="final-title"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/atmosphere/cafe.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/35" />
      </div>
      <LiquidBlob
        variant="wine"
        className="bottom-[-20%] left-[-10%] h-[70%] w-[70%] opacity-50"
      />

      <div className="relative flex min-h-[80svh] items-end section-pad">
        <div className="container-wide pb-8">
          <Reveal>
            <TextReveal
              as="h2"
              text={copy.final.title}
              className="max-w-3xl font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[1.02] tracking-tight"
            />
            <p className="mt-5 max-w-md text-base text-paper/70">
              {copy.final.lead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button href={reserveCta.href} variant="on-dark">
                  {reserveCta.label}
                </Button>
              </Magnetic>
              <a
                href={restaurant.contacts.phoneHref}
                className="link-underline text-sm text-paper/80"
              >
                {restaurant.contacts.phone}
              </a>
              <a
                href="#reservation"
                className="link-underline text-sm text-paper/80"
              >
                Выбрать стол на плане
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
