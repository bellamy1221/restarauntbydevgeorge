"use client";

import { Reveal } from "@/components/motion/Reveal";
import { copy } from "@/content/copy";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

const gallery = [
  {
    src: "/images/interior/room.jpg",
    alt: "Основной зал вечером",
    label: "Зал",
    span: "md:col-span-8 md:row-span-2",
  },
  {
    src: "/images/interior/table.jpg",
    alt: "Детали сервировки",
    label: "Стол",
    span: "md:col-span-4",
  },
  {
    src: "/images/interior/bar.jpg",
    alt: "Бар",
    label: "Бар",
    span: "md:col-span-4",
  },
  {
    src: "/images/interior/kitchen.jpg",
    alt: "Открытая кухня",
    label: "Кухня",
    span: "md:col-span-5",
  },
  {
    src: "/images/interior/private.jpg",
    alt: "Приватная зона",
    label: "Private",
    span: "md:col-span-7",
  },
];

export function Atmosphere() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollTo = (index: number) => {
    const el = track.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    child?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    setActive(index);
  };

  return (
    <section
      id="atmosphere"
      className="section-pad bg-ink text-paper"
      aria-labelledby="atmosphere-title"
    >
      <div className="container-wide">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-metal">
            Атмосфера
          </p>
          <h2
            id="atmosphere-title"
            className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
          >
            {copy.atmosphere.title}
          </h2>
          <p className="mt-5 max-w-lg text-base text-paper/65">
            {copy.atmosphere.lead}
          </p>
        </Reveal>

        {/* Desktop editorial mosaic */}
        <div className="mt-14 hidden auto-rows-[16rem] gap-3 md:grid md:grid-cols-12">
          {gallery.map((item, i) => (
            <Reveal
              key={item.src}
              className={cn("relative overflow-hidden", item.span)}
              delay={i * 0.04}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 1024px) 50vw, 40vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
              />
              <span className="absolute bottom-4 left-4 text-[0.65rem] uppercase tracking-[0.16em] text-paper/90">
                {item.label}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Mobile horizontal gallery */}
        <div className="mt-10 md:hidden">
          <div
            ref={track}
            className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4"
            onScroll={() => {
              const el = track.current;
              if (!el) return;
              const i = Math.round(el.scrollLeft / (el.clientWidth * 0.85));
              setActive(Math.min(i, gallery.length - 1));
            }}
          >
            {gallery.map((item) => (
              <figure
                key={item.src}
                className="relative aspect-[4/5] w-[85%] shrink-0 snap-center overflow-hidden"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="85vw"
                  className="object-cover"
                />
                <figcaption className="absolute bottom-4 left-4 text-[0.65rem] uppercase tracking-[0.16em]">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Галерея">
            {gallery.map((item, i) => (
              <button
                key={item.src}
                type="button"
                aria-label={`Показать: ${item.label}`}
                aria-current={active === i}
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all",
                  active === i ? "w-6 bg-paper" : "bg-paper/35",
                )}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
