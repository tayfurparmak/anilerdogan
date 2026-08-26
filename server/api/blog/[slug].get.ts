import { serverSupabaseClient } from '#supabase/server'
import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Geçersiz URL adresi (slug).'
    })
  }

  try {
    if (prisma) {
      const post = await prisma.blogPost.findUnique({
        where: { slug, isPublished: true }
      })
      if (post) {
        const related = await prisma.blogPost.findMany({
          where: { isPublished: true, category: post.category || undefined, NOT: { id: post.id } },
          take: 3,
          orderBy: { publishedAt: 'desc' }
        })
        return { success: true, data: post, related }
      }
    }

    const client = await serverSupabaseClient(event)
    const { data: post, error } = await client
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle()

    if (error) throw error
    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Aranan blog makalesi bulunamadı.'
      })
    }

    const { data: related } = await client
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .neq('id', post.id)
      .limit(3)

    return {
      success: true,
      data: post,
      related: related || []
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Makale detayı yüklenirken hata oluştu: ' + error.message
    })
  }
})
