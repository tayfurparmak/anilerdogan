import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const category = query.category as string | undefined
  const search = query.search as string | undefined
  const page = parseInt((query.page as string) || '1', 10)
  const limit = parseInt((query.limit as string) || '6', 10)
  const skip = (page - 1) * limit

  try {
    const whereCondition: any = {
      isPublished: true
    }

    if (category && category !== 'Tümü' && category !== 'All') {
      whereCondition.category = category
    }

    if (search && search.trim() !== '') {
      whereCondition.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
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
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Makaleler yüklenirken bir veritabanı hatası oluştu: ' + error.message
    })
  }
})
