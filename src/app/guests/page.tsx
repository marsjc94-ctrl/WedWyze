export default function Guests() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 space-y-6">
      <h1 className="text-3xl font-semibold">For Guests</h1>
      <p className="text-gray-700 max-w-2xl">
        RSVP in seconds. Get text reminders (opt-in) with where to be and when.
        See travel options and the registry in the same place.
      </p>
      <ul className="grid md:grid-cols-2 gap-6">
        <li className="border rounded-xl p-6"><strong>Fast RSVP</strong><p className="text-gray-700 mt-1">No accounts. One form. Done.</p></li>
        <li className="border rounded-xl p-6"><strong>Travel & Room Blocks</strong><p className="text-gray-700 mt-1">Options by budget, sent instantly.</p></li>
        <li className="border rounded-xl p-6"><strong>SMS Reminders</strong><p className="text-gray-700 mt-1">Opt-in reminders about times & locations.</p></li>
        <li className="border rounded-xl p-6"><strong>Registry</strong><p className="text-gray-700 mt-1">Linked where you already are.</p></li>
      </ul>
    </div>
  );
}
