import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative bg-white">
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-rose-50 text-rose-600">
          New • The single pane of glass for weddings
        </span>

        <h1 className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight text-gray-900">
          Weddings, simplified — one single pane of glass
        </h1>

        <p className="mt-4 text-lg text-gray-700 max-w-2xl">
          One source of truth for couples, guests, and planners: RSVPs,
          schedules, travel & room blocks, reminders, and registries — all in
          one place.
        </p>

        {/* HERO CTA BUTTONS — updated visual styling */}
        <div className="mt-10 flex flex-wrap gap-4">
          {/* For Couples */}
          <Link
            href="/couples"
            className="px-6 py-3 rounded-xl text-white font-medium bg-gradient-to-r from-rose-500 to-pink-400 shadow-md hover:opacity-90 transition"
          >
            For Couples
          </Link>

          {/* For Guests */}
          <Link
            href="/guests"
            className="px-6 py-3 rounded-xl font-medium text-gray-800 border border-gray-200 bg-white hover:bg-rose-50 transition shadow-sm"
          >
            For Guests
          </Link>

          {/* For Planners */}
          <Link
            href="/planners"
            className="px-6 py-3 rounded-xl font-medium text-gray-800 border border-gray-200 bg-white hover:bg-rose-50 transition shadow-sm"
          >
            For Planners
          </Link>
        </div>
      </section>
    </div>
  );
}
