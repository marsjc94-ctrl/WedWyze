"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEmailPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(signInError.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleMagicLinkLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: magicLinkError } =
        await supabase.auth.signInWithOtp({
          email,
        });

      if (magicLinkError) {
        setError(magicLinkError.message);
        setLoading(false);
        return;
      }

      setSuccessMessage(
        "Check your email for a magic link to log in securely."
      );
      setEmail("");
      setLoading(false);
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory-50 to-ivory-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header with Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <svg
              className="w-8 h-8 text-gold-600"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h1
              className="text-3xl font-bold text-gray-900"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              WedWyze
            </h1>
          </div>
          <p className="text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
            Plan your perfect wedding
          </p>
        </div>

        {/* Card Container */}
        <div className="card bg-white rounded-xl shadow-lg p-8 mb-6">
          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <p className="text-emerald-800 text-sm">{successMessage}</p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Toggle between login methods */}
          <div className="flex gap-2 mb-6 bg-ivory-50 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setUseMagicLink(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
                !useMagicLink
                  ? "bg-gold-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => setUseMagicLink(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
                useMagicLink
                  ? "bg-gold-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Magic Link
            </button>
          </div>

          {/* Email Password Login Form */}
          {!useMagicLink && (
            <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full bg-gold-600 hover:bg-gold-700 disabled:bg-gold-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>
          )}

          {/* Magic Link Login Form */}
          {useMagicLink && (
            <form onSubmit={handleMagicLinkLogin} className="space-y-4">
              <div>
                <label
                  htmlFor="magic-email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  id="magic-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="input-field w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition"
                />
              </div>

              <p className="text-sm text-gray-600 py-4">
                We'll send you a secure magic link to log in without a password.
              </p>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full bg-gold-600 hover:bg-gold-700 disabled:bg-gold-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6"
              >
                {loading ? "Sending link..." : "Send Magic Link"}
              </button>
            </form>
          )}
        </div>

        {/* Signup Link */}
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-gold-600 hover:text-gold-700 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
