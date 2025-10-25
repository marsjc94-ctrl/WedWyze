import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between py-4 px-6 bg-white shadow-md">
      <Link href="/">
        <span className="text-xl font-semibold">WedWyze</span>
      </Link>
      <div className="space-x-4">
        <Link href="/features" className="text-gray-600 hover:text-black">
          Features
        </Link>
        <Link href="/pricing" className="text-gray-600 hover:text-black">
          Pricing
        </Link>
        <Link href="/faq" className="text-gray-600 hover:text-black">
          FAQ
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-black">
          Contact
        </Link>
        <Link
          href="/dashboard"
          className="ml-4 inline-block rounded-md bg-purple-600 px-4 py-2 text-white hover:bg-purple-700"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}