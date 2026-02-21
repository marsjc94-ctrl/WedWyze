"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface CreateWeddingFormProps {
  userId: string;
}

export default function CreateWeddingForm({ userId }: CreateWeddingFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    venue: "",
  });

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.name.trim()) {
        setError("Wedding name is required");
        setLoading(false);
        return;
      }

      const slug = generateSlug(formData.name);

      const { data, error: insertError } = await supabase
        .from("weddings")
        .insert({
          couple_id: userId,
          name: formData.name.trim(),
          date: formData.date || null,
          venue: formData.venue.trim() || null,
          slug,
          description: null,
        })
        .select()
        .single();

      if (insertError) {
        setError(insertError.message || "Failed to create wedding");
        return;
      }

      if (data) {
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-8 max-w-md">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
            Wedding Name *
          </label>
          <input
            id="name"
            type="text"
            placeholder="e.g., Sarah & John's Wedding"
            className="input-field"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-semibold text-dark mb-2">
            Wedding Date
          </label>
          <input
            id="date"
            type="date"
            className="input-field"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="venue" className="block text-sm font-semibold text-dark mb-2">
            Venue
          </label>
          <input
            id="venue"
            type="text"
            placeholder="e.g., Grand Ballroom, Downtown"
            className="input-field"
            value={formData.venue}
            onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
            disabled={loading}
          />
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-gold py-3 rounded-lg font-semibold transition-all disabled:opacity-50"
        >
          {loading ? "Creating Wedding..." : "Create Wedding"}
        </button>
      </div>
    </form>
  );
}
