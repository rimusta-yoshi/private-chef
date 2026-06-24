create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  event_date date not null,
  guest_count integer not null,
  event_type text,
  notes text,
  status text not null default 'pending', -- pending | confirmed | cancelled
  stripe_checkout_session_id text,
  deposit_paid boolean not null default false,
  created_at timestamptz not null default now()
);
