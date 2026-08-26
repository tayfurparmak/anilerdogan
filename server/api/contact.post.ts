import { serverSupabaseClient } from '#supabase/server'
import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { name, email, phone, subject, message } = body || {}

  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw createError({ statusCode: 400, statusMessage: 'Lütfen geçerli bir ad soyad giriniz.' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Lütfen geçerli bir e-posta adresi giriniz.' })
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    throw createError({ statusCode: 400, statusMessage: 'Mesajınız en az 10 karakter olmalıdır.' })
  }

  try {
    if (prisma) {
      const newMessage = await prisma.contactMessage.create({
        data: {
          name: name.trim(),
          email: email.trim(),
          phone: phone ? phone.trim() : null,
          subject: subject ? subject.trim() : null,
          message: message.trim(),
          isRead: false
        }
      })
      return { success: true, message: 'Mesajınız iletildi.', id: newMessage.id }
    }

    const client = await serverSupabaseClient(event)
    const { data, error } = await client
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone ? phone.trim() : null,
        subject: subject ? subject.trim() : null,
        message: message.trim(),
        is_read: false
      })
      .select()
      .single()

    if (error) throw error
    return { success: true, message: 'Mesajınız iletildi.', id: data?.id }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Mesaj kaydedilirken hata oluştu: ' + error.message
    })
  }
})
