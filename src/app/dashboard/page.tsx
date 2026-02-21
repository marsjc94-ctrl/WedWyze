import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Wedding } from "@/lib/types";
import CreateWeddingForm from "@/components/CreateWeddingForm";
import DashboardContent from "@/components/DashboardContent";

export default async function DashboardPage() {
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
    .select("*")
    .eq("couple_id", user.id)
    .single();

  // If no wedding exists, show create form
  if (weddingError && weddingError.code === "PGRST116") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-dark mb-2">
            Welcome to WedWyze
          </h1>
          <p className="text-gray-600">
            Let's get started by creating your wedding profile.
          </p>
        </div>

        <CreateWeddingForm userId={user.id} />
      </div>
    );
  }

  // If other error, show error message
  if (weddingError) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card p-8 bg-red-50 border-red-200">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Error Loading Wedding
          </h2>
          <p className="text-red-600">
            {weddingError.message || "Please try again later."}
          </p>
        </div>
      </div>
    );
  }

  // Show dashboard with wedding data
  return <DashboardContent wedding={wedding as Wedding} userId={user.id} />;
}
