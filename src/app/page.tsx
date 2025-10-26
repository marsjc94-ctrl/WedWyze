import Link from "next/link";

function GradientBG() {
  return (
    <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute -top-32 -left-32 h-80 w-80 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 50%, #FDE2E4 0%, rgba(253,226,228,0) 70%)",
        }}
      />
      <div
        className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 50%, #E11D48 0%, rgba(225,29,72,0) 70%)",
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 right-1/3 h-72 w-72 rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(100% 100% at 50% 50%, #6B8F71 0%, rgba(107,143,113,0) 70%)",
        }}
      />
    </div>
  );
}

export default function Home() {
  return (
    <div className="relative bg-white">
      <GradientBG />

      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-brand.blush text-brand.rose">
          New • The single pane of glass for weddings
        </span>
        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-brand.ink">
          Weddings, simplified — one single pane of glass
        </h1>
        <p className="mt-4 text-lg text-brand.ink/80 max-w-2xl">
          One source of truth for couples, guests, and planners: RSVPs,
          schedules, travel & room blocks, reminders, and registries — all in
          one place.
        </p>

        {/* FIXED CTAs */}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/couples"
            className="px-5 py-3 rounded-lg bg-brand.rose text-white shadow-soft hover:opacity-95"
          >
            For Couples
          </Link>
          <Link
            href="/guests"
            className="px-5 py-3 rounded-lg bg-white text-brand.ink border border-brand.ink/15 hover:bg-brand.blush"
          >
            For Guests
          </Link>
          <Link
            href="/planners"
            className="px-5 py-3 rounded-lg bg-white text-brand.ink border border-brand.ink/15 hover:bg-brand.blush"
          >
            For Planners
          </Link>
        </div>
      </section>
    </div>
  );
}
