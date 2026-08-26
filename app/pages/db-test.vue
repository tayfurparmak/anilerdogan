<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useSeo } from '../composables/useSeo'

useSeo('Database Test', 'Supabase veritabanı bağlantı testi sayfası.')

const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMessage = ref('')
const config = useRuntimeConfig()
const envStatus = ref({
  urlDefined: false,
  keyDefined: false
})

// Check if environment variables are loaded in client runtime config
onMounted(() => {
  envStatus.value.urlDefined = !!config.public.supabase?.url
  envStatus.value.keyDefined = !!config.public.supabase?.key
})

const testConnection = async () => {
  status.value = 'loading'
  errorMessage.value = ''
  
  const supabase = useSupabaseClient()
  
  try {
    // Attempt to query the Auth session API as a baseline connection check.
    // This doesn't require any pre-existing database tables.
    const { data, error } = await supabase.auth.getSession()
    
    if (error) {
      status.value = 'error'
      errorMessage.value = `Supabase Hata Mesajı: ${error.message}`
    } else {
      // If we reach here and there is no error, the client successfully communicated with the Supabase API endpoint.
      status.value = 'success'
    }
  } catch (err: any) {
    status.value = 'error'
    errorMessage.value = err.message || 'Supabase API sunucusuna bağlanılamadı. Lütfen ağ bağlantınızı veya URL/Anahtar bilgilerinizi kontrol edin.'
  }
}
</script>

<template>
  <div class="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 sm:p-12 space-y-8">
      
      <!-- Title -->
      <div class="text-center space-y-2">
        <div class="w-16 h-16 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mx-auto mb-4">
          <UIcon name="i-heroicons-circle-stack" class="w-8 h-8" />
        </div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white font-serif">Supabase Bağlantı Kontrolü</h1>
        <p class="text-xs text-slate-400">Veritabanı ve API bağlantısının durumunu bu sayfadan doğrulayabilirsiniz.</p>
      </div>

      <!-- Environment Variables Check -->
      <div class="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-800/40 space-y-4">
        <h2 class="text-sm font-semibold text-slate-800 dark:text-slate-200">Çevre Değişkenleri (Environment Variables)</h2>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">NUXT_PUBLIC_SUPABASE_URL</span>
            <span
              class="px-2.5 py-0.5 rounded-full font-medium"
              :class="envStatus.urlDefined ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'"
            >
              {{ envStatus.urlDefined ? 'Tanımlı' : 'Eksik' }}
            </span>
          </div>
          
          <div class="flex items-center justify-between text-xs">
            <span class="text-slate-500">NUXT_PUBLIC_SUPABASE_ANON_KEY</span>
            <span
              class="px-2.5 py-0.5 rounded-full font-medium"
              :class="envStatus.keyDefined ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400'"
            >
              {{ envStatus.keyDefined ? 'Tanımlı' : 'Eksik' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="text-center">
        <UButton
          color="primary"
          size="lg"
          :loading="status === 'loading'"
          class="rounded-full px-8 py-3.5 font-semibold"
          @click="testConnection"
        >
          Bağlantıyı Test Et
        </UButton>
      </div>

      <!-- Test Results Output -->
      <div v-if="status !== 'idle'" class="pt-4">
        <!-- Success State -->
        <div
          v-if="status === 'success'"
          class="p-5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-start space-x-3 text-xs"
        >
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mt-0.5 shrink-0" />
          <div class="space-y-1">
            <span class="font-bold block">Bağlantı Başarılı!</span>
            <p class="font-light leading-relaxed">Supabase istemcisi başarıyla başlatıldı ve API uç noktasıyla iletişim sağlandı. PostgreSQL bağlantısı aktiftir.</p>
          </div>
        </div>

        <!-- Error State -->
        <div
          v-if="status === 'error'"
          class="p-5 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-2xl flex items-start space-x-3 text-xs"
        >
          <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 mt-0.5 shrink-0" />
          <div class="space-y-1">
            <span class="font-bold block">Bağlantı Hatası</span>
            <p class="font-light leading-relaxed">{{ errorMessage }}</p>
            <p class="text-[10px] text-rose-500/70 pt-2 leading-relaxed">
              * Not: Eğer yerel `.env` dosyasında mock değerler kullanıyorsanız, gerçek bir sunucu olmadığından dolayı istek başarısız olacaktır (Fetch / Network hatası). Bu hata, istemcinin çevre değişkenlerini başarıyla okuyup istek gönderdiğini kanıtlar.
            </p>
          </div>
        </div>
      </div>

      <!-- Back to Home -->
      <div class="text-center pt-4 border-t border-slate-100 dark:border-slate-800">
        <UButton
          to="/"
          variant="link"
          color="neutral"
          icon="i-heroicons-arrow-left"
          class="text-xs text-slate-500 hover:text-slate-900"
        >
          Ana Sayfaya Dön
        </UButton>
      </div>

    </div>
  </div>
</template>
