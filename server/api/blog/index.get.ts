import { serverSupabaseClient } from '#supabase/server'
import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined
  const search = query.search as string | undefined
  const page = parseInt((query.page as string) || '1', 10)
  const limit = parseInt((query.limit as string) || '6', 10)
  const skip = (page - 1) * limit

  try {
    if (prisma) {
      const whereCondition: any = { isPublished: true }
      if (category && category !== 'Tümü' && category !== 'All') {
        whereCondition.category = category
      }
      if (search && search.trim() !== '') {
        whereCondition.OR = [
          { title: { contains: search, mode: 'insensitive' } },
          { excerpt: { contains: search, mode: 'insensitive' } }
        ]
      }
      const [total, posts] = await Promise.all([
        prisma.blogPost.count({ where: whereCondition }),
        prisma.blogPost.findMany({
          where: whereCondition,
          orderBy: { publishedAt: 'desc' },
          skip,
          take: limit
        })
      ])
      return {
        success: true,
        data: posts,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
      }
    }

    const client = await serverSupabaseClient(event)
    let dbQuery = client
      .from('blog_posts')
      .select('*', { count: 'exact' })
      .eq('is_published', true)
      .order('created_at', { ascending: false })
      .range(skip, skip + limit - 1)

    if (category && category !== 'Tümü' && category !== 'All') {
      dbQuery = dbQuery.eq('category', category)
    }

    if (search && search.trim() !== '') {
      dbQuery = dbQuery.ilike('title', `%${search.trim()}%`)
    }

    const { data, count, error } = await dbQuery
    if (error) throw error

    return {
      success: true,
      data: data || [],
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: Math.ceil((count || 0) / limit)
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Makaleler yüklenirken hata oluştu: ' + error.message
    })
  }
})
