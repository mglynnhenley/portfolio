# Supabase Setup for Shared Flower Garden

## 1. Create Supabase Project

1. Go to https://app.supabase.com
2. Create a new project
3. Wait for database to provision

## 2. Create Database Schema

Run this SQL in the Supabase SQL Editor:

```sql
-- Create flowers table
create table flowers (
  id uuid default gen_random_uuid() primary key,
  x1 numeric not null,
  y1 numeric not null,
  x2 numeric not null,
  y2 numeric not null,
  color text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table flowers enable row level security;

-- Allow anyone to read flowers
create policy "Allow public read access"
  on flowers for select
  using (true);

-- Allow anyone to insert flowers
create policy "Allow public insert access"
  on flowers for insert
  with check (true);

-- Allow anyone to delete old flowers (for the 30-minute cleanup)
create policy "Allow public delete access"
  on flowers for delete
  using (true);

-- Enable Realtime
alter publication supabase_realtime add table flowers;

-- Create function to delete old flowers (called every 30 minutes)
create or replace function delete_old_flowers()
returns void as $$
begin
  delete from flowers
  where created_at < now() - interval '30 minutes';
end;
$$ language plpgsql security definer;

-- Create a periodic job to clear flowers every 30 minutes
-- Note: This requires pg_cron extension
select cron.schedule(
  'clear-flowers',
  '*/30 * * * *',  -- Every 30 minutes
  $$select delete_old_flowers()$$
);
```

## 3. Get API Keys

1. Go to Project Settings > API
2. Copy your project URL
3. Copy your `anon` public key

## 4. Add Environment Variables

Create `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

## 5. Enable pg_cron (Optional - for auto-cleanup)

If pg_cron is not enabled:
1. Go to Database > Extensions
2. Search for "pg_cron"
3. Enable it

Alternatively, you can set up a webhook to call the delete function from an external cron service like Vercel Cron or GitHub Actions.

## Features

- **Shared Garden:** All flowers are synced across all users in real-time
- **Persistence:** Flowers persist across page refreshes
- **Auto-Clear:** All flowers are automatically deleted every 30 minutes
- **Real-time Updates:** When anyone clicks to add a flower, it appears for everyone immediately
