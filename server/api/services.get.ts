import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const services = await prisma.service.findMany({
      where: {
        isPublished: true
      },
      orderBy: {
        sortOrder: 'asc'
      }
    })

    return {
      success: true,
      data: services
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Hizmetler yüklenirken bir veritabanı hatası oluştu: ' + error.message
    })
  }
})
