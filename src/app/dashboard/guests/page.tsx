import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import GuestListContent from "@/components/GuestListContent";

export default async function GuestsPage() {
  const supabase = await createClient();

  // Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/auth/login");
  }

  // Fetch user's wedding
  const { data: wedding, error: weddingError } = await supabase
    .from("weddings")
    .select("id")
    .eq("couple_id", user.id)
    .single();

  if (weddingError || !wedding) {
    redirect("/dashboard");
  }

  // Fetch all guests for this wedding
  const { data: guests, error: guestsError } = await supabase
    .from("guests")
    .select("*")
    .eq("wedding_id", wedding.id)
    .order("created_at", { ascending: false });

  if (guestsError) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card p-8 bg-red-50 border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Guests
          </h2>
          <p className="text-red-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <GuestListContent
      weddingId={wedding.id}
      initialGuests={guests || []}
    />
  );
}
