import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy";
import { restaurant } from "@/content/restaurant";
import { reserveCta } from "@/content/navigation";
import Image from "next/image";

export function FinalCTA() {
  return (
    <section
      className="relative min-h-[70svh] overflow-hidden bg-ink text-paper"
      aria-labelledby="final-title"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/atmosphere/cafe.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-50"
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
      </div>

      <div className="relative flex min-h-[70svh] items-end section-pad">
        <div className="container-wide pb-8">
          <Reveal>
            <h2
              id="final-title"
              className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] tracking-tight"
            >
              {copy.final.title}
            </h2>
            <p className="mt-5 max-w-md text-base text-paper/70">
              {copy.final.lead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={reserveCta.href} variant="on-dark">
                {reserveCta.label}
              </Button>
              <a
                href={restaurant.contacts.phoneHref}
                className="link-underline text-sm text-paper/80"
              >
                {restaurant.contacts.phone}
              </a>
              <a
                href={restaurant.contacts.emailHref}
                className="link-underline text-sm text-paper/80"
              >
                {restaurant.contacts.email}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
