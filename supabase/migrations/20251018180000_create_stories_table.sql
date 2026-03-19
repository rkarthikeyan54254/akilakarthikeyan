-- Stories Table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  excerpt text,
  author text DEFAULT 'அகிலா கார்த்திகேயன்',
  genre text NOT NULL CHECK (genre IN ('நகைச்சுவை', 'நாடகம்', 'ஆன்மீகம்', 'சமூகம்', 'அனுபவம்', 'குடும்பம்')),
  image_url text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Storage for Images
INSERT INTO storage.buckets (id, name, public) VALUES ('story-images', 'story-images', true);

-- RLS Policies
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all stories
CREATE POLICY "Public Read" ON stories FOR SELECT USING (true);

-- Allow authenticated users (admin) to insert/update/delete
CREATE POLICY "Auth Insert" ON stories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Auth Update" ON stories FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Auth Delete" ON stories FOR DELETE TO authenticated USING (true);

-- Storage Policies
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'story-images');
CREATE POLICY "Auth Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'story-images');
