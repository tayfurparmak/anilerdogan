import { defineEventHandler, setHeader } from 'h3'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
  // Retrieve public environment variables directly
  const supabaseUrl = process.env.NUXT_PUBLIC_SUPABASE_URL || 'https://iwusqqgldoqqglpkkswo.supabase.co'
  const supabaseKey = process.env.NUXT_PUBLIC_SUPABASE_ANON_KEY || ''
  
  const supabase = createClient(supabaseUrl, supabaseKey)

  // Fetch published blog posts
  const { data: blogs } = await supabase
    .from('blog_posts')
    .select('slug, updated_at')
    .eq('is_published', true)

  // Fetch published services
  const { data: services } = await supabase
    .from('services')
    .select('slug, updated_at')
    .eq('is_published', true)

  // Static URLs
  const staticUrls = [
    { loc: 'https://anilerdogan.com/', changefreq: 'daily', priority: '1.0' },
    { loc: 'https://anilerdogan.com/hakkimda', changefreq: 'monthly', priority: '0.8' },
    { loc: 'https://anilerdogan.com/danismanlik', changefreq: 'weekly', priority: '0.9' },
    { loc: 'https://anilerdogan.com/egitimler', changefreq: 'weekly', priority: '0.8' },
    { loc: 'https://anilerdogan.com/blog', changefreq: 'daily', priority: '0.9' },
    { loc: 'https://anilerdogan.com/iletisim', changefreq: 'monthly', priority: '0.7' }
  ]

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  // Add static URLs
  for (const url of staticUrls) {
    xml += '  <url>\n'
    xml += `    <loc>${url.loc}</loc>\n`
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`
    xml += `    <priority>${url.priority}</priority>\n`
    xml += '  </url>\n'
  }

  // Add blogs
  if (blogs) {
    for (const blog of blogs) {
      const date = blog.updated_at ? new Date(blog.updated_at).toISOString() : new Date().toISOString()
      xml += '  <url>\n'
      xml += `    <loc>https://anilerdogan.com/blog/${blog.slug}</loc>\n`
      xml += `    <lastmod>${date}</lastmod>\n`
      xml += '    <changefreq>weekly</changefreq>\n'
      xml += '    <priority>0.8</priority>\n'
      xml += '  </url>\n'
    }
  }

  // Add services
  if (services) {
    for (const service of services) {
      const date = service.updated_at ? new Date(service.updated_at).toISOString() : new Date().toISOString()
      xml += '  <url>\n'
      xml += `    <loc>https://anilerdogan.com/danismanlik/${service.slug}</loc>\n`
      xml += `    <lastmod>${date}</lastmod>\n`
      xml += '    <changefreq>weekly</changefreq>\n'
      xml += '    <priority>0.8</priority>\n'
      xml += '  </url>\n'
    }
  }

  xml += '</urlset>'

  setHeader(event, 'Content-Type', 'application/xml')
  return xml
})
