// src/app/api/rsvp/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE!;

function client() {
  if (!url || !serviceKey) return null;
  return createClient(url, serviceKey);
}

// Health check: GET /api/rsvp
export async function GET(req: Request) {
  try {
    const c = client();
    if (!c) {
      return NextResponse.json(
        { ok: false, step: "env", haveUrl: !!url, haveServiceKey: !!serviceKey },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    const base = c.from("Guest").select("*", { head: true, count: "exact" });
    const { error, count } = eventId ? await base.eq("event_id", eventId) : await base;

    if (error) {
      return NextResponse.json({ ok: false, step: "select", error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, haveUrl: true, haveServiceKey: true, guestCount: count ?? 0 });
  } catch (e: any) {
    return NextResponse.json({ ok: false, step: "catch", error: e.message }, { status: 500 });
  }
}

// Insert: POST /api/rsvp
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
      rsvp_status: rsvpStatus ?? "YES",
      sms_opt_in: !!smsOptIn,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Unknown error" }, { status: 500 });
  }
}
