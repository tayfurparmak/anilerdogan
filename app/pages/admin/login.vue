<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSeo } from '../../composables/useSeo'

useSeo('Yönetici Girişi', 'Anıl Erdoğan Danışmanlık Yönetim Paneli Giriş Ekranı.')

const router = useRouter()
const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Lütfen e-posta ve şifrenizi girin.'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })

    if (error) {
      errorMessage.value = getReadableErrorMessage(error.message)
    } else {
      // Success, route middleware handles redirection if we do navigateTo, or router push
      router.push('/admin/dashboard')
    }
  } catch (err: any) {
    errorMessage.value = 'Beklenmedik bir hata oluştu. Lütfen bağlantınızı kontrol edin.'
  } finally {
    isLoading.value = false
  }
}

// Convert common Supabase auth messages to friendly Turkish
const getReadableErrorMessage = (msg: string) => {
  if (msg.includes('Invalid login credentials')) {
    return 'E-posta adresiniz veya şifreniz hatalı. Lütfen bilgilerinizi kontrol edin.'
  }
  if (msg.includes('Email not confirmed')) {
    return 'Lütfen e-posta adresinizi onaylayın.'
  }
  return msg || 'Giriş yapılamadı.'
}
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
    <!-- Geometric Background Decorative accents -->
    <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div class="absolute top-[20%] left-[25%] w-92 h-92 bg-emerald-500/5 dark:bg-emerald-500/2 rounded-full blur-3xl" />
      <div class="absolute bottom-[20%] right-[25%] w-92 h-92 bg-teal-500/5 dark:bg-teal-500/2 rounded-full blur-3xl" />
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-8">
      
      <!-- Logo / Branding header -->
      <div class="text-center space-y-2">
        <NuxtLink to="/" class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-serif">
          Anıl Erdoğan
        </NuxtLink>
        <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Yönetim Paneli</h1>
        <p class="text-xs text-slate-400 font-light">Devam etmek için yönetici kimliğinizle giriş yapın.</p>
      </div>

      <!-- Error Message Banner -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-[-10px]"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-250 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-[-10px]"
      >
        <div v-if="errorMessage" class="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-start space-x-3 text-xs">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 shrink-0 mt-0.5" />
          <span>{{ errorMessage }}</span>
        </div>
      </Transition>

      <!-- Form -->
      <form class="space-y-6" @submit.prevent="handleLogin">
        
        <!-- Email Input -->
        <div class="space-y-2">
          <label for="email" class="block text-xs font-semibold text-slate-600 dark:text-slate-400">E-posta Adresi</label>
          <UInput
            id="email"
            v-model="email"
            type="email"
            required
            placeholder="admin@anilerdogan.com"
            icon="i-heroicons-envelope"
            class="rounded-lg"
            :disabled="isLoading"
          />
        </div>

        <!-- Password Input -->
        <div class="space-y-2">
          <label for="password" class="block text-xs font-semibold text-slate-600 dark:text-slate-400">Şifre</label>
          <div class="relative">
            <UInput
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••••"
              icon="i-heroicons-lock-closed"
              class="rounded-lg w-full"
              :disabled="isLoading"
            />
            <button
              type="button"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              @click="showPassword = !showPassword"
            >
              <UIcon :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Remember Session Notice -->
        <div class="text-[10px] text-slate-400 leading-relaxed">
          * Giriş yapıldıktan sonra tarayıcı oturumunuz otomatik olarak korunur.
        </div>

        <!-- Submit Button -->
        <UButton
          type="submit"
          color="primary"
          block
          size="lg"
          :loading="isLoading"
          class="rounded-full py-4 font-semibold text-base"
        >
          Giriş Yap
        </UButton>

      </form>

      <!-- Back Link -->
      <div class="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
        <UButton
          to="/"
          variant="link"
          color="neutral"
          icon="i-heroicons-arrow-left"
          class="text-xs text-slate-500 hover:text-slate-900"
        >
          Web Sitesine Geri Dön
        </UButton>
      </div>

    </div>
  </div>
</template>
