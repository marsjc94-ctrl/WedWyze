import { notFound } from "next/navigation";
import RsvpForm from "@/components/RsvpForm";
import { createClient } from "@/lib/supabase/server";
import { Wedding } from "@/lib/types";
import Navbar from "@/components/Navbar";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: wedding } = await supabase
    .from("weddings")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (!wedding) {
    return {
      title: "Wedding Not Found - WedWyze",
      description: "This wedding could not be found.",
    };
  }

  return {
    title: `${wedding.name} - RSVP | WedWyze`,
    description: `RSVP to ${wedding.name}'s wedding on WedWyze`,
    openGraph: {
      title: `${wedding.name} - RSVP | WedWyze`,
      description: `RSVP to ${wedding.name}'s wedding`,
    },
  };
}

export default async function RsvpPage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();

  const { data: wedding, error } = await supabase
    .from("weddings")
    .select("*")
    .eq("slug", resolvedParams.slug)
    .single();

  if (error || !wedding) {
    notFound();
  }

  const weddingData = wedding as Wedding;

  // Format date if available
  const formattedDate = weddingData.date
    ? new Date(weddingData.date).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-ivory-50 to-white">
      <Navbar />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        {/* Decorative Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-6 text-4xl">💕</div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-gold-600 mb-4">
            {weddingData.name}
          </h1>

          {/* Wedding Details */}
          <div className="space-y-3 text-gray-700 mb-8">
            {formattedDate && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <span>📅</span>
                <p>{formattedDate}</p>
              </div>
            )}
            {weddingData.venue && (
              <div className="flex items-center justify-center gap-2 text-lg">
                <span>📍</span>
                <p>{weddingData.venue}</p>
              </div>
            )}
          </div>

          {weddingData.description && (
            <p className="text-gray-600 text-lg max-w-xl mx-auto leading-relaxed">
              {weddingData.description}
            </p>
          )}
        </div>

        {/* RSVP Form Section */}
        <div className="mb-16">
          <RsvpForm weddingId={weddingData.id} />
        </div>

        {/* Decorative Footer */}
        <div className="text-center pt-12 border-t border-gold-100">
          <p className="text-gray-500 italic">
            We can't wait to celebrate with you!
          </p>
          <div className="flex justify-center gap-4 mt-6 text-2xl">
            <span>✨</span>
            <span>💍</span>
            <span>✨</span>
          </div>
        </div>
      </main>
    </div>
  );
}
