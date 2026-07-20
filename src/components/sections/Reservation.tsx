"use client";

import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { copy } from "@/content/copy";
import { restaurant } from "@/content/restaurant";
import { cn } from "@/lib/utils";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";

type FormState = {
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
  comment: string;
  eventType: string;
};

type Status = "idle" | "loading" | "prepared" | "error";

const initial: FormState = {
  date: "",
  time: "",
  guests: "2",
  name: "",
  phone: "",
  comment: "",
  eventType: "",
};

function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60_000);
  return local.toISOString().slice(0, 10);
}

function validatePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function Reservation() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [status, setStatus] = useState<Status>("idle");
  const minDate = useMemo(() => todayISO(), []);

  const onChange = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.date) next.date = "Укажите дату";
    else if (form.date < minDate) next.date = "Дата не может быть в прошлом";
    if (!form.time) next.time = "Выберите время";
    if (!form.guests) next.guests = "Укажите число гостей";
    const guestsNum = Number(form.guests);
    if (
      guestsNum < restaurant.booking.minGuests ||
      guestsNum > restaurant.booking.maxGuests
    ) {
      next.guests = `От ${restaurant.booking.minGuests} до ${restaurant.booking.maxGuests}`;
    }
    if (!form.name.trim()) next.name = "Укажите имя";
    if (!form.phone.trim()) next.phone = "Укажите телефон";
    else if (!validatePhone(form.phone))
      next.phone = "Проверьте формат телефона";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch(restaurant.booking.integrationEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          guests: Number(form.guests),
          provider: restaurant.booking.provider,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("prepared");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="reservation"
      className="section-pad bg-paper-deep"
      aria-labelledby="reservation-title"
    >
      <div className="container-wide grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            Бронь
          </p>
          <h2
            id="reservation-title"
            className="mt-4 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.05] tracking-tight text-ink"
          >
            {copy.reservation.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink/65">
            {copy.reservation.lead}
          </p>
          <p className="mt-4 text-sm text-ink/50">{copy.reservation.note}</p>
          <div className="mt-8 space-y-3 text-sm">
            <a
              href={restaurant.contacts.phoneHref}
              className="link-underline block"
            >
              {restaurant.contacts.phone}
            </a>
            <a
              href={restaurant.contacts.telegramHref}
              className="link-underline block"
            >
              Telegram: {restaurant.contacts.telegram}
            </a>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.06}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="border border-ink/10 bg-paper p-6 md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="Дата"
                error={errors.date}
                htmlFor="date"
              >
                <input
                  id="date"
                  type="date"
                  min={minDate}
                  value={form.date}
                  onChange={(e) => onChange("date", e.target.value)}
                  className={inputClass(errors.date)}
                  required
                />
              </Field>

              <Field label="Время" error={errors.time} htmlFor="time">
                <select
                  id="time"
                  value={form.time}
                  onChange={(e) => onChange("time", e.target.value)}
                  className={inputClass(errors.time)}
                  required
                >
                  <option value="">Выберите</option>
                  {restaurant.booking.timeSlots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Гостей" error={errors.guests} htmlFor="guests">
                <input
                  id="guests"
                  type="number"
                  min={restaurant.booking.minGuests}
                  max={restaurant.booking.maxGuests}
                  value={form.guests}
                  onChange={(e) => onChange("guests", e.target.value)}
                  className={inputClass(errors.guests)}
                  required
                />
              </Field>

              <Field label="Формат (опционально)" htmlFor="eventType">
                <select
                  id="eventType"
                  value={form.eventType}
                  onChange={(e) => onChange("eventType", e.target.value)}
                  className={inputClass()}
                >
                  <option value="">Обычный ужин</option>
                  <option value="birthday">День рождения</option>
                  <option value="business">Деловая встреча</option>
                  <option value="proposal">Особое событие</option>
                  <option value="private">Частное мероприятие</option>
                  <option value="corporate">Корпоративный ужин</option>
                </select>
              </Field>

              <Field label="Имя" error={errors.name} htmlFor="name">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => onChange("name", e.target.value)}
                  className={inputClass(errors.name)}
                  required
                />
              </Field>

              <Field label="Телефон" error={errors.phone} htmlFor="phone">
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+7 …"
                  value={form.phone}
                  onChange={(e) => onChange("phone", e.target.value)}
                  className={inputClass(errors.phone)}
                  required
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Комментарий" htmlFor="comment">
                  <textarea
                    id="comment"
                    rows={3}
                    value={form.comment}
                    onChange={(e) => onChange("comment", e.target.value)}
                    className={cn(inputClass(), "resize-y")}
                    placeholder="Пожелания к столу, аллергии, повод…"
                  />
                </Field>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" disabled={status === "loading"}>
                {status === "loading" ? "Отправляем…" : "Отправить заявку"}
              </Button>
              <p className="text-xs leading-relaxed text-ink/45 sm:max-w-xs sm:text-right">
                Заявка не является подтверждённой бронью.
              </p>
            </div>

            {status === "prepared" && (
              <p
                role="status"
                className="mt-6 border border-olive/30 bg-olive/5 px-4 py-3 text-sm text-olive-deep"
              >
                {restaurant.booking.fallbackMessage}{" "}
                <a
                  href={restaurant.contacts.phoneHref}
                  className="link-underline font-medium"
                >
                  {restaurant.contacts.phone}
                </a>
              </p>
            )}

            {status === "error" && (
              <p role="alert" className="mt-6 text-sm text-burgundy">
                Не удалось отправить заявку. Позвоните нам:{" "}
                <a href={restaurant.contacts.phoneHref} className="link-underline">
                  {restaurant.contacts.phone}
                </a>
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 block text-[0.7rem] uppercase tracking-[0.14em] text-stone"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-burgundy" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-sm border bg-transparent px-3 py-3 text-sm text-ink outline-none transition-colors focus:border-ink/50",
    error ? "border-burgundy/60" : "border-ink/15",
  );
}
