import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory-50 via-white to-ivory-50">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-32 pb-20 sm:pb-32">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="text-5xl">💍</div>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif text-gold-600 mb-6 leading-tight">
            The single source of truth for your wedding
          </h1>

          <p className="text-lg sm:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            One platform for couples, guests, and planners. RSVPs, schedules, travel, room blocks, reminders, and registries — all in one beautiful place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#waitlist"
              className="btn-gold inline-block py-4 px-8 rounded-lg font-semibold text-white text-center transition-all"
            >
              Join the Waitlist
            </a>
            <Link
              href="/auth/signup"
              className="btn-outline-gold inline-block py-4 px-8 rounded-lg font-semibold text-center transition-all"
            >
              Try RSVP
            </Link>
          </div>
        </div>
      </section>

      {/* Features for Couples Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20 sm:py-32 border-y border-gold-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-serif text-center text-gold-600 mb-4">
            For Couples
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Everything you need to plan, manage, and celebrate your wedding
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "✓",
                title: "Guest Management",
                description:
                  "Invite guests, track RSVPs, and manage seating all in one place.",
              },
              {
                icon: "📅",
                title: "Timeline & Reminders",
                description:
                  "Keep everyone informed with timely updates and reminders leading up to the big day.",
              },
              {
                icon: "🏨",
                title: "Room Blocks",
                description:
                  "Share hotel recommendations and room block details with your guests.",
              },
              {
                icon: "🛫",
                title: "Travel Planning",
                description:
                  "Help guests plan transportation and accommodations with integrated tools.",
              },
              {
                icon: "🎁",
                title: "Registry",
                description:
                  "Share and manage your wedding registry in one central location.",
              },
              {
                icon: "📸",
                title: "Photo Gallery",
                description:
                  "Collect and share wedding memories with your guests.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-ivory-50 to-white rounded-xl p-8 border border-gold-100 hover:border-gold-300 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif text-gold-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features for Guests Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-serif text-center text-gold-600 mb-4">
            For Guests
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Make it easy for your loved ones to celebrate with you
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: "📬",
                title: "Easy RSVP",
                description:
                  "Respond to invitations with just a few clicks. No complicated forms or emails.",
              },
              {
                icon: "💬",
                title: "Meal Preferences",
                description:
                  "Share dietary restrictions and meal choices upfront.",
              },
              {
                icon: "🗓️",
                title: "Schedule Updates",
                description:
                  "Stay informed with timeline updates and reminders.",
              },
              {
                icon: "🎫",
                title: "Plus-One Management",
                description:
                  "Easily add additional guests and manage their information.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-gold-50 to-ivory-50 rounded-xl p-8 border border-gold-200 hover:border-gold-400 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif text-gold-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features for Planners Section */}
      <section className="bg-white/50 backdrop-blur-sm py-20 sm:py-32 border-y border-gold-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-serif text-center text-gold-600 mb-4">
            For Planners
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Professional tools to coordinate the perfect wedding
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "👥",
                title: "Guest Lists",
                description:
                  "Manage all guest information in a centralized, organized system.",
              },
              {
                icon: "💰",
                title: "Budget Tracking",
                description:
                  "Keep track of vendor costs and overall wedding budget.",
              },
              {
                icon: "✅",
                title: "Task Management",
                description:
                  "Create checklists and assign tasks to team members.",
              },
              {
                icon: "📊",
                title: "Analytics & Reports",
                description:
                  "Get insights on RSVPs, meals, and guest demographics.",
              },
              {
                icon: "🔗",
                title: "Vendor Integration",
                description:
                  "Connect with vendors and share information seamlessly.",
              },
              {
                icon: "🔐",
                title: "Permissions & Access",
                description:
                  "Control who has access to sensitive wedding information.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-ivory-50 to-white rounded-xl p-8 border border-gold-100 hover:border-gold-300 transition-all hover:shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-serif text-gold-600 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 sm:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-serif text-center text-gold-600 mb-4">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Three simple steps to wedding bliss
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                number: "1",
                title: "Create Your Wedding",
                description:
                  "Set up your wedding profile with dates, venue, and guest list.",
              },
              {
                number: "2",
                title: "Invite Your Guests",
                description:
                  "Send beautiful invitations with RSVP links to all your guests.",
              },
              {
                number: "3",
                title: "Manage Everything",
                description:
                  "Track RSVPs, manage meals, and stay organized all in one place.",
              },
            ].map((step, idx) => (
              <div key={idx} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-white text-2xl font-serif font-bold mb-6">
                  {step.number}
                </div>
                <h3 className="text-xl font-serif text-gold-600 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">{step.description}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 text-2xl text-gold-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gold-600 to-gold-500 py-20 sm:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-serif text-white mb-6">
            Ready to simplify your wedding?
          </h2>
          <p className="text-xl text-white/90 mb-12">
            Join hundreds of couples who've already organized their weddings with WedWyze.
          </p>
          <a
            href="#waitlist"
            className="inline-block bg-white text-gold-600 font-semibold py-4 px-8 rounded-lg hover:bg-ivory-50 transition-all transform hover:scale-105"
          >
            Get Started Today
          </a>
        </div>
      </section>

      {/* Waitlist Form Section */}
      <section id="waitlist" className="py-20 sm:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-serif text-center text-gold-600 mb-4">
            Join Our Waitlist
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Be the first to know when WedWyze launches. We're building something special.
          </p>

          <form
            action="https://formspree.io/f/mjgeabaz"
            method="POST"
            className="bg-gradient-to-br from-ivory-50 to-white rounded-2xl p-8 sm:p-10 card space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="John & Jane Smith"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="your@email.com"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="wedding_date" className="block text-sm font-semibold text-gray-700 mb-2">
                Wedding Date (if set)
              </label>
              <input
                type="date"
                id="wedding_date"
                name="wedding_date"
                className="input-field"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Tell us about your wedding (optional)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Number of guests, wedding theme, questions you have..."
                className="input-field resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-gold py-3 px-6 rounded-lg font-semibold text-white transition-all"
            >
              Join the Waitlist
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gold-100 bg-ivory-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gold-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <span className="text-xl font-serif text-gray-900">WedWyze</span>
            </div>
            <p className="text-gray-600 text-center sm:text-right">
              © 2026 WedWyze. All rights reserved. The single source of truth for your wedding.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
