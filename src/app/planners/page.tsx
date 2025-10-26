export default function Planners() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14 space-y-6">
      <h1 className="text-3xl font-semibold">For Planners</h1>
      <p className="text-gray-700 max-w-2xl">
        A command center for every wedding you run — one source of truth for RSVPs, vendors, tasks, timelines,
        and guest communications.
      </p>
      <ul className="grid md:grid-cols-2 gap-6">
        <li className="border rounded-xl p-6"><strong>Multi-event Dashboard</strong><p className="text-gray-700 mt-1">See health, RSVP rates, and schedules at a glance.</p></li>
        <li className="border rounded-xl p-6"><strong>Vendor Coordination</strong><p className="text-gray-700 mt-1">Bands, florists, caterers, photographers — all aligned.</p></li>
        <li className="border rounded-xl p-6"><strong>Guest Messaging</strong><p className="text-gray-700 mt-1">Broadcast SMS for last-minute changes (opt-in).</p></li>
        <li className="border rounded-xl p-6"><strong>Room Blocks</strong><p className="text-gray-700 mt-1">Automate or suggest hotels by budget & ETA.</p></li>
      </ul>
    </div>
  );
}
