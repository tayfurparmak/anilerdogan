<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const isLoading = ref(true)
const isSubmitting = ref(false)

// Form fields
const fullName = ref('')
const title = ref('')
const shortBio = ref('')
const bio = ref('')
const profileImage = ref('')
const email = ref('')
const phone = ref('')
const location = ref('')

const fetchProfile = async () => {
  if (!user.value) return
  isLoading.value = true

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.value.id)
      .single() as any

    if (error && error.code !== 'PGRST116') throw error // PGRST116 is code for "no rows found"

    if (data) {
      fullName.value = data.full_name || ''
      title.value = data.title || ''
      shortBio.value = data.short_bio || ''
      bio.value = data.bio || ''
      profileImage.value = data.profile_image || ''
      email.value = data.email || user.value.email || ''
      phone.value = data.phone || ''
      location.value = data.location || ''
    } else {
      // Set defaults from auth
      email.value = user.value.email || ''
    }
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Profil yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchProfile()
})

const saveProfile = async () => {
  if (!user.value) return
  isSubmitting.value = true

  const payload = {
    id: user.value.id,
    full_name: fullName.value,
    title: title.value,
    short_bio: shortBio.value,
    bio: bio.value,
    profile_image: profileImage.value,
    email: email.value,
    phone: phone.value,
    location: location.value
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .upsert(payload as any)

    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Profil ayarlarınız güncellendi.', color: 'success' })
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Profil güncellenirken hata oluştu: ' + err.message, color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm">
      <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Profil Ayarları</h1>
      <p class="text-xs text-slate-400 font-light">Özgeçmiş sayfanız ve iletişim kartlarında görüntülenecek kişisel bilgileri düzenleyin.</p>
    </div>

    <!-- Skeleton Loading -->
    <div v-if="isLoading" class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 animate-pulse">
      <div v-for="i in 5" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
    </div>

    <!-- Edit Form -->
    <form v-else class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 space-y-6 shadow-sm" @submit.prevent="saveProfile">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Full Name -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Adınız Soyadınız</label>
          <UInput v-model="fullName" required placeholder="Anıl Erdoğan" class="rounded-lg" />
        </div>

        <!-- Title -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Ünvan / Rol</label>
          <UInput v-model="title" required placeholder="Yönetici Koçu & Yönetim Danışmanı" class="rounded-lg" />
        </div>

        <!-- Profile Image URL -->
        <div class="space-y-1 md:col-span-2">
          <label class="text-[10px] font-bold uppercase text-slate-400">Profil Resmi</label>
          <MediaPicker v-model="profileImage" folder="profile" label="Profil Resmi Seç" />
        </div>

        <!-- Short Bio -->
        <div class="space-y-1 md:col-span-2">
          <label class="text-[10px] font-bold uppercase text-slate-400">Kısa Tanıtım (Short Bio)</label>
          <UInput v-model="shortBio" placeholder="Hakkımda sayfasının üstünde görünecek kısa giriş cümlesi..." class="rounded-lg" />
        </div>

        <!-- Bio -->
        <div class="space-y-1 md:col-span-2">
          <label class="text-[10px] font-bold uppercase text-slate-400">Detaylı Biyografi</label>
          <UTextarea v-model="bio" placeholder="Biyografinizi buraya girin..." :rows="8" class="rounded-lg w-full" />
        </div>

        <!-- Email -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">E-posta</label>
          <UInput v-model="email" required type="email" placeholder="admin@anilerdogan.com" class="rounded-lg" />
        </div>

        <!-- Phone -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Telefon / WhatsApp</label>
          <UInput v-model="phone" placeholder="+90 532 000 00 00" class="rounded-lg" />
        </div>

        <!-- Location -->
        <div class="space-y-1">
          <label class="text-[10px] font-bold uppercase text-slate-400">Konum / Lokasyon</label>
          <UInput v-model="location" placeholder="İstanbul, Türkiye" class="rounded-lg" />
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
          Değişiklikleri Kaydet
        </UButton>
      </div>
    </form>
  </div>
</template>
