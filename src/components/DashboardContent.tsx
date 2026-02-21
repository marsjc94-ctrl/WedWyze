"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Wedding, Guest } from "@/lib/types";
import { Share2, UserPlus, Calendar, MapPin, Users } from "lucide-react";

interface DashboardContentProps {
  wedding: Wedding;
  userId: string;
}

export default function DashboardContent({
  wedding,
  userId,
}: DashboardContentProps) {
  const supabase = createClient();
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGuests = async () => {
      const { data } = await supabase
        .from("guests")
        .select("*")
        .eq("wedding_id", wedding.id);

      if (data) {
        setGuests(data);
      }
      setLoading(false);
    };

    fetchGuests();
  }, [wedding.id, supabase]);

  const stats = {
    total: guests.length,
    attending: guests.filter((g) => g.rsvp_status === "attending").length,
    declined: guests.filter((g) => g.rsvp_status === "declined").length,
    pending: guests.filter((g) => g.rsvp_status === "pending").length,
  };

  const responseRate =
    stats.total > 0
      ? Math.round(
          ((stats.attending + stats.declined) / stats.total) * 100
        )
      : 0;

  const rsvpUrl = `https://wedwyze.vercel.app/w/${wedding.slug}`;

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-dark mb-2">
          {wedding.name}
        </h1>
        <p className="text-gray-600">
          Manage your wedding details and track RSVPs
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Guests</p>
              <p className="text-3xl font-bold text-dark">{stats.total}</p>
            </div>
            <Users className="w-10 h-10 text-gold-400 opacity-50" />
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">RSVPs Received</p>
              <p className="text-3xl font-bold text-dark">{responseRate}%</p>
            </div>
            <div className="text-2xl font-semibold text-gold-600">
              {stats.attending + stats.declined}/{stats.total}
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Attending</p>
              <p className="text-3xl font-bold text-green-600">{stats.attending}</p>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Declined</p>
              <p className="text-3xl font-bold text-red-600">{stats.declined}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          href="/dashboard/rsvp-page"
          className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center">
              <Share2 className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h3 className="font-semibold text-dark">Share RSVP Link</h3>
              <p className="text-sm text-gray-600">
                Send the link to your guests
              </p>
            </div>
          </div>
        </Link>

        <Link
          href="/dashboard/guests"
          className="card p-6 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gold-100 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-gold-600" />
            </div>
            <div>
              <h3 className="font-semibold text-dark">Add Guest</h3>
              <p className="text-sm text-gray-600">
                Add a new guest to your list
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Wedding Details Card */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-serif font-bold text-dark mb-6">
          Wedding Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-600 block mb-2">
              Wedding Name
            </label>
            <p className="text-lg text-dark">{wedding.name}</p>
          </div>

          {wedding.date && (
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                <Calendar className="w-4 h-4 inline mr-1" />
                Wedding Date
              </label>
              <p className="text-lg text-dark">
                {new Date(wedding.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          )}

          {wedding.venue && (
            <div>
              <label className="text-sm font-semibold text-gray-600 block mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Venue
              </label>
              <p className="text-lg text-dark">{wedding.venue}</p>
            </div>
          )}
        </div>
      </div>

      {/* RSVP URL Card */}
      <div className="card p-8">
        <h2 className="text-2xl font-serif font-bold text-dark mb-4">
          Public RSVP Link
        </h2>

        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-gray-600 mb-2">Share this link with guests:</p>
            <div className="bg-ivory-50 p-4 rounded-lg border border-ivory-200">
              <code className="text-sm text-dark break-all">{rsvpUrl}</code>
            </div>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(rsvpUrl);
              alert("Link copied to clipboard!");
            }}
            className="btn-gold px-6 py-2 rounded-lg font-semibold transition-all whitespace-nowrap"
          >
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
