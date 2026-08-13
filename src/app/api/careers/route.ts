import { NextResponse } from "next/server";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabaseAdmin";
import { appendLocalCareerApplication } from "@/lib/selectionStorage";
import { careerApplicationSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = careerApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request", details: parsed.error.flatten() },
        { status: 400 },
      );
    }

    const data = parsed.data;
    const applicationId = crypto.randomUUID();

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("career_applications").insert({
          id: applicationId,
          email: data.email.toLowerCase(),
          name: data.name,
          role: data.role,
          note: data.note || null,
          linkedin_url: data.linkedin || null,
        });

        if (error) {
          await appendLocalCareerApplication(data, applicationId);
        }
      } else {
        await appendLocalCareerApplication(data, applicationId);
      }
    } else {
      await appendLocalCareerApplication(data, applicationId);
    }

    return NextResponse.json({
      ok: true,
      message: "Application received",
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
