"use client";

import { useState } from "react";
import { Copy, Check, Eye } from "lucide-react";

interface RsvpPageContentProps {
  wedding: {
    id: string;
    name: string;
    slug: string;
    date: string | null;
    venue: string | null;
  };
  responseRate: number;
  totalGuests: number;
  respondedGuests: number;
}

export default function RsvpPageContent({
  wedding,
  responseRate,
  totalGuests,
  respondedGuests,
}: RsvpPageContentProps) {
  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const rsvpUrl = `https://wedwyze.vercel.app/w/${wedding.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rsvpUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-serif font-bold text-dark mb-2">
          RSVP Page Settings
        </h1>
        <p className="text-gray-600">
          Share your wedding RSVP link and track guest responses
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card p-6">
          <p className="text-sm text-gray-600 mb-2">Total Page Views</p>
          <p className="text-3xl font-bold text-dark">—</p>
          <p className="text-xs text-gray-500 mt-2">Coming soon</p>
        </div>

        <div className="card p-6">
          <p className="text-sm text-gray-600 mb-2">Response Rate</p>
          <p className="text-3xl font-bold text-gold-600">{responseRate}%</p>
          <p className="text-xs text-gray-500 mt-2">
            {respondedGuests} of {totalGuests} guests
          </p>
        </div>

        <div className="card p-6">
          <p className="text-sm text-gray-600 mb-2">Guests Invited</p>
          <p className="text-3xl font-bold text-dark">{totalGuests}</p>
        </div>
      </div>

      {/* RSVP URL Section */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-serif font-bold text-dark mb-6">
          Public RSVP Link
        </h2>

        <div className="space-y-4">
          <p className="text-gray-700">
            Share this link with your guests to collect RSVPs:
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-ivory-50 p-4 rounded-lg border border-ivory-200">
              <code className="text-sm text-dark break-all font-mono">
                {rsvpUrl}
              </code>
            </div>

            <button
              onClick={copyToClipboard}
              className="flex items-center justify-center gap-2 btn-gold px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copy Link
                </>
              )}
            </button>

            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center justify-center gap-2 btn-outline-gold px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap"
            >
              <Eye className="w-5 h-5" />
              Preview
            </button>
          </div>
        </div>
      </div>

      {/* Share Options */}
      <div className="card p-8 mb-8">
        <h2 className="text-2xl font-serif font-bold text-dark mb-6">
          Share Your RSVP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              const text = `Please RSVP to ${wedding.name}: ${rsvpUrl}`;
              window.open(
                `https://wa.me/?text=${encodeURIComponent(text)}`,
                "_blank"
              );
            }}
            className="p-4 border border-ivory-200 rounded-lg hover:bg-ivory-50 transition-colors text-center"
          >
            <p className="font-semibold text-dark">WhatsApp</p>
            <p className="text-sm text-gray-600">Share via WhatsApp</p>
          </button>

          <button
            onClick={() => {
              const text = `Hi! Please RSVP to ${wedding.name} here: ${rsvpUrl}`;
              window.open(
                `sms:?body=${encodeURIComponent(text)}`,
                "_blank"
              );
            }}
            className="p-4 border border-ivory-200 rounded-lg hover:bg-ivory-50 transition-colors text-center"
          >
            <p className="font-semibold text-dark">SMS</p>
            <p className="text-sm text-gray-600">Send via text message</p>
          </button>

          <button
            onClick={() => {
              const subject = `${wedding.name} - RSVP`;
              const body = `Hi! We'd love to have you. Please RSVP here: ${rsvpUrl}`;
              window.open(
                `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
                "_blank"
              );
            }}
            className="p-4 border border-ivory-200 rounded-lg hover:bg-ivory-50 transition-colors text-center"
          >
            <p className="font-semibold text-dark">Email</p>
            <p className="text-sm text-gray-600">Send via email</p>
          </button>
        </div>
      </div>

      {/* Preview Section */}
      {showPreview && (
        <div className="card p-8">
          <h2 className="text-2xl font-serif font-bold text-dark mb-6">
            RSVP Page Preview
          </h2>

          <div className="bg-gradient-to-br from-gold-50 to-ivory-100 rounded-lg p-8 space-y-6 text-center">
            <div>
              <h3 className="text-4xl font-serif font-bold text-dark mb-2">
                {wedding.name}
              </h3>
              {wedding.date && (
                <p className="text-lg text-gray-600">
                  {new Date(wedding.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              )}
              {wedding.venue && (
                <p className="text-lg text-gray-600">{wedding.venue}</p>
              )}
            </div>

            <button className="btn-gold px-8 py-3 rounded-lg font-semibold text-white">
              RSVP Now
            </button>

            <p className="text-sm text-gray-600 italic">
              Please confirm your attendance by [Date]
            </p>
          </div>

          <p className="text-center text-sm text-gray-500 mt-6">
            This is a preview of what your guests will see when they visit your RSVP link.
          </p>
        </div>
      )}

      {/* Additional Settings */}
      <div className="card p-8">
        <h2 className="text-2xl font-serif font-bold text-dark mb-6">
          Customization
        </h2>

        <div className="space-y-4 text-gray-600">
          <p className="flex items-start gap-3">
            <span className="text-gold-600 font-bold mt-1">•</span>
            Your RSVP page features your wedding name, date, and venue
          </p>
          <p className="flex items-start gap-3">
            <span className="text-gold-600 font-bold mt-1">•</span>
            Guests can update their attendance status and dietary preferences
          </p>
          <p className="flex items-start gap-3">
            <span className="text-gold-600 font-bold mt-1">•</span>
            All responses are automatically added to your guest list
          </p>
          <p className="flex items-start gap-3">
            <span className="text-gold-600 font-bold mt-1">•</span>
            Additional customization options coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
