import Link from "next/link";

export default function Couples() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 space-y-8">
      <h1 className="text-3xl font-semibold">For Couples</h1>
      <p className="text-gray-700 max-w-2xl">
        WedWyze is your single pane of glass: a calm, credible source of truth for everything wedding-related.
        Track RSVPs, budgets, tasks, timelines, and vendors — without juggling spreadsheets and links.
      </p>
      <ul className="grid md:grid-cols-2 gap-6">
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">RSVPs & Guest Lists</h3>
          <p className="text-gray-700 mt-1">Clean status, plus-one support, dietary needs, and SMS updates.</p>
        </li>
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">Timeline & Itinerary</h3>
          <p className="text-gray-700 mt-1">Ceremony, welcome party, brunch — clear times and locations.</p>
        </li>
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">Budget & Room Blocks</h3>
          <p className="text-gray-700 mt-1">Suggested hotel options by guest budget; track commitments.</p>
        </li>
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">Registry</h3>
          <p className="text-gray-700 mt-1">Connect Zola and others — guests see it right where they RSVP.</p>
        </li>
      </ul>
      <Link href="/guest/DEMO-EVENT-ID/rsvp" className="inline-block px-5 py-3 rounded-lg bg-black text-white">Try the RSVP flow</Link>
    </div>
  );
}
