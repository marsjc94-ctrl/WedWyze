"use client";

export default function RSVPPage({ params }: { params: { eventId: string } }) {
  return (
    <main style={{ maxWidth: 560, margin: "40px auto", padding: 24 }}>
      <h1>RSVP for event: {params.eventId}</h1>
      <p>If you can see this, the RSVP route is wired up.</p>
    </main>
  );
}
