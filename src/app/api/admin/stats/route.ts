import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { getLocalStats } from "@/lib/selectionStorage";

export async function GET() {
  const cookieStore = await cookies();
  const authed = cookieStore.get("strafe_admin")?.value === "1";
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    const stats = await getLocalStats();
    return NextResponse.json(stats);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    const stats = await getLocalStats();
    return NextResponse.json(stats);
  }

  const { data: waitlist } = await supabase
    .from("waitlist_signups")
    .select("created_at");
  const { data: selections } = await supabase
    .from("side_selection_events")
    .select("selected_theater, selected_side, event_type, created_at");

  const sideCounts: Record<string, number> = {
    ukraine: 0,
    russia: 0,
    israel: 0,
    palestine: 0,
    "no-preference": 0,
  };
  const theaterCounts: Record<string, number> = {
    "eastern-europe": 0,
    levant: 0,
  };
  const signupBySide: Record<string, number> = {
    ukraine: 0,
    russia: 0,
    israel: 0,
    palestine: 0,
    "no-preference": 0,
  };
  const signupsByDay: Record<string, number> = {};

  for (const event of selections ?? []) {
    if (event.event_type === "select") {
      sideCounts[event.selected_side] =
        (sideCounts[event.selected_side] ?? 0) + 1;
      if (event.selected_theater) {
        theaterCounts[event.selected_theater] =
          (theaterCounts[event.selected_theater] ?? 0) + 1;
      }
    }
    if (event.event_type === "signup_complete") {
      signupBySide[event.selected_side] =
        (signupBySide[event.selected_side] ?? 0) + 1;
    }
  }

  for (const row of waitlist ?? []) {
    const day = String(row.created_at).slice(0, 10);
    signupsByDay[day] = (signupsByDay[day] ?? 0) + 1;
  }

  return NextResponse.json({
    totalWaitlist: waitlist?.length ?? 0,
    totalSelections: (selections ?? []).filter((s) => s.event_type === "select")
      .length,
    sideCounts,
    theaterCounts,
    signupBySide,
    signupsByDay,
    storage: "supabase",
  });
}
