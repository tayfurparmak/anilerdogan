-- Hardening RLS policies to restrict full CRUD access ONLY to the admin email 'info@anilerdogan.com'

-- 1. Profiles
drop policy if exists "Allow authenticated admin full CRUD profiles" on profiles;
create policy "Allow authenticated admin full CRUD profiles" on profiles
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 2. Educations
drop policy if exists "Allow authenticated admin full CRUD educations" on educations;
create policy "Allow authenticated admin full CRUD educations" on educations
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 3. Services
drop policy if exists "Allow authenticated admin full CRUD services" on services;
create policy "Allow authenticated admin full CRUD services" on services
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 4. Blog Posts
drop policy if exists "Allow authenticated admin full CRUD blog posts" on blog_posts;
create policy "Allow authenticated admin full CRUD blog posts" on blog_posts
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 5. Testimonials
drop policy if exists "Allow authenticated admin full CRUD testimonials" on testimonials;
create policy "Allow authenticated admin full CRUD testimonials" on testimonials
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 6. Contact Messages
drop policy if exists "Allow authenticated admin full CRUD contact messages" on contact_messages;
create policy "Allow authenticated admin full CRUD contact messages" on contact_messages
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 7. Social Links
drop policy if exists "Allow authenticated admin full CRUD social links" on social_links;
create policy "Allow authenticated admin full CRUD social links" on social_links
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 8. Site Settings
drop policy if exists "Allow authenticated admin full CRUD site settings" on site_settings;
create policy "Allow authenticated admin full CRUD site settings" on site_settings
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 9. Media
drop policy if exists "Allow authenticated admin full CRUD media" on media;
create policy "Allow authenticated admin full CRUD media" on media
  for all to authenticated
  using (auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (auth.jwt() ->> 'email' = 'info@anilerdogan.com');

-- 10. Storage Objects for website-media bucket
drop policy if exists "Allow authenticated admin full CRUD website-media" on storage.objects;
create policy "Allow authenticated admin full CRUD website-media" on storage.objects
  for all to authenticated
  using (bucket_id = 'website-media' and auth.jwt() ->> 'email' = 'info@anilerdogan.com')
  with check (bucket_id = 'website-media' and auth.jwt() ->> 'email' = 'info@anilerdogan.com');
