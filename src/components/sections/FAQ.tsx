"use client";

import { Reveal } from "@/components/motion/Reveal";
import { faqItems } from "@/content/faq";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section className="section-pad bg-paper-deep" aria-labelledby="faq-title">
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            Вопросы
          </p>
          <h2
            id="faq-title"
            className="mt-4 font-display text-[clamp(2.25rem,5vw,3.25rem)] leading-[1.05] tracking-tight text-ink"
          >
            Коротко о важном
          </h2>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.05}>
          <ul className="divide-y divide-ink/10 border-y border-ink/10">
            {faqItems.map((item) => {
              const open = openId === item.id;
              return (
                <li key={item.id}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-${item.id}`}
                      id={`faq-btn-${item.id}`}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left"
                      onClick={() =>
                        setOpenId((id) => (id === item.id ? null : item.id))
                      }
                    >
                      <span className="font-display text-lg tracking-wide text-ink md:text-xl">
                        {item.question}
                      </span>
                      <span
                        aria-hidden
                        className={cn(
                          "mt-1 shrink-0 text-stone transition-transform duration-300",
                          open && "rotate-45",
                        )}
                      >
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`faq-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    hidden={!open}
                    className={cn(!open && "hidden")}
                  >
                    <p className="pb-5 pr-10 text-sm leading-relaxed text-ink/60">
                      {item.answer}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
