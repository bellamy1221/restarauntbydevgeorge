import type { Metadata } from "next";
import Link from "next/link";
import { restaurant } from "@/content/restaurant";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Политика конфиденциальности демо-сайта VINCENZO — концептуальный портфолио-проект.",
};

export default function PrivacyPage() {
  return (
    <article className="section-pad container-wide max-w-3xl pt-32">
      <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
        Правовая информация
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-ink">
        Политика конфиденциальности
      </h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-ink/65">
        <p>
          Этот сайт — концептуальный портфолио-проект демо-бренда{" "}
          {restaurant.name}. Он не принадлежит действующему ресторану и не
          обрабатывает персональные данные в коммерческих целях.
        </p>
        <p>
          Если вы отправляете заявку через форму бронирования, указанные
          контактные данные могут быть переданы в Telegram-чат владельца
          демо-проекта исключительно для демонстрации интеграции. Не указывайте
          чувствительную информацию.
        </p>
        <p>
          Вопросы по проекту:{" "}
          <a
            href={restaurant.contacts.emailHref}
            className="link-underline text-ink"
          >
            {restaurant.contacts.email}
          </a>
          .
        </p>
      </div>
      <p className="mt-8">
        <Link href="/" className="link-underline text-sm">
          На главную
        </Link>
      </p>
    </article>
  );
}
