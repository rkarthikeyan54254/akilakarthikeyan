/*
  # Create comments table for stories

  1. New Tables
    - `comments`
      - `id` (uuid, primary key) - Unique identifier
      - `story_slug` (text) - References the story slug
      - `author_name` (text) - Commenter's name
      - `content` (text) - Comment text
      - `created_at` (timestamptz) - Timestamp
      - `approved` (boolean) - Admin approval flag (default false)

  2. Security
    - Enable RLS on `comments` table
    - Policy for anyone to read approved comments
    - Policy for anyone to insert comments (pending approval)

  3. Indexes
    - Index on story_slug for faster queries
    - Index on approved status
*/

CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  story_slug text NOT NULL,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  approved boolean DEFAULT false
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read approved comments"
  ON comments
  FOR SELECT
  USING (approved = true);

CREATE POLICY "Anyone can insert comments"
  ON comments
  FOR INSERT
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_comments_story_slug ON comments(story_slug);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);