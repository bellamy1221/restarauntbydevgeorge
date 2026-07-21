import { NextResponse } from "next/server";
import { restaurant } from "@/content/restaurant";
import {
  formatTelegramMessage,
  sendTelegramMessage,
  validateReservation,
} from "@/lib/reservations";

export const runtime = "nodejs";

/**
 * Reservation intake — validates payload and forwards to Telegram.
 * Secrets stay server-side (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID).
 */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    );
  }

  // Honeypot: silent success for bots without notifying Telegram
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.trim() !== ""
  ) {
    return NextResponse.json({
      ok: true,
      status: "success",
      message: restaurant.booking.fallbackMessage,
    });
  }

  const validated = validateReservation(body);
  if (!validated.ok) {
    return NextResponse.json(
      { ok: false, error: validated.error },
      { status: validated.status },
    );
  }

  const submittedAt = new Date();
  const message = formatTelegramMessage(validated.data, submittedAt);

  try {
    await sendTelegramMessage(message);
  } catch (err) {
    const reason = err instanceof Error ? err.message : "send_failed";
    const isConfig = reason === "missing_telegram_env";
    console.error("[reservations]", reason);
    return NextResponse.json(
      {
        ok: false,
        error: isConfig ? "telegram_not_configured" : "telegram_send_failed",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    status: "success",
    message: restaurant.booking.fallbackMessage,
  });
}
