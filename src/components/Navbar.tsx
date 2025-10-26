"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const active = usePathname() === href;
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm transition ${
        active ? "bg-brand.rose text-white" : "text-brand.ink hover:bg-brand.blush"
      }`}
    >
      {children}
    </Link>
  );
};

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl h-16 px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="WedWyze" width={28} height={28} />
          <span className="font-semibold text-lg text-brand.ink">WedWyze</span>
        </Link>
        <nav className="flex items-center gap-2">
          <NavLink href="/couples">Couples</NavLink>
          <NavLink href="/guests">Guests</NavLink>
          <NavLink href="/planners">Planners</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <Link
            href="/guest/DEMO-EVENT-ID/rsvp"
            className="ml-2 px-4 py-2 rounded-md text-sm bg-brand.ink text-white hover:opacity-90"
          >
            Try RSVP
          </Link>
        </nav>
      </div>
    </header>
  );
}
