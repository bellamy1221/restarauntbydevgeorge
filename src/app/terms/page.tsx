import type { Metadata } from "next";
import Link from "next/link";
import { restaurant } from "@/content/restaurant";

export const metadata: Metadata = {
  title: "Условия использования",
  description:
    "Условия использования демо-сайта VINCENZO — концептуальный портфолио-проект.",
};

export default function TermsPage() {
  return (
    <article className="section-pad container-wide max-w-3xl pt-32">
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
        Правовая информация
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-ink">
        Условия использования
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/65">
        <p>
          Материалы сайта {restaurant.name} созданы как визуальный и UX-концепт
          для портфолио. Контакты, адрес, меню и бронь — вымышленные демо-данные.
        </p>
        <p>
          Отправка формы не создаёт юридически значимой брони и не обязывает
          стороны к оказанию услуг. Любые совпадения с реальными заведениями
          случайны.
        </p>
        <p>{restaurant.portfolioNote}</p>
      </div>
      <p className="mt-8">
        <Link href="/" className="link-underline text-sm">
          На главную
        </Link>
      </p>
    </article>
  );
}
