import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { appendLocalWaitlist } from "@/lib/selectionStorage";
import { waitlistSchema } from "@/lib/validation";
import { formatQueuePosition, queueNumberFromEmail } from "@/lib/queueNumber";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = waitlistSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const queuePosition = queueNumberFromEmail(data.email);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (!supabase) {
        return NextResponse.json(
          { error: "Database unavailable" },
          { status: 503 },
        );
      }

      const { error } = await supabase.from("waitlist_signups").insert({
        email: data.email.toLowerCase(),
        name: data.name || data.callsign || null,
        callsign: data.callsign || data.name || null,
        marketing_consent: data.marketingConsent ?? false,
        source: data.source ?? "homepage",
        selected_theater: data.selectedTheater ?? null,
        selected_side: data.selectedSide ?? null,
      });

      if (error) {
        const duplicate =
          error.code === "23505" ||
          /duplicate|unique/i.test(error.message ?? "");
        if (duplicate) {
          return NextResponse.json({
            ok: true,
            queuePosition,
            queueLabel: formatQueuePosition(queuePosition),
            message: "You're already on the list",
            alreadyRegistered: true,
          });
        }
        console.error("[waitlist] supabase insert failed", error.message);
        return NextResponse.json(
          { error: "Could not save signup. Try again." },
          { status: 502 },
        );
      }
    } else {
      // Local JSON fallback — fine for development; Hostinger redeploys wipe .data/
      await appendLocalWaitlist(data);
    }

    return NextResponse.json({
      ok: true,
      queuePosition,
      queueLabel: formatQueuePosition(queuePosition),
      message: "Access request received",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
