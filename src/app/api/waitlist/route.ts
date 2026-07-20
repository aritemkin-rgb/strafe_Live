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
      if (supabase) {
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
          // fall through to local storage for resilience
          await appendLocalWaitlist(data);
        }
      }
    } else {
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
