"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Guest } from "@/lib/types";

interface AddGuestFormProps {
  weddingId: string;
  onGuestAdded: (guest: Guest) => void;
}

export default function AddGuestForm({
  weddingId,
  onGuestAdded,
}: AddGuestFormProps) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    rsvp_status: "pending" | "attending" | "declined" | "maybe";
    dietary_notes: string;
    plus_ones: number;
    table_number: string;
  }>({
    name: "",
    email: "",
    rsvp_status: "pending",
    dietary_notes: "",
    plus_ones: 0,
    table_number: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name.trim()) {
        setError("Guest name is required");
        setLoading(false);
        return;
      }

      const { data, error: insertError } = await supabase
        .from("guests")
        .insert({
          wedding_id: weddingId,
          name: formData.name.trim(),
          email: formData.email.trim() || null,
          rsvp_status: formData.rsvp_status,
          dietary_notes: formData.dietary_notes.trim() || null,
          plus_ones: parseInt(formData.plus_ones.toString()) || 0,
          table_number: formData.table_number.trim() || null,
        })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message || "Failed to add guest");
        return;
      }

      if (data) {
        onGuestAdded(data);
        setFormData({
          name: "",
          email: "",
          rsvp_status: "pending",
          dietary_notes: "",
          plus_ones: 0,
          table_number: "",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
            Guest Name *
          </label>
          <input
            id="name"
            type="text"
            placeholder="Full name"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="guest@example.com"
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={loading}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label htmlFor="rsvp_status" className="block text-sm font-semibold text-dark mb-2">
            RSVP Status
          </label>
          <select
            id="rsvp_status"
            className="input-field"
            value={formData.rsvp_status}
            onChange={(e) =>
              setFormData({
                ...formData,
                rsvp_status: e.target.value as "pending" | "attending" | "declined" | "maybe",
              })
            }
            disabled={loading}
          >
            <option value="pending">Pending</option>
            <option value="attending">Attending</option>
            <option value="declined">Declined</option>
            <option value="maybe">Maybe</option>
          </select>
        </div>

        <div>
          <label htmlFor="plus_ones" className="block text-sm font-semibold text-dark mb-2">
            Plus Ones
          </label>
          <input
            id="plus_ones"
            type="number"
            min="0"
            max="10"
            className="input-field"
            value={formData.plus_ones}
            onChange={(e) =>
              setFormData({ ...formData, plus_ones: parseInt(e.target.value) || 0 })
            }
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="table_number" className="block text-sm font-semibold text-dark mb-2">
            Table Number
          </label>
          <input
            id="table_number"
            type="text"
            placeholder="e.g., A1"
            className="input-field"
            value={formData.table_number}
            onChange={(e) =>
              setFormData({ ...formData, table_number: e.target.value })
            }
            disabled={loading}
          />
        </div>
      </div>

      <div>
        <label htmlFor="dietary_notes" className="block text-sm font-semibold text-dark mb-2">
          Dietary Notes
        </label>
        <textarea
          id="dietary_notes"
          placeholder="e.g., Vegetarian, Gluten-free..."
          className="input-field resize-none"
          rows={3}
          value={formData.dietary_notes}
          onChange={(e) =>
            setFormData({ ...formData, dietary_notes: e.target.value })
          }
          disabled={loading}
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 btn-gold py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Adding Guest..." : "Add Guest"}
        </button>
      </div>
    </form>
  );
}
