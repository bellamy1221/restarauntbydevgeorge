import { Reveal } from "@/components/motion/Reveal";
import { copy } from "@/content/copy";
import Image from "next/image";

export function Chef() {
  return (
    <section
      className="section-pad bg-paper-deep"
      aria-labelledby="chef-title"
    >
      <div className="container-wide grid items-center gap-12 lg:grid-cols-12">
        <Reveal className="order-2 lg:order-1 lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image
              src="/images/chef/hands.jpg"
              alt="Работа на кухне — руки шефа"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2 lg:col-span-5 lg:col-start-8" delay={0.08}>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            Кухня
          </p>
          <h2
            id="chef-title"
            className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-ink"
          >
            {copy.chef.title}
          </h2>
          <p className="mt-6 font-display text-2xl text-burgundy">
            {copy.chef.name}
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone">
            {copy.chef.role}
          </p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-soft/85">
            {copy.chef.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
