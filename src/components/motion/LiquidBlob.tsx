"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

type LiquidBlobProps = {
  className?: string;
  variant?: "warm" | "wine" | "olive";
};

const paths = {
  warm: [
    "M420,120C520,80,620,140,680,220C740,300,720,420,640,480C560,540,420,560,320,500C220,440,160,320,180,220C200,120,320,160,420,120Z",
    "M400,100C510,60,640,120,700,210C760,300,740,430,650,500C560,570,400,560,300,490C200,420,140,300,170,200C200,100,290,140,400,100Z",
    "M430,140C530,100,610,160,670,240C730,320,710,400,630,470C550,540,410,550,310,480C210,410,170,310,190,220C210,130,330,180,430,140Z",
  ],
  wine: [
    "M380,160C480,100,600,130,660,220C720,310,700,430,600,490C500,550,360,540,280,460C200,380,180,260,220,180C260,100,280,220,380,160Z",
    "M400,140C520,90,620,150,680,240C740,330,700,450,600,510C500,570,340,540,260,450C180,360,170,240,220,170C270,100,280,190,400,140Z",
    "M360,180C470,120,590,140,650,230C710,320,690,420,590,480C490,540,350,530,270,450C190,370,190,260,230,190C270,120,250,240,360,180Z",
  ],
  olive: [
    "M440,200C540,160,620,200,670,280C720,360,700,460,610,510C520,560,400,540,320,470C240,400,220,300,260,230C300,160,340,240,440,200Z",
    "M420,180C530,140,640,190,690,280C740,370,710,480,610,530C510,580,380,550,300,470C220,390,210,280,260,210C310,140,310,220,420,180Z",
    "M450,220C550,180,630,220,680,300C730,380,700,470,600,520C500,570,390,550,310,480C230,410,230,310,270,240C310,170,350,260,450,220Z",
  ],
};

const fills = {
  warm: "url(#blob-warm)",
  wine: "url(#blob-wine)",
  olive: "url(#blob-olive)",
};

export function LiquidBlob({ className, variant = "warm" }: LiquidBlobProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced || !pathRef.current) return;

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      const series = paths[variant];
      series.forEach((d, i) => {
        if (i === 0) return;
        tl.to(pathRef.current, {
          attr: { d },
          duration: 4.5,
          ease: "sine.inOut",
        });
      });
    },
    { dependencies: [variant] },
  );

  return (
    <svg
      viewBox="0 0 800 640"
      className={cn("pointer-events-none absolute overflow-visible", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="blob-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9a6a4e" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#6a3030" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id="blob-wine" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#6a3030" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#1c1612" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="blob-olive" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a6848" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#9a6a4e" stopOpacity="0.18" />
        </linearGradient>
        <filter id="blob-blur">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <path
        ref={pathRef}
        d={paths[variant][0]}
        fill={fills[variant]}
        filter="url(#blob-blur)"
      />
    </svg>
  );
}
