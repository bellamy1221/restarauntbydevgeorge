import { Reveal } from "@/components/motion/Reveal";
import { copy } from "@/content/copy";
import Image from "next/image";

export function Story() {
  return (
    <section
      id="about"
      className="section-pad relative overflow-hidden bg-paper"
      aria-labelledby="story-title"
    >
      <div className="container-wide grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            О ресторане
          </p>
          <h2
            id="story-title"
            className="mt-4 max-w-md font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-tight text-ink"
          >
            {copy.story.title}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft/85 md:text-lg">
            {copy.story.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>

        <Reveal className="relative lg:col-span-7" delay={0.1}>
          <div className="relative aspect-[4/5] overflow-hidden md:aspect-[5/4] lg:ml-8">
            <Image
              src="/images/atmosphere/ingredients.jpg"
              alt="Свежие ингредиенты на столе"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
            />
          </div>
          <div className="absolute -bottom-6 left-0 hidden w-48 overflow-hidden border border-paper shadow-xl md:block lg:-left-4 lg:w-56">
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
