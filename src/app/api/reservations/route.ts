import { NextResponse } from "next/server";
import { restaurant } from "@/content/restaurant";

/**
 * Reservation integration point.
 * Currently stores nothing and returns a "prepared" status.
 * Wire to Yandex / Restoplace / Quick Resto / OpenTable / SevenRooms /
 * Telegram / email / custom API by reading restaurant.booking.provider
 * and implementing the corresponding branch.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || !body?.phone || !body?.date || !body?.time) {
      return NextResponse.json(
        { ok: false, error: "missing_fields" },
        { status: 400 },
      );
    }

    // Integration switch — extend when credentials are available
    switch (restaurant.booking.provider) {
      case "none":
      default:
        // Honest non-confirmation response
        return NextResponse.json({
          ok: true,
          status: "prepared",
          message: restaurant.booking.fallbackMessage,
          provider: restaurant.booking.provider,
        });
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_request" },
      { status: 400 },
    );
  }
}
