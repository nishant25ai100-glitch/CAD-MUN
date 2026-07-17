-- ============================================
-- CDA MUN — Registrations Table Setup
-- Run this in Supabase SQL Editor (one time)
-- ============================================

create table registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),

  full_name text not null,
  email text not null,
  whatsapp text,
  institution text not null,

  primary_committee text not null,
  secondary_committee text,
  previous_mun_experience text,
  position_statement text,

  pass_id text unique not null,

  -- payment tracking (for later, even though collected separately for now)
  payment_status text default 'pending', -- 'pending' | 'paid' | 'waived'
  payment_reference text
);

-- Prevent duplicate registrations with same email
create unique index registrations_email_idx on registrations (email);

-- Enable Row Level Security
alter table registrations enable row level security;

-- Allow anyone (anon key) to INSERT a new registration
-- but NOT read/update/delete other people's data
create policy "Anyone can register"
  on registrations for insert
  to anon
  with check (true);

-- Only you (via Supabase dashboard / service role) can view all data
-- The anon/public key cannot SELECT — this keeps registrant data private
-- You will view registrations from the Supabase Table Editor directly

-- Allow logged-in (authenticated) users to VIEW all registrations
-- This powers the /admin page on the website
create policy "Authenticated users can view all registrations"
  on registrations for select
  to authenticated
  using (true);

-- Allow logged-in (authenticated) users to UPDATE payment status etc.
create policy "Authenticated users can update registrations"
  on registrations for update
  to authenticated
  using (true);

-- ============================================
-- After running this, create your admin login:
-- Supabase Dashboard → Authentication → Users → Add User
-- Use your own email + a strong password
-- That's the login you'll use at yoursite.com/admin
-- ============================================
