import { serverSupabaseClient } from '#supabase/server'
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    if (prisma) {
      const services = await prisma.service.findMany({
        where: { isPublished: true },
        orderBy: { sortOrder: 'asc' }
      })
      return { success: true, data: services }
    }

    const client = await serverSupabaseClient(event)
    const { data, error } = await client
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })

    if (error) throw error
    return { success: true, data: data || [] }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Hizmetler yüklenirken hata oluştu: ' + error.message
    })
  }
})
