-- Create the website-media storage bucket
insert into storage.buckets (id, name, public)
values ('website-media', 'website-media', true)
on conflict (id) do nothing;

-- Enable RLS on storage.objects if it is not already
alter table storage.objects enable row level security;

-- Drop existing policies on storage.objects for website-media bucket if any
drop policy if exists "Allow public read-only website-media" on storage.objects;
drop policy if exists "Allow authenticated admin full CRUD website-media" on storage.objects;

-- Create policies for public access (select)
create policy "Allow public read-only website-media"
on storage.objects for select
using (bucket_id = 'website-media');

-- Create policies for authenticated admin full CRUD (insert/update/delete)
create policy "Allow authenticated admin full CRUD website-media"
on storage.objects for all
to authenticated
using (bucket_id = 'website-media')
with check (bucket_id = 'website-media');
