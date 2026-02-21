-- Medway Soup Kitchen CIC - Supabase Database Schema
-- Run these commands in the Supabase SQL Editor

-- Volunteer sign-ups
CREATE TABLE volunteers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  roles TEXT[] NOT NULL DEFAULT '{}',
  availability TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Contact form submissions
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Donation interest / pledges (not payment processing — just logging intent)
CREATE TABLE donation_pledges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  amount_tier TEXT NOT NULL CHECK (amount_tier IN ('5', '40', '160', 'custom')),
  custom_amount NUMERIC,
  frequency TEXT DEFAULT 'one-off' CHECK (frequency IN ('one-off', 'monthly')),
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter subscribers
CREATE TABLE newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed BOOLEAN DEFAULT true,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMPTZ DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);

-- Enable Row Level Security on all tables
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE donation_pledges ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Policies: allow inserts from anon (public forms), restrict reads to service role only
CREATE POLICY "Allow public inserts" ON volunteers FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts" ON donation_pledges FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public inserts" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Index for faster email lookups (for rate limiting)
CREATE INDEX idx_volunteers_email ON volunteers(email);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);
CREATE INDEX idx_donation_pledges_email ON donation_pledges(email);
CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);

-- Index for created_at lookups (for rate limiting)
CREATE INDEX idx_volunteers_created_at ON volunteers(created_at);
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions(created_at);
CREATE INDEX idx_donation_pledges_created_at ON donation_pledges(created_at);
