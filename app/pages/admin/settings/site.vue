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
const siteName = ref('')
const siteDescription = ref('')
const logo = ref('')
const favicon = ref('')

const fetchSiteSettings = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single() as any

    if (error && error.code !== 'PGRST116') throw error

    if (data) {
      siteName.value = data.site_name || ''
      siteDescription.value = data.site_description || ''
      logo.value = data.logo || ''
      favicon.value = data.favicon || ''
    }
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Ayarlar yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchSiteSettings()
})

const saveSiteSettings = async () => {
  isSubmitting.value = true

  const payload = {
    id: 1,
    site_name: siteName.value,
    site_description: siteDescription.value,
    logo: logo.value,
    favicon: favicon.value
  }

  try {
    const { error } = await supabase
      .from('site_settings')
      .upsert(payload as any)

    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Site ayarları kaydedildi.', color: 'success' })
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
      <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Site Ayarları</h1>
      <p class="text-xs text-slate-400 font-light">Web sitesinin ismi, meta açıklamaları ve kurumsal kimlik logolarını yönetin.</p>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 animate-pulse">
      <div v-for="i in 3" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
    </div>

    <!-- Edit Form -->
    <form v-else class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-sm" @submit.prevent="saveSiteSettings">
      <div class="space-y-4">
        <!-- Site Name -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Site Adı (Marka)</label>
          <UInput v-model="siteName" required placeholder="Anıl Erdoğan" class="rounded-lg" />
        </div>

        <!-- Site Description -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Site Açıklaması</label>
          <UTextarea v-model="siteDescription" placeholder="Arama motorlarında listelenecek genel açıklama metni..." :rows="4" class="rounded-lg w-full" />
        </div>

        <!-- Logo URL -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Logo Görseli URL</label>
          <UInput v-model="logo" placeholder="Logo resim adresi veya boş bırakın" class="rounded-lg" />
        </div>

        <!-- Favicon URL -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Favicon Görseli URL</label>
          <UInput v-model="favicon" placeholder="Favicon adresi (ico/png)" class="rounded-lg" />
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
          Ayarları Kaydet
        </UButton>
      </div>
    </form>
  </div>
</template>
