"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface NavbarProps {
  isAuthenticated?: boolean;
}

export default function Navbar({ isAuthenticated: initialAuth }: NavbarProps) {
  const router = useRouter();
  const supabase = createClient();

  const [isAuth, setIsAuth] = useState(initialAuth ?? false);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        setIsAuth(!!session);
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuth(false);
        setLoading(false);
      }
    };

    if (initialAuth === undefined) {
      checkAuth();
    } else {
      setLoading(false);
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuth(!!session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [initialAuth, supabase.auth]);

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await supabase.auth.signOut();
      setIsAuth(false);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error);
    } finally {
      setLoggingOut(false);
      setMobileMenuOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-ivory-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-gold-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span
              className="text-xl sm:text-2xl font-bold text-gray-900 hidden sm:inline"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              WedWyze
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isAuth ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-gold-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="bg-gold-600 hover:bg-gold-700 disabled:bg-gold-400 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="text-gray-700 hover:text-gold-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-gold-600 hover:bg-gold-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col gap-1.5 w-6 h-6"
            aria-label="Toggle menu"
          >
            <span
              className={`h-0.5 w-6 bg-gray-900 transition-all ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-900 transition-all ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-gray-900 transition-all ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-ivory-200 bg-white pb-4 space-y-2">
            {isAuth ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-gray-700 hover:bg-ivory-50 rounded-lg transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  disabled={loggingOut}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-ivory-50 rounded-lg transition-colors disabled:opacity-50"
                >
                  {loggingOut ? "Logging out..." : "Logout"}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-gray-700 hover:bg-ivory-50 rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={closeMobileMenu}
                  className="block px-4 py-2 text-white bg-gold-600 hover:bg-gold-700 rounded-lg transition-colors font-semibold"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
