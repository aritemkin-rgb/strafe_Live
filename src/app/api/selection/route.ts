import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { appendLocalSelection } from "@/lib/selectionStorage";
import { selectionSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = selectionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("side_selection_events").insert({
          anonymous_session_id: data.anonymousSessionId,
          selected_theater: data.selectedTheater,
          selected_side: data.selectedSide,
          event_type: data.eventType,
        });
        if (error) {
          await appendLocalSelection(data);
        }
      }
    } else {
      await appendLocalSelection(data);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
