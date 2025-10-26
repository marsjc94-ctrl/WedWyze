import Link from "next/link";

export default function Couples() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 space-y-8">
      <h1 className="text-3xl font-semibold">For Couples</h1>
      <p className="text-gray-700 max-w-2xl">
        WedWyze is your single pane of glass: the credible, calming source of truth for everything
        wedding-related. Real-time RSVP status, timelines, travel, budget, and vendors—organized and delightful.
        Planning finally feels easy and fun.
      </p>

      <ul className="grid md:grid-cols-2 gap-6">
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">RSVPs & Guest Lists</h3>
          <p className="text-gray-700 mt-1">
            Real-time updates as guests respond. Plus-one support, dietary notes, and instant insights—no spreadsheets.
          </p>
        </li>
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">Timeline & Itinerary</h3>
          <p className="text-gray-700 mt-1">
            Ceremony, welcome party, brunch—clear times, locations, and maps everyone actually sees.
          </p>
        </li>
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">Budget & Room Blocks</h3>
          <p className="text-gray-700 mt-1">
            Smart hotel suggestions by guest budget; track commitments and save time on coordination.
          </p>
        </li>
        <li className="border rounded-xl p-6">
          <h3 className="font-semibold">Registry</h3>
          <p className="text-gray-700 mt-1">
            Connect Zola and others—guests see it right <strong>when</strong> they RSVP.
          </p>
        </li>
      </ul>

      <Link
        href="/r/demo"
        className="inline-block px-5 py-3 rounded-lg bg-brand.rose text-white shadow-soft hover:opacity-95">
        Try the RSVP flow
      </Link>
    </div>
  );
}
