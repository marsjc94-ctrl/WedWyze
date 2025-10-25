import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12">
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">All your weddings in one place</h1>
          <p className="text-lg text-gray-600 mb-6">
            WedWyze helps couples and guests stay organized with RSVP, schedules, registry and travel tools
            — all in a single link.
          </p>
          <div className="space-x-4">
            <Link
              href="/dashboard"
              className="inline-block rounded-md bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
            >
              Get Started
            </Link>
            <Link
              href="/features"
              className="inline-block rounded-md border border-purple-600 px-6 py-3 text-purple-600 hover:bg-purple-50"
            >
              See Features
            </Link>
          </div>
        </section>
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border p-6 text-center">
              <h3 className="font-medium text-xl mb-2">One Guest Link</h3>
              <p className="text-gray-600">
                Guests see everything they need — date, location, RSVP, schedule and registry — on a single page.
              </p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <h3 className="font-medium text-xl mb-2">Smart Planning</h3>
              <p className="text-gray-600">
                Track budgets, add registry links, and maintain a clear schedule that updates automatically.
              </p>
            </div>
            <div className="rounded-lg border p-6 text-center">
              <h3 className="font-medium text-xl mb-2">Guest PTO (Coming Soon)</h3>
              <p className="text-gray-600">
                Pick wedding dates that work for your guests using our PTO heatmap to gauge availability.
              </p>
            </div>
          </div>
        </section>
        <section className="text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to be Wyze about weddings?</h2>
          <Link
            href="/contact"
            className="inline-block rounded-md bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
          >
            Join the Waitlist
          </Link>
        </section>
      </main>
    </>
  );
}