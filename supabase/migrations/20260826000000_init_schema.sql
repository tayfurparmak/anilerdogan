-- 1. Helper trigger function to update updated_at timestamp automatically
create or replace function handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- ==========================================
-- 2. Table Definitions & Constraints
-- ==========================================

-- PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text not null,
  title text,
  short_bio text,
  bio text,
  profile_image text,
  phone text,
  email text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- EDUCATIONS
create table if not exists educations (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  institution text not null,
  description text,
  start_date date,
  end_date date,
  certificate_url text,
  image_url text,
  sort_order integer default 0 not null,
  is_published boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SERVICES
create table if not exists services (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  short_description text,
  description text,
  image_url text,
  icon text,
  sort_order integer default 0 not null,
  is_published boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- BLOG POSTS
create table if not exists blog_posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,
  cover_image text,
  category text,
  tags text[],
  seo_title text,
  seo_description text,
  is_published boolean default true not null,
  published_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TESTIMONIALS
create table if not exists testimonials (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  position text,
  company text,
  content text,
  image_url text,
  sort_order integer default 0 not null,
  is_published boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CONTACT MESSAGES (No updated_at needed as it's read-only log)
create table if not exists contact_messages (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  is_read boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SOCIAL LINKS
create table if not exists social_links (
  id uuid default gen_random_uuid() primary key,
  platform text not null,
  url text not null,
  icon text,
  sort_order integer default 0 not null,
  is_visible boolean default true not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- SITE SETTINGS (Single row constraint check)
create table if not exists site_settings (
  id integer primary key default 1 check (id = 1),
  site_name text not null,
  site_description text,
  logo text,
  favicon text,
  default_seo_title text,
  default_seo_description text,
  default_og_image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- MEDIA
create table if not exists media (
  id uuid default gen_random_uuid() primary key,
  file_name text not null,
  file_path text not null,
  public_url text not null,
  mime_type text,
  file_size integer,
  alt_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- 3. Triggers for updated_at
-- ==========================================
create trigger trigger_profiles_updated_at before update on profiles for each row execute procedure handle_updated_at();
create trigger trigger_educations_updated_at before update on educations for each row execute procedure handle_updated_at();
create trigger trigger_services_updated_at before update on services for each row execute procedure handle_updated_at();
create trigger trigger_blog_posts_updated_at before update on blog_posts for each row execute procedure handle_updated_at();
create trigger trigger_testimonials_updated_at before update on testimonials for each row execute procedure handle_updated_at();
create trigger trigger_social_links_updated_at before update on social_links for each row execute procedure handle_updated_at();
create trigger trigger_site_settings_updated_at before update on site_settings for each row execute procedure handle_updated_at();

-- ==========================================
-- 4. Indexes for query optimization
-- ==========================================
create index if not exists idx_services_slug on services(slug);
create index if not exists idx_services_published on services(is_published);
create index if not exists idx_educations_published on educations(is_published);
create index if not exists idx_blog_posts_slug on blog_posts(slug);
create index if not exists idx_blog_posts_published on blog_posts(is_published);
create index if not exists idx_blog_posts_published_at on blog_posts(published_at);
create index if not exists idx_testimonials_published on testimonials(is_published);
create index if not exists idx_social_links_visible on social_links(is_visible);
create index if not exists idx_contact_messages_created_at on contact_messages(created_at);

-- ==========================================
-- 5. Row Level Security (RLS) Policies
-- ==========================================

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table educations enable row level security;
alter table services enable row level security;
alter table blog_posts enable row level security;
alter table testimonials enable row level security;
alter table contact_messages enable row level security;
alter table social_links enable row level security;
alter table site_settings enable row level security;
alter table media enable row level security;

-- PROFILES Policies
create policy "Allow public read-only profiles" on profiles for select using (true);
create policy "Allow authenticated admin full CRUD profiles" on profiles for all to authenticated using (true) with check (true);

-- EDUCATIONS Policies
create policy "Allow public read-only published educations" on educations for select using (is_published = true);
create policy "Allow authenticated admin full CRUD educations" on educations for all to authenticated using (true) with check (true);

-- SERVICES Policies
create policy "Allow public read-only published services" on services for select using (is_published = true);
create policy "Allow authenticated admin full CRUD services" on services for all to authenticated using (true) with check (true);

-- BLOG POSTS Policies
create policy "Allow public read-only published blog posts" on blog_posts for select using (is_published = true);
create policy "Allow authenticated admin full CRUD blog posts" on blog_posts for all to authenticated using (true) with check (true);

-- TESTIMONIALS Policies
create policy "Allow public read-only published testimonials" on testimonials for select using (is_published = true);
create policy "Allow authenticated admin full CRUD testimonials" on testimonials for all to authenticated using (true) with check (true);

-- CONTACT MESSAGES Policies (Public can insert, admin can do everything, no public read)
create policy "Allow public insert contact messages" on contact_messages for insert to public with check (true);
create policy "Allow authenticated admin full CRUD contact messages" on contact_messages for all to authenticated using (true) with check (true);

-- SOCIAL LINKS Policies
create policy "Allow public read-only visible social links" on social_links for select using (is_visible = true);
create policy "Allow authenticated admin full CRUD social links" on social_links for all to authenticated using (true) with check (true);

-- SITE SETTINGS Policies
create policy "Allow public read-only site settings" on site_settings for select using (true);
create policy "Allow authenticated admin full CRUD site settings" on site_settings for all to authenticated using (true) with check (true);

-- MEDIA Policies
create policy "Allow public read-only media" on media for select using (true);
create policy "Allow authenticated admin full CRUD media" on media for all to authenticated using (true) with check (true);
