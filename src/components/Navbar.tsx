"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const active = usePathname() === href;
  return (
    <Link href={href} className={`px-3 py-2 rounded-md text-sm ${active ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"}`}>
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg">WedWyze</Link>
        <nav className="flex items-center gap-2">
          <NavLink href="/couples">Couples</NavLink>
          <NavLink href="/guests">Guests</NavLink>
          <NavLink href="/planners">Planners</NavLink>
          <NavLink href="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
