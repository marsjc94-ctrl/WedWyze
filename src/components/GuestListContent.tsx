"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Guest } from "@/lib/types";
import AddGuestForm from "./AddGuestForm";
import { Trash2 } from "lucide-react";

interface GuestListContentProps {
  weddingId: string;
  initialGuests: Guest[];
}

export default function GuestListContent({
  weddingId,
  initialGuests,
}: GuestListContentProps) {
  const supabase = createClient();
  const [guests, setGuests] = useState<Guest[]>(initialGuests);
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleAddGuest = (newGuest: Guest) => {
    setGuests([newGuest, ...guests]);
    setShowAddForm(false);
  };

  const handleDeleteGuest = async (guestId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from("guests")
        .delete()
        .eq("id", guestId);

      if (error) {
        alert("Failed to delete guest");
        return;
      }

      setGuests(guests.filter((g) => g.id !== guestId));
      setDeleteConfirm(null);
    } finally {
      setLoading(false);
    }
  };

  const getRsvpBadgeColor = (status: Guest["rsvp_status"]) => {
    switch (status) {
      case "attending":
        return "bg-green-100 text-green-700";
      case "declined":
        return "bg-red-100 text-red-700";
      case "maybe":
        return "bg-yellow-100 text-yellow-700";
      case "pending":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getRsvpLabel = (status: Guest["rsvp_status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-serif font-bold text-dark mb-2">
            Guest List
          </h1>
          <p className="text-gray-600">
            Manage your wedding guests and track RSVPs
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn-gold px-6 py-3 rounded-lg font-semibold transition-all"
        >
          {showAddForm ? "Cancel" : "+ Add Guest"}
        </button>
      </div>

      {/* Add Guest Form */}
      {showAddForm && (
        <div className="mb-8 card p-8">
          <AddGuestForm
            weddingId={weddingId}
            onGuestAdded={handleAddGuest}
          />
        </div>
      )}

      {/* Guests Table */}
      <div className="card overflow-hidden">
        {guests.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-600 mb-4">No guests added yet.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-gold px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Add Your First Guest
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-ivory-200 bg-ivory-50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                    RSVP Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                    +1s
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                    Dietary Notes
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-dark">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {guests.map((guest) => (
                  <tr
                    key={guest.id}
                    className="hover:bg-ivory-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-dark">{guest.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">
                        {guest.email || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRsvpBadgeColor(
                          guest.rsvp_status
                        )}`}
                      >
                        {getRsvpLabel(guest.rsvp_status)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600">{guest.plus_ones}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 truncate max-w-xs">
                        {guest.dietary_notes || "—"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setDeleteConfirm(guest.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete guest"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="card p-8 max-w-md">
            <h3 className="text-xl font-semibold text-dark mb-4">
              Delete Guest?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this guest? This action cannot be
              undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteGuest(deleteConfirm)}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
