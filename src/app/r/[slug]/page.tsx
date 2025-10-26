import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function SlugRedirect({
  params,
}: {
  params: { slug: string };
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE;

  if (!url || !serviceKey) redirect("/");

  const supabase = createClient(url, serviceKey);
  const { data, error } = await supabase
    .from("Event")
    .select("id")
    .eq("slug", params.slug)
    .limit(1)
    .single();

  if (error || !data?.id) redirect("/");

  redirect(`/guest/${data.id}/rsvp`);
}
