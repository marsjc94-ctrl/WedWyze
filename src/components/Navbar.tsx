"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm transition ${
        active ? "bg-rose-500 text-white" : "text-gray-800 hover:bg-rose-50"
      }`}
    >
      {children}
    </Link>
  );
}

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block w-7 h-7 rounded-md bg-rose-500" />
          <span className="font-semibold text-lg text-gray-900">WedWyze</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink href="/couples">Couples</NavLink>
          <NavLink href="/guests">Guests</NavLink>
          <NavLink href="/planners">Planners</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <Link
            href="/r/demo"
            className="ml-2 px-4 py-2 rounded-md text-sm bg-gray-900 text-white hover:opacity-90"
          >
            Try RSVP
          </Link>
        </nav>
      </div>
    </header>
  );
}
