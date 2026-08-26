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

const errors = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const validateForm = () => {
  let isValid = true
  errors.value = { name: '', email: '', phone: '', subject: '', message: '' }

  if (!name.value.trim()) {
    errors.value.name = 'Adınız Soyadınız alanı zorunludur.'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value.trim()) {
    errors.value.email = 'E-posta adresiniz zorunludur.'
    isValid = false
  } else if (!emailRegex.test(email.value)) {
    errors.value.email = 'Lütfen geçerli bir e-posta adresi girin.'
    isValid = false
  }

  if (!message.value.trim()) {
    errors.value.message = 'Mesaj alanı zorunludur.'
    isValid = false
  } else if (message.value.trim().length < 10) {
    errors.value.message = 'Mesajınız en az 10 karakter olmalıdır.'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  // Rate-limiting check
  if (typeof window !== 'undefined') {
    const lastSubmit = localStorage.getItem('last_contact_submission')
    if (lastSubmit) {
      const diff = Date.now() - parseInt(lastSubmit, 10)
      if (diff < 60000) {
        errorMsg.value = 'Lütfen yeni bir mesaj göndermeden önce 1 dakika bekleyin.'
        return
      }
    }
  }

  isLoading.value = true
  successMsg.value = ''
  errorMsg.value = ''

  try {
    const { error } = await supabase.from('contact_messages').insert({
      name: name.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim() || null,
      subject: subject.value.trim() || null,
      message: message.value.trim(),
      is_read: false
    } as any)

    if (error) {
      errorMsg.value = 'Mesajınız iletilemedi: ' + error.message
    } else {
      successMsg.value = 'Mesajınız iletilmiştir. En kısa sürede sizinle iletişime geçeceğim.'
      if (typeof window !== 'undefined') {
        localStorage.setItem('last_contact_submission', Date.now().toString())
      }
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
  <div class="py-16 space-y-20 bg-slate-950 text-white min-h-screen">
    <!-- Header Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
          <UIcon name="i-heroicons-envelope" class="w-4 h-4" />
          <span>Bize Ulaşın</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
          Birlikte Yeni Başarılar İnşa Edelim
        </h1>

        <p class="text-base sm:text-lg text-slate-400 leading-relaxed font-sans font-light">
          Aklınızdaki projeleri hayata geçirmek, kurumsal eğitim ortaklığı veya seans detaylarını görüşmek için formu doldurabilirsiniz.
        </p>
      </div>
    </section>

    <!-- Main Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <!-- Left Side: Contact details -->
        <div class="lg:col-span-5 space-y-8">
          <div class="bg-slate-900/90 border border-slate-800 rounded-[32px] p-8 sm:p-10 space-y-8 shadow-2xl">
            <h2 class="text-xl font-bold text-white font-serif">
              İletişim Bilgileri
            </h2>

            <div class="space-y-6 text-sm">
              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5" />
                </div>
                <div>
                  <span class="block font-bold text-white">E-posta Adresi</span>
                  <a href="mailto:info@anilerdogan.com" class="text-xs text-slate-400 hover:text-cyan-300">
                    {{ siteSettingsData.contactInfo.email }}
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <UIcon name="i-heroicons-phone" class="w-5 h-5" />
                </div>
                <div>
                  <span class="block font-bold text-white">Telefon / WhatsApp</span>
                  <a href="tel:+905320000000" class="text-xs text-slate-400 hover:text-cyan-300">
                    {{ siteSettingsData.contactInfo.phone }}
                  </a>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                  <UIcon name="i-heroicons-map-pin" class="w-5 h-5" />
                </div>
                <div>
                  <span class="block font-bold text-white">Lokasyon</span>
                  <span class="block text-xs text-slate-400">
                    {{ siteSettingsData.contactInfo.address }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Side: Contact Form -->
        <div class="lg:col-span-7">
          <div class="bg-slate-900/90 border border-slate-800 rounded-[32px] p-8 sm:p-10 space-y-6 shadow-2xl">
            <h2 class="text-xl font-bold text-white font-serif">
              Hızlı İletişim Formu
            </h2>

            <Transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="opacity-0 translate-y-[-10px]"
              enter-to-class="opacity-100 translate-y-0"
            >
              <div v-if="successMsg" class="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl flex items-start space-x-3 text-xs">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 shrink-0 mt-0.5 text-emerald-400" />
                <span>{{ successMsg }}</span>
              </div>
              <div v-else-if="errorMsg" class="p-4 bg-rose-500/10 border border-rose-500/30 text-rose-300 rounded-2xl flex items-start space-x-3 text-xs">
                <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 shrink-0 mt-0.5 text-rose-400" />
                <span>{{ errorMsg }}</span>
              </div>
            </Transition>

            <form class="space-y-5" @submit.prevent="handleSubmit">
              <!-- Name -->
              <div class="space-y-1">
                <label for="name" class="block text-xs font-semibold text-slate-400">Adınız Soyadınız *</label>
                <UInput
                  id="name"
                  v-model="name"
                  required
                  placeholder="Ahmet Yılmaz"
                  icon="i-heroicons-user"
                  class="rounded-xl bg-slate-950 border-slate-800 text-white"
                  :disabled="isLoading"
                />
                <p v-if="errors.name" class="text-[10px] text-red-400 font-medium">{{ errors.name }}</p>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Email -->
                <div class="space-y-1">
                  <label for="email" class="block text-xs font-semibold text-slate-400">E-posta Adresiniz *</label>
                  <UInput
                    id="email"
                    v-model="email"
                    type="email"
                    required
                    placeholder="ahmet@sirket.com"
                    icon="i-heroicons-envelope"
                    class="rounded-xl bg-slate-950 border-slate-800 text-white"
                    :disabled="isLoading"
                  />
                  <p v-if="errors.email" class="text-[10px] text-red-400 font-medium">{{ errors.email }}</p>
                </div>

                <!-- Phone -->
                <div class="space-y-1">
                  <label for="phone" class="block text-xs font-semibold text-slate-400">Telefon Numaranız</label>
                  <UInput
                    id="phone"
                    v-model="phone"
                    placeholder="+90 532 000 00 00"
                    icon="i-heroicons-phone"
                    class="rounded-xl bg-slate-950 border-slate-800 text-white"
                    :disabled="isLoading"
                  />
                </div>
              </div>

              <!-- Subject -->
              <div class="space-y-1">
                <label for="subject" class="block text-xs font-semibold text-slate-400">Konu</label>
                <UInput
                  id="subject"
                  v-model="subject"
                  placeholder="Yönetici Koçluğu / Kurumsal Eğitim"
                  icon="i-heroicons-chat-bubble-left-right"
                  class="rounded-xl bg-slate-950 border-slate-800 text-white"
                  :disabled="isLoading"
                />
              </div>

              <!-- Message -->
              <div class="space-y-1">
                <label for="message" class="block text-xs font-semibold text-slate-400">Mesajınız *</label>
                <UTextarea
                  id="message"
                  v-model="message"
                  required
                  rows="4"
                  placeholder="İhtiyaçlarınız ve hedefleriniz hakkında kısa bilgi verin..."
                  class="rounded-xl bg-slate-950 border-slate-800 text-white"
                  :disabled="isLoading"
                />
                <p v-if="errors.message" class="text-[10px] text-red-400 font-medium">{{ errors.message }}</p>
              </div>

              <!-- Submit -->
              <UButton
                type="submit"
                color="primary"
                block
                size="lg"
                :loading="isLoading"
                class="rounded-full py-3.5 font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:scale-[1.02] transition-all justify-center"
              >
                Mesajı Gönder
              </UButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
