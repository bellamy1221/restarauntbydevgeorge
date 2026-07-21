"use client";

import { Reveal } from "@/components/motion/Reveal";
import {
  dietaryLabels,
  formatPrice,
  menuCategories,
  type MenuCategory,
} from "@/content/menu";
import { restaurant } from "@/content/restaurant";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function MenuSection() {
  const [active, setActive] = useState(menuCategories[0]?.id ?? "antipasti");
  const category =
    menuCategories.find((c) => c.id === active) ?? menuCategories[0];

  return (
    <section
      id="menu"
      className="section-pad bg-paper"
      aria-labelledby="menu-title"
    >
      <div className="container-wide">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            Меню
          </p>
          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2
              id="menu-title"
              className="max-w-xl font-display text-[clamp(2.25rem,5vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.02em] text-ink"
            >
              Карта вечера
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-ink/60">
              Сезонная карта. Состав и доступность позиций могут меняться.
              Актуальные детали уточняйте у команды зала.
            </p>
          </div>
        </Reveal>

        <div className="mt-12">
          <div
            role="tablist"
            aria-label="Категории меню"
            className="-mx-[var(--gutter)] flex gap-1 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:flex-wrap md:px-0"
          >
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={active === cat.id}
                id={`tab-${cat.id}`}
                aria-controls={`panel-${cat.id}`}
                className={cn(
                  "shrink-0 rounded-full px-4 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-colors duration-300",
                  active === cat.id
                    ? "bg-ink text-paper"
                    : "bg-transparent text-ink/55 hover:text-ink",
                )}
                onClick={() => setActive(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {category && <MenuPanel category={category} />}
        </div>
      </div>
    </section>
  );
}

function MenuPanel({ category }: { category: MenuCategory }) {
  return (
    <div
      role="tabpanel"
      id={`panel-${category.id}`}
      aria-labelledby={`tab-${category.id}`}
      className="mt-10"
    >
      {category.description && (
        <p className="mb-8 max-w-lg text-sm text-ink/55">
          {category.description}
        </p>
      )}
      <ul className="divide-y divide-ink/10">
        {category.items.map((item) => (
          <li
            key={item.id}
            className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-6 first:pt-0"
          >
            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display text-xl font-semibold tracking-[-0.01em] text-ink md:text-2xl">
                  {item.name}
                </h3>
                {item.seasonal && (
                  <span className="text-[0.65rem] uppercase tracking-[0.14em] text-olive">
                    Сезон
                  </span>
                )}
              </div>
              <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-ink/65">
                {item.description}
              </p>
              {item.dietary && item.dietary.length > 0 && (
                <p className="mt-2 text-[0.7rem] tracking-wide text-stone">
                  {item.dietary.map((d) => dietaryLabels[d]).join(" · ")}
                </p>
              )}
            </div>
            <p className="font-mono text-sm font-medium text-ink/80">
              {formatPrice(item.price, restaurant.currency)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
