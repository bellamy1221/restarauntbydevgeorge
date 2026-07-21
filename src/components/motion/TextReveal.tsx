"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  id?: string;
};

export function TextReveal({
  text,
  className,
  as: Tag = "h2",
  id,
}: TextRevealProps) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const words = el.querySelectorAll("[data-word]");
      if (reduced) {
        gsap.set(words, { y: 0, opacity: 1 });
        return;
      }
      gsap.fromTo(
        words,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.045,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        },
      );
    },
    { scope: root, dependencies: [text] },
  );

  const parts = text.split(" ");

  return (
    <Tag ref={root as never} id={id} className={cn(className)}>
      {parts.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden pb-[0.12em] align-bottom"
        >
          <span data-word className="inline-block will-change-transform">
            {word}
            {i < parts.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
