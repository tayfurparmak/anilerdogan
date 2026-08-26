import prisma from '../utils/prisma'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, email, phone, subject, message } = body || {}

  // Validations
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Lütfen geçerli bir ad soyad giriniz.'
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email || !emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Lütfen geçerli bir e-posta adresi giriniz.'
    })
  }

  if (!message || typeof message !== 'string' || message.trim().length < 10) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Mesajınız en az 10 karakter olmalıdır.'
    })
  }

  if (message.trim().length > 2000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Mesajınız en fazla 2000 karakter olabilir.'
    })
  }

  try {
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

    return {
      success: true,
      message: 'Mesajınız başarıyla iletildi. En kısa sürede sizinle iletişime geçeceğim.',
      id: newMessage.id
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Mesaj kaydedilirken veritabanı hatası oluştu: ' + error.message
    })
  }
})
