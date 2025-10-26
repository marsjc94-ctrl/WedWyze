import Link from "next/link";

function GradientBG() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(100% 100% at 50% 50%, #FDE2E4 0%, rgba(253,226,228,0) 70%)" }}/>
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30"
           style={{ background: "radial-gradient(100% 100% at 50% 50%, #E11D48 0%, rgba(225,29,72,0) 70%)" }}/>
      <div className="absolute top-1/2 -translate-y-1/2 right-1/3 h-72 w-72 rounded-full blur-3xl opacity-20"
           style={{ background: "radial-gradient(100% 100% at 50% 50%, #6B8F71 0%, rgba(107,143,113,0) 70%)" }}/>
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative bg-white">
      <GradientBG />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-brand.blush text-brand.rose">
          New • The single pane of glass for weddings
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-brand.ink">
          Weddings, simplified — one single pane of glass
        </h1>
        <p className="mt-4 text-lg text-brand.ink/80 max-w-2xl">
          One source of truth for couples, guests, and planners: RSVPs, schedules, travel & room blocks, reminders, and registries — all in one place.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/couples" className="px-5 py-3 rounded-lg bg-brand.rose text-white shadow-soft">For Couples</Link>
          <Link href="/guests" className="px-5 py-3 rounded-lg border border-brand.ink/15 text-brand.ink bg-white">For Guests</Link>
          <Link href="/planners" className="px-5 py-3 rounded-lg border border-brand.ink/15 text-brand.ink bg-white">For Planners</Link>
        </div>
      </section>

      {/* Three columns */}
      <section className="mx-auto max-w-6xl px-6 pb-16 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Couples",
            desc: "Plan with clarity: RSVPs, budgets, tasks, timeline, vendors — all in one place.",
            href: "/couples",
          },
          {
            title: "Guests",
            desc: "RSVP in seconds. Get reminders, travel suggestions, and the exact places to be.",
            href: "/guests",
          },
          {
            title: "Planners",
            desc: "A command center for events: vendor coordination, schedules, and communications.",
            href: "/planners",
          },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-brand.ink/10 bg-brand.champagne/40 p-6 hover:shadow-soft transition">
            <h3 className="text-xl font-semibold text-brand.ink">{c.title}</h3>
            <p className="mt-2 text-brand.ink/80">{c.desc}</p>
            <Link href={c.href} className="mt-4 inline-block text-sm underline decoration-brand.rose underline-offset-4">
              Explore
            </Link>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl bg-brand.ink text-white p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-semibold">Start with an RSVP link today</h3>
          <p className="mt-2 text-white/80">Spin up your event, collect RSVPs, and send SMS reminders — all from one pane of glass.</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/couples" className="px-5 py-3 rounded-lg bg-white text-brand.ink">For Couples</Link>
            <Link href="/guest/DEMO-EVENT-ID/rsvp" className="px-5 py-3 rounded-lg border border-white/30">Try RSVP</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
