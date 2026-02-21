-- WedWyze Database Schema
-- Run this in your Supabase SQL editor

-- Profiles table (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  email TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'couple' CHECK (role IN ('couple', 'guest', 'planner')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Weddings table
CREATE TABLE weddings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  couple_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  date DATE,
  venue TEXT,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Guests table
CREATE TABLE guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  rsvp_status TEXT NOT NULL DEFAULT 'pending' CHECK (rsvp_status IN ('pending', 'attending', 'declined', 'maybe')),
  dietary_notes TEXT,
  plus_ones INTEGER NOT NULL DEFAULT 0,
  table_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RSVP Responses table
CREATE TABLE rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  guest_id UUID REFERENCES guests(id) ON DELETE CASCADE NOT NULL,
  wedding_id UUID REFERENCES weddings(id) ON DELETE CASCADE NOT NULL,
  attending BOOLEAN NOT NULL DEFAULT true,
  meal_choice TEXT,
  message TEXT,
  responded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_weddings_couple_id ON weddings(couple_id);
CREATE INDEX idx_weddings_slug ON weddings(slug);
CREATE INDEX idx_guests_wedding_id ON guests(wedding_id);
CREATE INDEX idx_rsvp_responses_wedding_id ON rsvp_responses(wedding_id);
CREATE INDEX idx_rsvp_responses_guest_id ON rsvp_responses(guest_id);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE weddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE guests ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read/update their own profile
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Weddings: owners can CRUD, anyone can read by slug (for public RSVP pages)
CREATE POLICY "Owners can manage their weddings" ON weddings FOR ALL USING (auth.uid() = couple_id);
CREATE POLICY "Anyone can view wedding by slug" ON weddings FOR SELECT USING (true);

-- Guests: wedding owners can manage, public can view for RSVP
CREATE POLICY "Wedding owners can manage guests" ON guests FOR ALL
  USING (EXISTS (SELECT 1 FROM weddings WHERE weddings.id = guests.wedding_id AND weddings.couple_id = auth.uid()));
CREATE POLICY "Anyone can view guests for RSVP" ON guests FOR SELECT USING (true);
CREATE POLICY "Anyone can update guest RSVP status" ON guests FOR UPDATE USING (true);

-- RSVP Responses: wedding owners can view, anyone can insert (for public RSVP)
CREATE POLICY "Wedding owners can view RSVPs" ON rsvp_responses FOR SELECT
  USING (EXISTS (SELECT 1 FROM weddings WHERE weddings.id = rsvp_responses.wedding_id AND weddings.couple_id = auth.uid()));
CREATE POLICY "Anyone can submit RSVP" ON rsvp_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can view own RSVP" ON rsvp_responses FOR SELECT USING (true);

-- Function to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on auth signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Helper function to generate unique slug
CREATE OR REPLACE FUNCTION generate_wedding_slug(wedding_name TEXT)
RETURNS TEXT AS $$
DECLARE
  base_slug TEXT;
  final_slug TEXT;
  counter INTEGER := 0;
BEGIN
  base_slug := lower(regexp_replace(wedding_name, '[^a-zA-Z0-9]+', '-', 'g'));
  base_slug := trim(both '-' from base_slug);
  final_slug := base_slug;

  WHILE EXISTS (SELECT 1 FROM weddings WHERE slug = final_slug) LOOP
    counter := counter + 1;
    final_slug := base_slug || '-' || counter;
  END LOOP;

  RETURN final_slug;
END;
$$ LANGUAGE plpgsql;
