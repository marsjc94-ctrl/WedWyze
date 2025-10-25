import Navbar from '@/components/Navbar';

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-4xl font-bold mb-4">Join the Waitlist</h1>
        <p className="mb-6 text-gray-600">
          We're busy building WedWyze! Leave your details below and we'll notify you when we're ready.
        </p>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thanks for joining the waitlist!');
          }}
        >
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full rounded-md border-gray-300 focus:border-purple-600 focus:ring-purple-600"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full rounded-md border-gray-300 focus:border-purple-600 focus:ring-purple-600"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-medium">
              Message (optional)
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full rounded-md border-gray-300 focus:border-purple-600 focus:ring-purple-600"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
          >
            Join Waitlist
          </button>
        </form>
      </main>
    </>
  );
}