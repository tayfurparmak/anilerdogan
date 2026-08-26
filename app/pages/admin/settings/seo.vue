<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const toast = useToast()

const isLoading = ref(true)
const isSubmitting = ref(false)

// Form fields
const defaultSeoTitle = ref('')
const defaultSeoDescription = ref('')
const defaultOgImage = ref('')

const fetchSeoSettings = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single() as any

    if (error && error.code !== 'PGRST116') throw error

    if (data) {
      defaultSeoTitle.value = data.default_seo_title || ''
      defaultSeoDescription.value = data.default_seo_description || ''
      defaultOgImage.value = data.default_og_image || ''
    }
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'SEO Ayarları yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSeoSettings()
})

const saveSeoSettings = async () => {
  isSubmitting.value = true

  const payload = {
    id: 1,
    default_seo_title: defaultSeoTitle.value,
    default_seo_description: defaultSeoDescription.value,
    default_og_image: defaultOgImage.value
  }

  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert(payload as any)

    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'SEO Ayarları kaydedildi.', color: 'success' })
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Kaydedilemedi: ' + err.message, color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
      <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">SEO Ayarları</h1>
      <p class="text-xs text-slate-400 font-light">Sitenin genel arama motoru optimizasyonu (SEO) başlık ve açıklama etiketlerini yönetin.</p>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 animate-pulse">
      <div v-for="i in 3" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
    </div>

    <!-- Edit Form -->
    <form v-else class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-sm" @submit.prevent="saveSeoSettings">
      <div class="space-y-4">
        <!-- Default SEO Title -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Varsayılan SEO Başlığı (Meta Title)</label>
          <UInput v-model="defaultSeoTitle" required placeholder="Örn: Anıl Erdoğan | Yönetici Koçu & Yönetim Danışmanı" class="rounded-lg" />
        </div>

        <!-- Default SEO Description -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Varsayılan SEO Açıklaması (Meta Description)</label>
          <UTextarea v-model="defaultSeoDescription" placeholder="Arama motoru arama sonuçlarında görünecek açıklama..." :rows="4" class="rounded-lg w-full" />
        </div>

        <!-- Default OG Image -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Varsayılan Paylaşım Görseli (OG Image)</label>
          <MediaPicker v-model="defaultOgImage" folder="general" label="Görsel Seç" />
        </div>
      </div>

      <div class="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <UButton
          type="submit"
          color="primary"
          size="lg"
          :loading="isSubmitting"
          class="rounded-full px-8 py-3 text-xs font-semibold"
        >
          SEO Ayarlarını Kaydet
        </UButton>
      </div>
    </form>
  </div>
</template>
