import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight">
          Weddings, simplified — one single pane of glass
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          WedWyze is the one source of truth for couples, guests, and planners:
          RSVPs, schedules, travel & room blocks, reminders, and registries —
          all organized in one place, with smart nudges so no one misses a beat.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/couples" className="px-5 py-3 rounded-lg bg-black text-white">For Couples</Link>
          <Link href="/guests" className="px-5 py-3 rounded-lg border">For Guests</Link>
          <Link href="/planners" className="px-5 py-3 rounded-lg border">For Planners</Link>
        </div>
      </section>

      {/* Problem / Solution */}
      <section className="bg-gray-50 border-y">
        <div className="mx-auto max-w-6xl px-6 py-14 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-2xl font-semibold">The problem</h2>
            <p className="mt-3 text-gray-700">
              Planning and attending weddings is messy: siloed info, RSVP churn, travel confusion,
              budget headaches, and constant “what’s the plan?” texts. Details scatter across emails,
              spreadsheets, and links — and guests forget things.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Our solution</h2>
            <ul className="mt-3 space-y-2 text-gray-700 list-disc ml-5">
              <li>Central hub that’s the <strong>one source of truth</strong></li>
              <li>Smart RSVP flows + SMS reminders (opt-in)</li>
              <li>Instant hotel options & room blocks by budget</li>
              <li>Clear itineraries, timing, and maps</li>
              <li>Registry connected seamlessly</li>
              <li>Planner tooling for vendors, tasks, and timelines</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Verticals */}
      <section className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border p-6">
          <h3 className="text-xl font-semibold">Couples</h3>
          <p className="mt-2 text-gray-700">Plan with clarity: RSVPs, budgets, tasks, timeline, vendors — all in one place.</p>
          <Link href="/couples" className="mt-4 inline-block text-sm underline">Explore</Link>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="text-xl font-semibold">Guests</h3>
          <p className="mt-2 text-gray-700">RSVP in seconds. Get reminders, travel suggestions, and the exact places to be.</p>
          <Link href="/guests" className="mt-4 inline-block text-sm underline">Explore</Link>
        </div>
        <div className="rounded-xl border p-6">
          <h3 className="text-xl font-semibold">Planners</h3>
          <p className="mt-2 text-gray-700">A command center for events: vendor coordination, schedules, and communications.</p>
          <Link href="/planners" className="mt-4 inline-block text-sm underline">Explore</Link>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl bg-black text-white p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-semibold">Start with an RSVP link today</h3>
          <p className="mt-2 text-gray-200">Spin up your event, collect RSVPs, and send SMS reminders — all from one pane of glass.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/couples" className="px-5 py-3 rounded-lg bg-white text-black">For Couples</Link>
            <Link href="/guest/DEMO-EVENT-ID/rsvp" className="px-5 py-3 rounded-lg border border-white">Try RSVP</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
