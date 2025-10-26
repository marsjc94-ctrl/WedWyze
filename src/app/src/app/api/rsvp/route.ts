import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE!;

export async function POST(req: Request) {
  try {
    if (!url || !serviceKey) {
      return NextResponse.json(
        { error: "Missing Supabase env vars", haveUrl: !!url, haveServiceKey: !!serviceKey },
        { status: 500 }
      );
    }
    const supabase = createClient(url, serviceKey);

    const { eventId, name, email, phone, rsvpStatus, smsOptIn } = await req.json();
    if (!eventId || !name) {
      return NextResponse.json({ error: "Missing eventId or name" }, { status: 400 });
    }

    const { error } = await supabase.from("Guest").insert({
      event_id: eventId,
      name,
      email: email || null,
      phone: phone || null,
      rsvp_status: rsvpStatus || "YES",
      sms_opt_in: !!smsOptIn,
    });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
