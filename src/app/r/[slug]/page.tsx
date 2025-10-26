import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Force runtime to server so we can read server env safely
export const dynamic = "force-dynamic";

export default async function SlugPage({
  params,
}: {
  params: { slug: string };
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE;

  // If env missing, just go home (prevents build explosions)
  if (!url || !serviceKey) {
    redirect("/");
  }

  const supabase = createClient(url, serviceKey);

  const { data, error } = await supabase
    .from("Event")
    .select("id")
    .eq("slug", params.slug)
    .limit(1)
    .single();

  if (error || !data?.id) {
    redirect("/"); // or a nicer 404
  }

  redirect(`/guest/${data.id}/rsvp`);
}
