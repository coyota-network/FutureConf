/*
  # Create meetings table for video conferencing

  1. New Tables
    - `meetings`
      - `id` (uuid, primary key)
      - `host_id` (uuid, references auth.users)
      - `meeting_id` (text, unique)
      - `title` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on meetings table
    - Add policies for:
      - Hosts can create and manage their meetings
      - Participants can view meeting details
*/

CREATE TABLE meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  host_id uuid REFERENCES auth.users NOT NULL,
  meeting_id text UNIQUE NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  status text DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'ended'))
);

ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;

-- Allow hosts to manage their meetings
CREATE POLICY "Hosts can manage their meetings"
  ON meetings
  FOR ALL
  TO authenticated
  USING (auth.uid() = host_id);

-- Allow anyone to view meeting details (needed for joining)
CREATE POLICY "Anyone can view meetings"
  ON meetings
  FOR SELECT
  TO authenticated
  USING (true);