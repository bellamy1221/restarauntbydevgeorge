import { Reveal } from "@/components/motion/Reveal";
import { copy } from "@/content/copy";
import Image from "next/image";

export function Wine() {
  return (
    <section
      id="wine"
      className="section-pad bg-paper"
      aria-labelledby="wine-title"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4]">
            <Image
              src="/images/wine/pour.jpg"
              alt="Наливание вина"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            Vini & Bar
          </p>
          <h2
            id="wine-title"
            className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-ink"
          >
            {copy.wine.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            {copy.wine.lead}
          </p>

          <ul className="mt-10 space-y-8">
            {copy.wine.points.map((point) => (
              <li key={point.title} className="border-t border-ink/10 pt-6">
                <h3 className="font-display text-xl tracking-wide text-ink">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/55">
                  {point.text}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
