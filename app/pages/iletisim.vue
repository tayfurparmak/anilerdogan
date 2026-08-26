<script setup lang="ts">
import { ref } from 'vue'
import { siteSettingsData } from '~/data/mockData'
import { useSeo } from '~/composables/useSeo'

useSeo(
  'İletişim',
  'Bireysel seans talepleri, kurumsal eğitim ortaklıkları ve sorularınız için Anıl Erdoğan ile iletişime geçin.'
)

const supabase = useSupabaseClient()

// Form fields refs
const name = ref('')
const email = ref('')
const phone = ref('')
const subject = ref('')
const message = ref('')

const isLoading = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

// Field specific validation errors
const errors = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

// Validation helper
const validateForm = () => {
  let isValid = true
  errors.value = { name: '', email: '', phone: '', subject: '', message: '' }

  // Name check
  if (!name.value.trim()) {
    errors.value.name = 'Adınız Soyadınız alanı zorunludur.'
    isValid = false
  }

  // Email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.value.email = 'E-posta adresiniz zorunludur.'
    isValid = false
  } else if (!emailRegex.test(email.value)) {
    errors.value.email = 'Lütfen geçerli bir e-posta adresi girin.'
    isValid = false
  }

  // Phone check (optional but validated if provided)
  if (phone.value.trim() && phone.value.trim().length < 7) {
    errors.value.phone = 'Geçersiz telefon numarası.'
    isValid = false
  }

  // Subject check
  if (!subject.value.trim()) {
    errors.value.subject = 'Konu başlığı zorunludur.'
    isValid = false
  }

  // Message check
  const msgLen = message.value.trim().length
  if (msgLen < 10) {
    errors.value.message = 'Mesajınız en az 10 karakter olmalıdır.'
    isValid = false
  } else if (msgLen > 1000) {
    errors.value.message = 'Mesajınız en fazla 1000 karakter olabilir.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  successMsg.value = ''
  errorMsg.value = ''

  if (!validateForm()) {
    errorMsg.value = 'Lütfen formdaki hataları giderin.'
    return
  }

  // Spam / Rate limiting check using localStorage
  if (typeof window !== 'undefined') {
    const lastSubmit = localStorage.getItem('last_contact_submission')
    if (lastSubmit) {
      const elapsed = Date.now() - parseInt(lastSubmit, 10)
      if (elapsed < 60000) {
        const remaining = Math.ceil((60000 - elapsed) / 1000)
        errorMsg.value = `Çok sık mesaj gönderiyorsunuz. Lütfen ${remaining} saniye sonra tekrar deneyin.`
        return
      }
    }
  }

  isLoading.value = true

  try {
    const { error } = await supabase.from('contact_messages').insert({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim() || null,
      subject: subject.value.trim(),
      message: message.value.trim(),
      is_read: false
    } as any)

    if (error) {
      errorMsg.value = 'Mesajınız iletilemedi: ' + error.message
    } else {
      successMsg.value = 'Mesajınız başarıyla iletilmiştir. En kısa sürede geri dönüş sağlayacağım.'
      
      // Save last submission timestamp
      if (typeof window !== 'undefined') {
        localStorage.setItem('last_contact_submission', Date.now().toString())
      }

      // Reset fields on success
      name.value = ''
      email.value = ''
      phone.value = ''
      subject.value = ''
      message.value = ''
    }
  } catch (err: any) {
    errorMsg.value = 'Beklenmeyen bir bağlantı hatası oluştu.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="py-12 space-y-20">
    <!-- Header Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Bize Ulaşın</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif leading-tight">
          Birlikte Yeni Başarılar İnşa Edelim
        </h1>

        <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
          Aklınızdaki projeleri hayata geçirmek, kurumsal eğitim ortaklığı kurmak veya seans detaylarını görüşmek için formu doldurabilirsiniz.
        </p>
      </div>
    </section>

    <!-- Main Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left Side: Contact details -->
        <div class="lg:col-span-5 space-y-8">
          <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 space-y-8">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white font-serif">
              İletişim Bilgileri
            </h2>

            <div class="space-y-6 text-sm">
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                </div>
                <div>
                  <span class="block font-bold text-slate-900 dark:text-white">E-posta Adresi</span>
                  <a href="mailto:info@anilerdogan.com" class="text-xs text-slate-500 dark:text-slate-400 hover:underline">
                    {{ siteSettingsData.contactInfo.email }}
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-heroicons-phone" class="w-5 h-5" />
                </div>
                <div>
                  <span class="block font-bold text-slate-900 dark:text-white">Telefon / WhatsApp</span>
                  <a href="tel:+905320000000" class="text-xs text-slate-500 dark:text-slate-400 hover:underline">
                    {{ siteSettingsData.contactInfo.phone }}
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5" />
                </div>
                <div>
                  <span class="block font-bold text-slate-900 dark:text-white">Lokasyon</span>
                  <span class="block text-xs text-slate-500 dark:text-slate-400">
                    {{ siteSettingsData.contactInfo.address }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Contact Form -->
        <div class="lg:col-span-7">
          <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 space-y-6 shadow-sm">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white font-serif">
              Hızlı İletişim Formu
            </h2>

            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-[-10px]"
              enter-to-class="opacity-100 translate-y-0"
            >
              <div v-if="successMsg" class="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-start space-x-3 text-xs">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 shrink-0 mt-0.5" />
                <span>{{ successMsg }}</span>
              </div>
              <div v-else-if="errorMsg" class="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-start space-x-3 text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 shrink-0 mt-0.5" />
                <span>{{ errorMsg }}</span>
              </div>
            </Transition>

            <form class="space-y-5" @submit.prevent="handleSubmit">
              <!-- Name -->
              <div class="space-y-1">
                <label for="name" class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Adınız Soyadınız *</label>
                <UInput
                  id="name"
                  v-model="name"
                  required
                  placeholder="Ahmet Yılmaz"
                  icon="i-heroicons-user"
                  class="rounded-lg"
                  :disabled="isLoading"
                />
                <p v-if="errors.name" class="text-[10px] text-red-500 font-medium">{{ errors.name }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Email -->
                <div class="space-y-1">
                  <label for="email" class="block text-xs font-semibold text-slate-600 dark:text-slate-400">E-posta Adresiniz *</label>
                  <UInput
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    placeholder="ahmet@sirket.com"
                    icon="i-heroicons-envelope"
                    class="rounded-lg"
                    :disabled="isLoading"
                  />
                  <p v-if="errors.email" class="text-[10px] text-red-500 font-medium">{{ errors.email }}</p>
                </div>

                <!-- Phone -->
                <div class="space-y-1">
                  <label for="phone" class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Telefon Numaranız</label>
                  <UInput
                    id="phone"
                    v-model="phone"
                    placeholder="0532 XXXXXXX"
                    icon="i-heroicons-phone"
                    class="rounded-lg"
                    :disabled="isLoading"
                  />
                  <p v-if="errors.phone" class="text-[10px] text-red-500 font-medium">{{ errors.phone }}</p>
                </div>
              </div>

              <!-- Subject -->
              <div class="space-y-1">
                <label for="subject" class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Konu *</label>
                <UInput
                  id="subject"
                  v-model="subject"
                  required
                  placeholder="Örn: Kurumsal Danışmanlık Talebi"
                  icon="i-heroicons-chat-bubble-bottom-center-text"
                  class="rounded-lg"
                  :disabled="isLoading"
                />
                <p v-if="errors.subject" class="text-[10px] text-red-500 font-medium">{{ errors.subject }}</p>
              </div>

              <!-- Message -->
              <div class="space-y-1">
                <label for="msg" class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Mesajınız *</label>
                <UTextarea
                  id="msg"
                  v-model="message"
                  required
                  placeholder="Seans veya eğitim detayları hakkında mesajınızı yazın..."
                  class="rounded-lg w-full"
                  rows="5"
                  :disabled="isLoading"
                />
                <div class="flex justify-between items-center text-[10px] text-slate-400">
                  <p v-if="errors.message" class="text-red-500 font-medium">{{ errors.message }}</p>
                  <p v-else></p>
                  <span>{{ message.length }}/1000 karakter</span>
                </div>
              </div>

              <!-- Submit -->
              <UButton
                type="submit"
                color="emerald"
                block
                size="lg"
                :loading="isLoading"
                class="rounded-full py-4 font-semibold text-base"
              >
                Mesaj Gönder
              </UButton>
            </form>
          </div>
        </div>

      </div>
    </section>
  </div>
</template>
