import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SlugPage({ params }: { params: { slug: string } }) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE!; // server-side only
  if (!url || !key) redirect("/");

  const supabase = createClient(url, key);
  const { data, error } = await supabase
    .from("Event")
    .select("id")
    .eq("slug", params.slug)
    .maybeSingle();

  if (error || !data) redirect("/"); // or show a 404 page
  redirect(`/guest/${data.id}/rsvp`);
}
