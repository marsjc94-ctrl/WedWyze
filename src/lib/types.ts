export interface Wedding {
  id: string;
  couple_id: string;
  name: string;
  date: string | null;
  venue: string | null;
  slug: string;
  description: string | null;
  created_at: string;
}

export interface Profile {
  id: string;
  display_name: string | null;
  email: string;
  avatar_url: string | null;
  role: "couple" | "guest" | "planner";
  created_at: string;
}

export interface Guest {
  id: string;
  wedding_id: string;
  name: string;
  email: string | null;
  rsvp_status: "pending" | "attending" | "declined" | "maybe";
  dietary_notes: string | null;
  plus_ones: number;
  table_number: string | null;
  created_at: string;
}

export interface RsvpResponse {
  id: string;
  guest_id: string;
  wedding_id: string;
  attending: boolean;
  meal_choice: string | null;
  message: string | null;
  responded_at: string;
}
