"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { copy } from "@/content/copy";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const gallery = [
  {
    src: "/images/interior/room.jpg",
    alt: "Основной зал вечером",
    label: "Зал",
  },
  {
    src: "/images/interior/table.jpg",
    alt: "Детали сервировки",
    label: "Стол",
  },
  {
    src: "/images/interior/bar.jpg",
    alt: "Бар",
    label: "Бар",
  },
  {
    src: "/images/interior/kitchen.jpg",
    alt: "Кухня и свет рабочего пространства",
    label: "Кухня",
  },
  {
    src: "/images/atmosphere/cafe.jpg",
    alt: "Камерная атмосфера зала",
    label: "Свет",
  },
  {
    src: "/images/interior/private.jpg",
    alt: "Приватная зона",
    label: "Private",
  },
];

/** Doubled for seamless CSS conveyor */
const belt = [...gallery, ...gallery];

export function Atmosphere() {
  const mobileTrack = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (index: number) => {
    const el = mobileTrack.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
    setActive(index);
  };

  return (
    <section
      id="atmosphere"
      className="relative overflow-x-clip bg-ink text-paper"
      aria-labelledby="atmosphere-title"
    >
      <div className="px-[var(--gutter)] pb-6 pt-[clamp(3.5rem,8vw,6.5rem)]">
        <div className="container-wide">
          <Reveal>
            <p className="text-[0.65rem] uppercase tracking-[0.18em] text-metal">
              Атмосфера
            </p>
            <TextReveal
              as="h2"
              id="atmosphere-title"
              text={copy.atmosphere.title}
              className="mt-3 max-w-xl font-display text-[clamp(1.75rem,3.8vw,2.75rem)] leading-[1.12] tracking-[-0.02em]"
            />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-paper/65">
              {copy.atmosphere.lead}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Desktop conveyor — no pin, continuous belt */}
      <div className="relative hidden pb-12 lg:block" aria-hidden>
        <div className="overflow-hidden">
          <div className="animate-atmosphere-belt flex w-max gap-4 pl-[var(--gutter)] will-change-transform">
            {belt.map((item, i) => (
              <figure
                key={`${item.src}-${i}`}
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-[1.35rem]",
                  i % 3 === 0
                    ? "h-[22rem] w-[28rem]"
                    : i % 3 === 1
                      ? "mt-8 h-[18rem] w-[22rem]"
                      : "mt-4 h-[20rem] w-[24rem]",
                )}
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  sizes="28rem"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-4 left-4 text-[0.65rem] uppercase tracking-[0.16em] text-paper/90">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p className="sr-only">
          Галерея атмосферы: зал, стол, бар, кухня, свет, private.
        </p>
      </div>

      {/* Mobile / tablet snap gallery */}
      <div className="lg:hidden">
        <div
          ref={mobileTrack}
          className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-3"
          onScroll={(e) => {
            const el = e.currentTarget;
            const i = Math.round(el.scrollLeft / (el.clientWidth * 0.78));
            setActive(Math.min(i, gallery.length - 1));
          }}
        >
          {gallery.map((item) => (
            <figure
              key={item.src}
              className="relative aspect-[4/5] w-[78%] max-w-[20rem] shrink-0 snap-center overflow-hidden rounded-[1.25rem]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="78vw"
                className="object-cover"
              />
              <figcaption className="absolute bottom-3 left-3 text-[0.65rem] uppercase tracking-[0.16em]">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
        <div
          className="mt-3 flex justify-center gap-2 pb-10"
          role="tablist"
          aria-label="Галерея"
        >
          {gallery.map((item, i) => (
            <button
              key={item.src}
              type="button"
              aria-label={`Показать: ${item.label}`}
              aria-current={active === i}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)]",
                active === i ? "w-6 bg-paper" : "bg-paper/35",
              )}
              onClick={() => scrollTo(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
