import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Условия использования",
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
      <p className="mt-6 text-sm leading-relaxed text-ink/65">
        Placeholder-страница. Добавьте юридические условия сайта и бронирования
        перед запуском.
      </p>
      <p className="mt-8">
        <Link href="/" className="link-underline text-sm">
          На главную
        </Link>
      </p>
    </article>
  );
}
