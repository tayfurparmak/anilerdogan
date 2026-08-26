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
    const post = await prisma.blogPost.findUnique({
      where: {
        slug,
        isPublished: true
      }
    })

    if (!post) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Aranan blog makalesi bulunamadı.'
      })
    }

    // Fetch related posts from same category
    const related = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        category: post.category || undefined,
        NOT: {
          id: post.id
        }
      },
      take: 3,
      orderBy: { publishedAt: 'desc' }
    })

    return {
      success: true,
      data: post,
      related
    }
  } catch (error: any) {
    if (error.statusCode) throw error
    throw createError({
      statusCode: 500,
      statusMessage: 'Makale detayı yüklenirken veritabanı hatası oluştu: ' + error.message
    })
  }
})
