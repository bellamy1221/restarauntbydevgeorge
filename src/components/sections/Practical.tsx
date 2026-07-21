import { Reveal } from "@/components/motion/Reveal";
import { copy } from "@/content/copy";
import { restaurant } from "@/content/restaurant";

export function Practical() {
  return (
    <section
      id="contacts"
      className="section-pad bg-paper"
      aria-labelledby="practical-title"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            Контакты
          </p>
          <h2
            id="practical-title"
            className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] tracking-[-0.02em] text-ink"
          >
            {copy.practical.title}
          </h2>

          <dl className="mt-10 space-y-8 text-sm">
            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-stone">
                Адрес
              </dt>
              <dd className="mt-2 text-base text-ink">
                {restaurant.address.full}
              </dd>
              <dd className="mt-1 text-xs text-ink/55">
                {restaurant.address.note}
              </dd>
              <dd className="mt-3">
                <a
                  href={restaurant.geo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-sm"
                >
                  Открыть карту
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-stone">
                Связь
              </dt>
              <dd className="mt-2 space-y-2">
                <a
                  href={restaurant.contacts.phoneHref}
                  className="link-underline block"
                >
                  {restaurant.contacts.phone}
                </a>
                <a
                  href={restaurant.contacts.emailHref}
                  className="link-underline block"
                >
                  {restaurant.contacts.email}
                </a>
                <a
                  href={restaurant.contacts.telegramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline block"
                >
                  Telegram {restaurant.contacts.telegram}
                </a>
                <a
                  href={restaurant.contacts.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline block"
                >
                  WhatsApp
                </a>
              </dd>
            </div>

            <div>
              <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-stone">
                Часы работы
              </dt>
              <dd className="mt-2 space-y-1">
                {restaurant.hours.map((h) => (
                  <div
                    key={h.days}
                    className="flex max-w-xs justify-between gap-6"
                  >
                    <span>{h.days}</span>
                    <span className="text-ink/60">{h.time}</span>
                  </div>
                ))}
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.06}>
          <div className="grid gap-6 sm:grid-cols-2">
            <InfoCard title="Парковка" text={restaurant.parking} />
            <InfoCard title="Дресс-код" text={restaurant.dressCode} />
            <InfoCard
              title="Политика бронирования"
              text={restaurant.reservationPolicy}
            />
            <InfoCard title="Доступность" text={restaurant.accessibility} />
          </div>

          <div
            className="mt-8 flex min-h-[12rem] items-center justify-center rounded-[1.5rem] border border-dashed border-ink/20 bg-paper-deep px-6 text-center text-sm leading-relaxed text-ink/55 sm:min-h-[14rem]"
            role="img"
            aria-label="Демо-заглушка карты"
          >
            {restaurant.geo.mapEmbedNote}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="border-t border-ink/10 pt-5">
      <h3 className="font-display text-lg tracking-wide text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">{text}</p>
    </div>
  );
}
