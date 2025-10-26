"use client";
export const dynamic = "force-dynamic";

import { useState } from "react";

export default function RSVPPage({ params }: { params: { eventId: string } }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"YES" | "NO">("YES");
  const [optIn, setOptIn] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setMsg(null);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: params.eventId,
          name,
          email,
          phone,
          rsvpStatus: status,
          smsOptIn: optIn,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      setMsg("RSVP saved! We’ll keep you posted.");
      setName("");
      setEmail("");
      setPhone("");
    } catch (err: any) {
      setMsg(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 24 }}>
      <h1>RSVP</h1>
      <p style={{ opacity: 0.7, marginTop: 4 }}>Event: {params.eventId}</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input required placeholder="Full name" value={name} onChange={e => setName(e.target.value)} />
        <input type="email" placeholder="Email (optional)" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Mobile (for SMS reminders)" value={phone} onChange={e => setPhone(e.target.value)} />
        <label>
          Status:&nbsp;
          <select value={status} onChange={e => setStatus(e.target.value as any)}>
            <option value="YES">Yes, I’m coming</option>
            <option value="NO">Can’t make it</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={optIn} onChange={e => setOptIn(e.target.checked)} />
          &nbsp;Text me reminders about times & locations
        </label>
        <button disabled={submitting} type="submit">
          {submitting ? "Saving..." : "Submit RSVP"}
        </button>
      </form>

      {msg && <p style={{ marginTop: 12 }}>{msg}</p>}
    </main>
  );
}
