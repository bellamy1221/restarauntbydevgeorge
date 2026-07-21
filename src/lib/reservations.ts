import { restaurant } from "@/content/restaurant";
import { floorTables, zoneLabels, type FloorTable } from "@/content/tables";

export const EVENT_TYPES = [
  "birthday",
  "business",
  "proposal",
  "private",
  "corporate",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];

export type ReservationPayload = {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  eventType: string;
  comment: string;
  /** Honeypot — must be empty */
  website?: string;
};

export type ValidationResult =
  | { ok: true; data: Omit<ReservationPayload, "website"> & { table: FloorTable | null } }
  | { ok: false; error: string; status: 400 };

const EVENT_LABELS: Record<EventType, string> = {
  birthday: "День рождения",
  business: "Деловая встреча",
  proposal: "Особое событие",
  private: "Частное мероприятие",
  corporate: "Корпоративный ужин",
};

const MAX_NAME = 80;
const MAX_PHONE = 32;
const MAX_COMMENT = 1000;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^\d{2}:\d{2}$/;

function todayISOMoscow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Moscow",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const y = parts.find((p) => p.type === "year")?.value;
  const m = parts.find((p) => p.type === "month")?.value;
  const d = parts.find((p) => p.type === "day")?.value;
  return `${y}-${m}-${d}`;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asTrimmedString(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (trimmed.length > max) return null;
  return trimmed;
}

export function validateReservation(body: unknown): ValidationResult {
  if (!isPlainObject(body)) {
    return { ok: false, error: "invalid_body", status: 400 };
  }

  const name = asTrimmedString(body.name, MAX_NAME);
  if (!name) {
    return { ok: false, error: "invalid_name", status: 400 };
  }

  const phoneRaw = asTrimmedString(body.phone, MAX_PHONE);
  if (!phoneRaw) {
    return { ok: false, error: "invalid_phone", status: 400 };
  }
  const phoneDigits = phoneRaw.replace(/\D/g, "");
  if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    return { ok: false, error: "invalid_phone", status: 400 };
  }

  const date = asTrimmedString(body.date, 10);
  if (!date || !DATE_RE.test(date)) {
    return { ok: false, error: "invalid_date", status: 400 };
  }
  const [y, m, d] = date.split("-").map(Number);
  const parsed = new Date(Date.UTC(y, m - 1, d));
  if (
    parsed.getUTCFullYear() !== y ||
    parsed.getUTCMonth() !== m - 1 ||
    parsed.getUTCDate() !== d
  ) {
    return { ok: false, error: "invalid_date", status: 400 };
  }
  if (date < todayISOMoscow()) {
    return { ok: false, error: "date_in_past", status: 400 };
  }

  const time = asTrimmedString(body.time, 5);
  if (
    !time ||
    !TIME_RE.test(time) ||
    !(restaurant.booking.timeSlots as readonly string[]).includes(time)
  ) {
    return { ok: false, error: "invalid_time", status: 400 };
  }

  const guests =
    typeof body.guests === "number"
      ? body.guests
      : typeof body.guests === "string"
        ? Number(body.guests)
        : NaN;
  if (
    !Number.isInteger(guests) ||
    guests < restaurant.booking.minGuests ||
    guests > restaurant.booking.maxGuests
  ) {
    return { ok: false, error: "invalid_guests", status: 400 };
  }

  let tableId = "";
  if (body.tableId != null && body.tableId !== "") {
    const id = asTrimmedString(body.tableId, 32);
    if (!id || !floorTables.some((t) => t.id === id)) {
      return { ok: false, error: "invalid_table", status: 400 };
    }
    tableId = id;
  }

  let eventType = "";
  if (body.eventType != null && body.eventType !== "") {
    const et = asTrimmedString(body.eventType, 32);
    if (!et || !(EVENT_TYPES as readonly string[]).includes(et)) {
      return { ok: false, error: "invalid_event_type", status: 400 };
    }
    eventType = et;
  }

  let comment = "";
  if (body.comment != null && body.comment !== "") {
    if (typeof body.comment !== "string" || body.comment.length > MAX_COMMENT) {
      return { ok: false, error: "invalid_comment", status: 400 };
    }
    comment = body.comment.trim();
  }

  const table = tableId
    ? (floorTables.find((t) => t.id === tableId) ?? null)
    : null;

  return {
    ok: true,
    data: {
      name,
      phone: phoneRaw,
      date,
      time,
      guests,
      tableId,
      eventType,
      comment,
      table,
    },
  };
}

export function formatTelegramMessage(
  data: Extract<ValidationResult, { ok: true }>["data"],
  submittedAt: Date,
): string {
  const eventLabel =
    data.eventType && (EVENT_TYPES as readonly string[]).includes(data.eventType)
      ? EVENT_LABELS[data.eventType as EventType]
      : "Обычный ужин";

  const tableLabel = data.table
    ? `Стол ${data.table.label} · ${zoneLabels[data.table.zone]} · ${data.table.seats} мест`
    : "Не выбран";

  const timestamp = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    dateStyle: "long",
    timeStyle: "medium",
  }).format(submittedAt);

  const comment = data.comment || "—";

  return [
    "Новая заявка на бронь — VINCENZO",
    "",
    `Имя: ${data.name}`,
    `Телефон: ${data.phone}`,
    `Дата: ${data.date}`,
    `Время: ${data.time}`,
    `Гостей: ${data.guests}`,
    `Стол: ${tableLabel}`,
    `Формат: ${eventLabel}`,
    `Комментарий: ${comment}`,
    `Отправлено: ${timestamp} (МСК)`,
  ].join("\n");
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    throw new Error("missing_telegram_env");
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      disable_web_page_preview: true,
    }),
  });

  if (!res.ok) {
    throw new Error("telegram_send_failed");
  }

  const json = (await res.json()) as { ok?: boolean };
  if (!json.ok) {
    throw new Error("telegram_api_error");
  }
}
