import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy";
import { restaurant } from "@/content/restaurant";
import Image from "next/image";

export function Events() {
  return (
    <section
      id="events"
      className="relative overflow-hidden bg-burgundy-deep text-paper"
      aria-labelledby="events-title"
    >
      <div className="absolute inset-0 opacity-30">
        <Image
          src="/images/interior/private.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </div>
      <div className="absolute inset-0 bg-burgundy-deep/85" />

      <div className="relative section-pad">
        <div className="container-wide grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-paper/55">
              Private
            </p>
            <h2
              id="events-title"
              className="mt-4 font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em]"
            >
              {copy.events.title}
            </h2>
            <p className="mt-5 max-w-md text-base text-paper/70">
              {copy.events.lead}
            </p>
            <p className="mt-4 text-sm text-paper/50">
              {restaurant.privateEvents.capacityNote}{" "}
              {restaurant.privateEvents.minGuestsPlaceholder},{" "}
              {restaurant.privateEvents.maxGuestsPlaceholder}.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5 lg:col-start-8" delay={0.08}>
            <ul className="space-y-4">
              {copy.events.items.map((item) => (
                <li
                  key={item}
                  className="border-b border-paper/15 pb-4 font-display text-xl tracking-wide"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Button href="#reservation" variant="on-dark">
                {copy.events.cta}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
