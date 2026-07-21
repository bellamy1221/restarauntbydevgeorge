"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { copy } from "@/content/copy";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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

export function Atmosphere() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const mobileTrack = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (reduced || !track.current || !root.current) return;
        const amount = track.current.scrollWidth - window.innerWidth;
        gsap.to(track.current, {
          x: () => -Math.max(amount, 0),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${Math.max(amount, window.innerHeight)}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

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
      ref={root}
      id="atmosphere"
      className="relative overflow-hidden bg-ink text-paper"
      aria-labelledby="atmosphere-title"
    >
      <div className="section-pad pb-8 lg:pb-0">
        <div className="container-wide">
          <Reveal>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-metal">
              Атмосфера
            </p>
            <TextReveal
              as="h2"
              text={copy.atmosphere.title}
              className="mt-4 max-w-2xl font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight"
            />
            <p className="mt-5 max-w-lg text-base text-paper/65">
              {copy.atmosphere.lead}
            </p>
          </Reveal>
        </div>
      </div>

      {/* Desktop horizontal gallery */}
      <div className="hidden lg:block">
        <div
          ref={track}
          className="flex w-max gap-5 px-[var(--gutter)] pb-16 will-change-transform"
        >
          {gallery.map((item, i) => (
            <figure
              key={item.src}
              className={cn(
                "relative overflow-hidden",
                i % 3 === 0
                  ? "h-[70vh] w-[42vw]"
                  : i % 3 === 1
                    ? "mt-16 h-[58vh] w-[32vw]"
                    : "mt-8 h-[64vh] w-[36vw]",
              )}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="45vw"
                className="object-cover transition-transform duration-700 ease-out hover:scale-[1.04]"
              />
              <figcaption className="absolute bottom-5 left-5 text-[0.7rem] uppercase tracking-[0.18em] text-paper/90">
                {item.label}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Mobile snap gallery */}
      <div className="lg:hidden">
        <div
          ref={mobileTrack}
          className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[var(--gutter)] pb-4"
          onScroll={(e) => {
            const el = e.currentTarget;
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
        <div
          className="mt-4 flex justify-center gap-2 pb-10"
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
                "h-1.5 w-1.5 rounded-full transition-all",
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
