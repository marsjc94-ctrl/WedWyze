import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import RsvpPageContent from "@/components/RsvpPageContent";

export default async function RsvpPagePage() {
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
    .select("id, name, slug, date, venue")
    .eq("couple_id", user.id)
    .single();

  if (weddingError || !wedding) {
    redirect("/dashboard");
  }

  // Fetch guests stats
  const { data: guests, error: guestsError } = await supabase
    .from("guests")
    .select("id, rsvp_status")
    .eq("wedding_id", wedding.id);

  if (guestsError) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card p-8 bg-red-50 border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading RSVP Page
          </h2>
          <p className="text-red-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  const stats = {
    total: guests?.length || 0,
    responded: guests?.filter(
      (g) => g.rsvp_status === "attending" || g.rsvp_status === "declined"
    ).length || 0,
  };

  const responseRate =
    stats.total > 0 ? Math.round((stats.responded / stats.total) * 100) : 0;

  return (
    <RsvpPageContent
      wedding={wedding}
      responseRate={responseRate}
      totalGuests={stats.total}
      respondedGuests={stats.responded}
    />
  );
}
