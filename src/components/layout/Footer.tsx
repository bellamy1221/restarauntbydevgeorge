import { Wordmark, Monogram } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { restaurant } from "@/content/restaurant";
import { navigation, reserveCta } from "@/content/navigation";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-paper">
      <div className="container-wide section-pad">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Wordmark size="lg" className="text-paper" href="#top" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/70">
              {restaurant.shortDescription}
            </p>
            <div className="mt-8">
              <Button href={reserveCta.href} variant="on-dark">
                {reserveCta.label}
              </Button>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-metal">
                Навигация
              </p>
              <ul className="mt-4 space-y-3">
                {navigation.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      className="link-underline text-sm text-paper/85"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-metal">
                Контакты
              </p>
              <ul className="mt-4 space-y-3 text-sm text-paper/85">
                <li>{restaurant.address.full}</li>
                <li>
                  <a
                    href={restaurant.contacts.phoneHref}
                    className="link-underline"
                  >
                    {restaurant.contacts.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={restaurant.contacts.emailHref}
                    className="link-underline"
                  >
                    {restaurant.contacts.email}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[0.7rem] uppercase tracking-[0.16em] text-metal">
                Часы
              </p>
              <ul className="mt-4 space-y-2 text-sm text-paper/85">
                {restaurant.hours.map((h) => (
                  <li key={h.days} className="flex justify-between gap-4">
                    <span>{h.days}</span>
                    <span className="text-paper/60">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-sm text-paper/50">
            <Monogram className="border-paper/30 text-paper/70" />
            <span>
              © {year} {restaurant.name}
            </span>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-paper/50">
            {restaurant.social.map((s) => (
              <a key={s.label} href={s.href} className="link-underline">
                {s.label}
              </a>
            ))}
            <span>{restaurant.legal.entity}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
