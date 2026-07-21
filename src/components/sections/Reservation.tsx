"use client";

import { Reveal } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { Magnetic } from "@/components/motion/Magnetic";
import { Button } from "@/components/ui/Button";
import { TableMap } from "@/components/reservation/TableMap";
import { copy } from "@/content/copy";
import { restaurant } from "@/content/restaurant";
import type { FloorTable } from "@/content/tables";
import { floorTables } from "@/content/tables";
import { cn } from "@/lib/utils";
import { useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";

type FormState = {
  date: string;
  time: string;
  guests: string;
  name: string;
  phone: string;
  comment: string;
  eventType: string;
  tableId: string;
  /** Honeypot — leave empty */
  website: string;
};

type Status = "idle" | "loading" | "success" | "error";

const initial: FormState = {
  date: "",
  time: "",
  guests: "2",
  name: "",
  phone: "",
  comment: "",
  eventType: "",
  tableId: "",
  website: "",
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
  const [step, setStep] = useState<1 | 2>(1);
  const submittingRef = useRef(false);
  const minDate = useMemo(() => todayISO(), []);

  const selectedTable = floorTables.find((t) => t.id === form.tableId);

  const onChange = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
    if (status === "error" || status === "success") setStatus("idle");
  };

  const onSelectTable = (table: FloorTable | null) => {
    onChange("tableId", table?.id ?? "");
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
    if (submittingRef.current || status === "loading") return;
    if (!validate()) {
      setStep(2);
      return;
    }
    submittingRef.current = true;
    setStatus("loading");
    try {
      const res = await fetch(restaurant.booking.integrationEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          time: form.time,
          guests: Number(form.guests),
          name: form.name,
          phone: form.phone,
          comment: form.comment,
          eventType: form.eventType,
          tableId: form.tableId,
          website: form.website,
        }),
      });
      if (!res.ok) throw new Error("request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <section
      id="reservation"
      className="relative overflow-hidden section-pad bg-paper-deep"
      aria-labelledby="reservation-title"
    >
      <div className="container-wide relative">
        <Reveal>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-stone">
            Бронь
          </p>
          <TextReveal
            as="h2"
            id="reservation-title"
            text={copy.reservation.title}
            className="mt-4 max-w-2xl font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.05] tracking-[-0.02em] text-ink"
          />
          <p className="mt-5 max-w-xl text-base leading-relaxed text-ink/65">
            {copy.reservation.lead}
          </p>
        </Reveal>

        <div className="mt-10 flex gap-2" role="tablist" aria-label="Шаги брони">
          {[
            { id: 1 as const, label: "Стол" },
            { id: 2 as const, label: "Детали" },
          ].map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={step === s.id}
              className={cn(
                "rounded-full px-4 py-2.5 text-[0.7rem] uppercase tracking-[0.14em] transition-colors",
                step === s.id
                  ? "bg-ink text-paper"
                  : "bg-transparent text-ink/45 hover:text-ink",
              )}
              onClick={() => setStep(s.id)}
            >
              0{s.id} · {s.label}
            </button>
          ))}
        </div>

        <form onSubmit={onSubmit} noValidate className="mt-10">
          {/* Honeypot — hidden from users, visible to bots */}
          <div
            className="absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
            aria-hidden="true"
          >
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={(e) => onChange("website", e.target.value)}
            />
          </div>

          <div className={cn(step !== 1 && "hidden")}>
            <TableMap
              guests={Number(form.guests) || 2}
              selectedId={form.tableId || null}
              onSelect={onSelectTable}
            />

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <label className="text-sm text-ink/60" htmlFor="guests-step1">
                Гостей
              </label>
              <input
                id="guests-step1"
                type="number"
                min={restaurant.booking.minGuests}
                max={restaurant.booking.maxGuests}
                value={form.guests}
                onChange={(e) => onChange("guests", e.target.value)}
                className={inputClass()}
              />
              <Magnetic>
                <Button type="button" onClick={() => setStep(2)}>
                  Далее — контакты
                </Button>
              </Magnetic>
              {selectedTable && (
                <p className="text-sm text-olive">
                  Выбран стол {selectedTable.label} · {selectedTable.seats} мест
                </p>
              )}
            </div>
          </div>

          <div className={cn(step !== 2 && "hidden")}>
            <div className="rounded-[1.75rem] border border-ink/10 bg-paper p-6 md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Дата" error={errors.date} htmlFor="date">
                  <input
                    id="date"
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={(e) => onChange("date", e.target.value)}
                    className={inputClass(errors.date)}
                    aria-invalid={Boolean(errors.date)}
                    aria-describedby={errors.date ? "date-error" : undefined}
                    required
                  />
                </Field>

                <Field label="Время" error={errors.time} htmlFor="time">
                  <select
                    id="time"
                    value={form.time}
                    onChange={(e) => onChange("time", e.target.value)}
                    className={inputClass(errors.time)}
                    aria-invalid={Boolean(errors.time)}
                    aria-describedby={errors.time ? "time-error" : undefined}
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
                    aria-invalid={Boolean(errors.guests)}
                    aria-describedby={errors.guests ? "guests-error" : undefined}
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
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
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
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
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

              {selectedTable && (
                <p className="mt-5 text-sm text-ink/55">
                  Предпочтительный стол:{" "}
                  <span className="font-medium text-ink">
                    {selectedTable.label} ({selectedTable.seats} мест)
                  </span>
                </p>
              )}

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setStep(1)}
                    disabled={status === "loading"}
                  >
                    Назад к плану
                  </Button>
                  <Magnetic>
                    <Button type="submit" disabled={status === "loading"}>
                      {status === "loading" ? "Отправляем…" : "Отправить заявку"}
                    </Button>
                  </Magnetic>
                </div>
                <p className="text-xs leading-relaxed text-ink/45 sm:max-w-xs sm:text-right">
                  Заявка не является подтверждённой бронью.
                </p>
              </div>

              {status === "success" && (
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
                  <a
                    href={restaurant.contacts.phoneHref}
                    className="link-underline"
                  >
                    {restaurant.contacts.phone}
                  </a>
                </p>
              )}
            </div>
          </div>
        </form>
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
        <p
          id={`${htmlFor}-error`}
          className="mt-1.5 text-xs text-burgundy"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return cn(
    "w-full rounded-2xl border bg-transparent px-3 py-3 text-base text-ink outline-none transition-colors focus:border-ink/50 sm:text-sm",
    error ? "border-burgundy/60" : "border-ink/15",
  );
}
