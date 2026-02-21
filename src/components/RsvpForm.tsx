"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface RsvpFormProps {
  weddingId: string;
}

type RsvpStatus = "attending" | "declined" | "maybe";
type MealChoice = "beef" | "chicken" | "fish" | "vegetarian" | "vegan";

export default function RsvpForm({ weddingId }: RsvpFormProps) {
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    attending: "attending" as RsvpStatus,
    mealChoice: "chicken" as MealChoice,
    dietaryNotes: "",
    plusOnes: 0,
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "plusOnes"
          ? parseInt(value, 10)
          : name === "attending"
            ? (value as RsvpStatus)
            : name === "mealChoice"
              ? (value as MealChoice)
              : value,
    }));
  };

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const attending = formData.attending === "attending";

      let guestId: string | null = null;

      // Find or create guest
      const { data: existingGuest, error: fetchError } = await supabase
        .from("guests")
        .select("id")
        .eq("wedding_id", weddingId)
        .eq("email", formData.email)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        throw new Error("Failed to find guest: " + fetchError.message);
      }

      if (existingGuest) {
        guestId = existingGuest.id;
      } else {
        const { data: newGuest, error: createError } = await supabase
          .from("guests")
          .insert([
            {
              wedding_id: weddingId,
              name: formData.guestName,
              email: formData.email,
              rsvp_status: formData.attending,
              dietary_notes:
                formData.dietaryNotes || null,
              plus_ones: formData.plusOnes,
            },
          ])
          .select("id")
          .single();

        if (createError) {
          throw new Error("Failed to create guest: " + createError.message);
        }

        if (newGuest) {
          guestId = newGuest.id;
        }
      }

      if (!guestId) {
        throw new Error("Failed to get or create guest");
      }

      // Insert RSVP response
      const { error: rsvpError } = await supabase
        .from("rsvp_responses")
        .insert([
          {
            guest_id: guestId,
            wedding_id: weddingId,
            attending,
            meal_choice: formData.mealChoice,
            message: formData.message || null,
          },
        ]);

      if (rsvpError) {
        throw new Error("Failed to submit RSVP: " + rsvpError.message);
      }

      // Update guest RSVP status
      const { error: updateError } = await supabase
        .from("guests")
        .update({ rsvp_status: formData.attending })
        .eq("id", guestId);

      if (updateError) {
        throw new Error("Failed to update guest status: " + updateError.message);
      }

      setSubmitted(true);
      triggerConfetti();

      // Reset form after a delay
      setTimeout(() => {
        setFormData({
          guestName: "",
          email: "",
          attending: "attending",
          mealChoice: "chicken",
          dietaryNotes: "",
          plusOnes: 0,
          message: "",
        });
      }, 2000);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      console.error("RSVP submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative">
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: Math.random() * 100 + "%",
                  top: -10,
                  animation: `fall ${2 + Math.random() * 1}s linear forwards`,
                  animationDelay: Math.random() * 0.5 + "s",
                }}
              >
                {i % 3 === 0 ? "💕" : i % 3 === 1 ? "✨" : "🎉"}
              </div>
            ))}
          </div>
        )}
        <div className="bg-gradient-to-br from-gold-50 to-ivory-100 border-2 border-gold-300 rounded-2xl p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-gold-600 mb-4">
            Thank you!
          </h2>
          <p className="text-gray-700 text-lg mb-6">
            Your RSVP has been received with joy.
          </p>
          <p className="text-gray-600">
            We can't wait to celebrate with you!
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-8 sm:p-10 card"
    >
      <h2 className="text-2xl sm:text-3xl font-serif text-gold-600 mb-8">
        RSVP Now
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Guest Name */}
      <div className="mb-6">
        <label htmlFor="guestName" className="block text-sm font-semibold text-gray-700 mb-2">
          Your Name
        </label>
        <input
          type="text"
          id="guestName"
          name="guestName"
          value={formData.guestName}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          required
          className="input-field"
        />
      </div>

      {/* Email */}
      <div className="mb-6">
        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="your@email.com"
          required
          className="input-field"
        />
      </div>

      {/* Attending Radio Buttons */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-4">
          Will you be attending?
        </label>
        <div className="space-y-3">
          {(["attending", "declined", "maybe"] as RsvpStatus[]).map(
            (option) => (
              <label key={option} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="attending"
                  value={option}
                  checked={formData.attending === option}
                  onChange={handleInputChange}
                  className="w-5 h-5 accent-gold-600 cursor-pointer"
                />
                <span className="ml-3 text-gray-700 group-hover:text-gold-600 transition-colors capitalize">
                  {option === "attending" && "Yes, I'll be there!"}
                  {option === "declined" && "Sorry, I can't make it"}
                  {option === "maybe" && "Maybe, I'll let you know"}
                </span>
              </label>
            )
          )}
        </div>
      </div>

      {/* Meal Choice */}
      <div className="mb-6">
        <label htmlFor="mealChoice" className="block text-sm font-semibold text-gray-700 mb-2">
          Meal Preference
        </label>
        <select
          id="mealChoice"
          name="mealChoice"
          value={formData.mealChoice}
          onChange={handleInputChange}
          className="input-field"
        >
          <option value="beef">Beef</option>
          <option value="chicken">Chicken</option>
          <option value="fish">Fish</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
        </select>
      </div>

      {/* Dietary Notes */}
      <div className="mb-6">
        <label htmlFor="dietaryNotes" className="block text-sm font-semibold text-gray-700 mb-2">
          Dietary Notes or Allergies
        </label>
        <textarea
          id="dietaryNotes"
          name="dietaryNotes"
          value={formData.dietaryNotes}
          onChange={handleInputChange}
          placeholder="Let us know about any dietary requirements..."
          rows={3}
          className="input-field resize-none"
        />
      </div>

      {/* Plus Ones */}
      <div className="mb-6">
        <label htmlFor="plusOnes" className="block text-sm font-semibold text-gray-700 mb-2">
          Number of Additional Guests
        </label>
        <input
          type="number"
          id="plusOnes"
          name="plusOnes"
          value={formData.plusOnes}
          onChange={handleInputChange}
          min="0"
          max="5"
          className="input-field"
        />
      </div>

      {/* Message to Couple */}
      <div className="mb-8">
        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
          Message to the Couple (Optional)
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Share your well-wishes or a special message..."
          rows={4}
          className="input-field resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full btn-gold py-3 px-6 rounded-lg font-semibold text-white disabled:opacity-50 transition-all"
      >
        {loading ? "Submitting..." : "Submit RSVP"}
      </button>
    </form>
  );
}
