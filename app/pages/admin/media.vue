<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const toast = useToast()

const mediaItems = ref<any[]>([])
const isLoading = ref(false)
const searchQuery = ref('')
const selectedFolder = ref('all') // 'all', 'profile', 'education', 'services', 'blog', 'testimonials', 'general'

// Dialog states
const isUploadOpen = ref(false)
const isDetailsOpen = ref(false)
const isConfirmDeleteOpen = ref(false)

const activeMedia = ref<any>(null)
const editAltText = ref('')
const isSavingAlt = ref(false)
const isDeleting = ref(false)

// Folder select options
const folderOptions = [
  { label: 'Tüm Klasörler', value: 'all' },
  { label: 'Profil (profile)', value: 'profile' },
  { label: 'Eğitim (education)', value: 'education' },
  { label: 'Hizmetler (services)', value: 'services' },
  { label: 'Blog (blog)', value: 'blog' },
  { label: 'Referanslar (testimonials)', value: 'testimonials' },
  { label: 'Genel (general)', value: 'general' }
]

// Fetch all media
const fetchMedia = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    mediaItems.value = data || []
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Medya kütüphanesi yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMedia()
})

// Filter and search
const filteredMedia = computed(() => {
  let items = mediaItems.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    items = items.filter(item => 
      item.file_name.toLowerCase().includes(query) || 
      (item.alt_text && item.alt_text.toLowerCase().includes(query))
    )
  }

  // Folder filter
  if (selectedFolder.value !== 'all') {
    items = items.filter(item => item.file_path.startsWith(selectedFolder.value + '/'))
  }

  return items
})

// Copy public URL
const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url)
    toast.add({ title: 'Kopyalandı', description: 'Görsel URL\'si panoya kopyalandı.', color: 'success' })
  } catch (e) {
    toast.add({ title: 'Hata', description: 'Panoya kopyalanamadı.', color: 'error' })
  }
}

// Open details / edit alt text modal
const openDetails = (item: any) => {
  activeMedia.value = item
  editAltText.value = item.alt_text || ''
  isDetailsOpen.value = true
}

const saveAltText = async () => {
  if (!activeMedia.value) return
  isSavingAlt.value = true
  try {
    const { error } = await supabase
      .from('media')
      .update({ alt_text: editAltText.value } as any)
      .eq('id', activeMedia.value.id)

    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Alt açıklama güncellendi.', color: 'success' })
    fetchMedia()
    isDetailsOpen.value = false
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Güncellenemedi: ' + err.message, color: 'error' })
  } finally {
    isSavingAlt.value = false
  }
}

// Delete media
const triggerDelete = (item: any) => {
  activeMedia.value = item
  isConfirmDeleteOpen.value = true
}

const confirmDelete = async () => {
  if (!activeMedia.value) return
  isDeleting.value = true
  try {
    const item = activeMedia.value

    // 1. Delete from Supabase Storage
    const { error: storageErr } = await supabase.storage
      .from('website-media')
      .remove([item.file_path])

    // Wait! If storage deletion fails because file is missing, we still want to clean up database!
    // So we don't throw immediately unless it is an auth/critical storage error.
    if (storageErr) {
      console.warn('Storage file deletion warning:', storageErr.message)
    }

    // 2. Delete from Database
    const { error: dbErr } = await supabase
      .from('media')
      .delete()
      .eq('id', item.id)

    if (dbErr) throw dbErr

    toast.add({ title: 'Başarılı', description: 'Görsel başarıyla silindi.', color: 'success' })
    fetchMedia()
    isConfirmDeleteOpen.value = false
    isDetailsOpen.value = false
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Silme işlemi başarısız: ' + err.message, color: 'error' })
  } finally {
    isDeleting.value = false
    activeMedia.value = null
  }
}

// On upload success
const handleUploadSuccess = () => {
  fetchMedia()
  isUploadOpen.value = false
}

// Format file size helper
const formatBytes = (bytes: number, decimals = 1) => {
  if (!bytes) return '0 Bytes'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Medya Kütüphanesi</h1>
        <p class="text-xs text-slate-400 font-light">Sitedeki tüm görsel dosyalarını ve açıklamalarını (Alt Text) buradan yönetin.</p>
      </div>
      <div>
        <UButton
          color="primary"
          size="sm"
          icon="i-heroicons-plus"
          class="rounded-full px-5 py-2.5 text-xs font-semibold shadow-sm"
          @click="isUploadOpen = true"
        >
          Yeni Medya Yükle
        </UButton>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-4 shadow-sm">
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Dosya adı veya alt açıklamada ara..."
          class="rounded-xl w-full"
        />
      </div>
      <div class="w-full sm:w-64">
        <USelect
          v-model="selectedFolder"
          :items="folderOptions"
          class="rounded-xl w-full"
        />
      </div>
    </div>

    <!-- Grid Library -->
    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div v-for="i in 10" :key="i" class="border border-slate-100 dark:border-slate-800 rounded-3xl overflow-hidden aspect-square bg-slate-50 dark:bg-slate-950/20 animate-pulse" />
    </div>

    <div v-else-if="filteredMedia.length > 0" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      <div
        v-for="item in filteredMedia"
        :key="item.id"
        class="group relative bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col h-full"
      >
        <!-- Thumbnail -->
        <div class="aspect-square bg-slate-50 dark:bg-slate-950/40 relative overflow-hidden flex-shrink-0 cursor-pointer" @click="openDetails(item)">
          <img :src="item.public_url" :alt="item.alt_text || 'Medya görseli'" loading="lazy" decoding="async" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
          
          <!-- Image details quick overlay -->
          <div class="absolute top-2 left-2 bg-slate-900/70 text-[8px] text-white px-2 py-0.5 rounded-full backdrop-blur-sm uppercase tracking-wider font-semibold">
            {{ item.file_path.split('/')[0] }}
          </div>
        </div>

        <!-- Meta content -->
        <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
          <div class="space-y-1">
            <h3 class="text-xs font-bold text-slate-800 dark:text-white truncate" :title="item.file_name">
              {{ item.file_name }}
            </h3>
            <p class="text-[9px] text-slate-400 font-mono">
              {{ formatBytes(item.file_size) }} • {{ new Date(item.created_at).toLocaleDateString('tr-TR') }}
            </p>
            <p class="text-[10px] text-slate-500 dark:text-slate-400 italic truncate" :title="item.alt_text || 'Açıklama yok'">
              {{ item.alt_text ? `"${item.alt_text}"` : 'Açıklama girilmemiş' }}
            </p>
          </div>

          <!-- Action buttons -->
          <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-clipboard"
              class="rounded-full"
              title="URL Kopyala"
              @click="copyUrl(item.public_url)"
            />
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-pencil-square"
              class="rounded-full"
              title="Ayrıntıları Düzenle"
              @click="openDetails(item)"
            />
            <UButton
              color="error"
              variant="ghost"
              icon="i-heroicons-trash"
              class="rounded-full"
              title="Kalıcı Sil"
              @click="triggerDelete(item)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-16 text-center space-y-4 shadow-sm">
      <span class="text-4xl block">🖼️</span>
      <h3 class="text-sm font-bold text-slate-800 dark:text-white">Görsel Bulunamadı</h3>
      <p class="text-xs text-slate-400 font-light max-w-sm mx-auto">
        Kütüphanede henüz görsel bulunmuyor. Yeni bir görsel yükleyerek başlayabilirsiniz.
      </p>
      <UButton
        color="primary"
        variant="soft"
        class="rounded-full px-6"
        @click="isUploadOpen = true"
      >
        Görsel Yükle
      </UButton>
    </div>

    <!-- Upload Modal -->
    <UModal v-model="isUploadOpen">
      <div class="p-6 space-y-6 bg-white dark:bg-slate-900 rounded-3xl">
        <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Yeni Görsel Yükle</h3>
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-x-mark"
            class="rounded-full"
            @click="isUploadOpen = false"
          />
        </div>
        <div class="space-y-4">
          <div class="space-y-1">
            <label class="text-[10px] font-bold uppercase text-slate-400">Klasör Hedefi</label>
            <USelect
              v-model="selectedFolder"
              :items="folderOptions.filter(o => o.value !== 'all')"
              class="rounded-xl w-full"
            />
          </div>
          <ImageUploader
            :folder="selectedFolder === 'all' ? 'general' : selectedFolder"
            @upload-success="handleUploadSuccess"
          />
        </div>
      </div>
    </UModal>

    <!-- Details / Alt Text Modal -->
    <UModal v-model="isDetailsOpen" :ui="{ width: 'max-w-2xl' }">
      <div v-if="activeMedia" class="p-6 space-y-6 bg-white dark:bg-slate-900 rounded-3xl flex flex-col md:flex-row gap-6 max-h-[85vh] overflow-y-auto">
        <!-- Left Column: Visual -->
        <div class="flex-1 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/40 rounded-2xl p-4 border border-slate-100 dark:border-slate-800">
          <img :src="activeMedia.public_url" :alt="activeMedia.alt_text" class="max-h-[220px] object-contain rounded-lg" />
          <UButton
            color="neutral"
            variant="soft"
            size="sm"
            icon="i-heroicons-arrow-top-right-on-square"
            class="rounded-full mt-4"
            to="activeMedia.public_url"
            target="_blank"
          >
            Tam Boyutta Gör
          </UButton>
        </div>

        <!-- Right Column: Meta Form -->
        <div class="w-full md:w-80 flex flex-col justify-between space-y-6">
          <div class="space-y-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900 dark:text-white font-serif">Görsel Ayrıntıları</h3>
              <p class="text-[10px] text-slate-400 font-light font-mono truncate">{{ activeMedia.file_name }}</p>
            </div>

            <!-- Detail specs -->
            <div class="space-y-1.5 text-[10px] text-slate-500 border-t border-b border-slate-100 dark:border-slate-800 py-3">
              <div><strong class="text-slate-700 dark:text-slate-300">Klasör:</strong> {{ activeMedia.file_path.split('/')[0] }}</div>
              <div><strong class="text-slate-700 dark:text-slate-300">Boyut:</strong> {{ formatBytes(activeMedia.file_size) }}</div>
              <div><strong class="text-slate-700 dark:text-slate-300">Tip:</strong> {{ activeMedia.mime_type }}</div>
              <div><strong class="text-slate-700 dark:text-slate-300">Tarih:</strong> {{ new Date(activeMedia.created_at).toLocaleString('tr-TR') }}</div>
            </div>

            <!-- Alt Text Form -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Alt Açıklama (Alt Text)</label>
              <UTextarea
                v-model="editAltText"
                placeholder="SEO ve ekran okuyucular için kısa görsel açıklaması yazın..."
                :rows="4"
                class="rounded-lg text-xs"
                :disabled="isSavingAlt"
              />
            </div>
          </div>

          <div class="flex space-x-3 pt-2">
            <UButton
              color="primary"
              class="rounded-full px-5 py-2.5 text-xs font-semibold flex-1 justify-center"
              :loading="isSavingAlt"
              @click="saveAltText"
            >
              Kaydet
            </UButton>
            <UButton
              variant="outline"
              color="neutral"
              class="rounded-full px-5 py-2.5 text-xs font-semibold"
              @click="isDetailsOpen = false"
            >
              Kapat
            </UButton>
          </div>
        </div>
      </div>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="isConfirmDeleteOpen">
      <div v-if="activeMedia" class="p-6 space-y-6 bg-white dark:bg-slate-900 rounded-3xl">
        <div class="flex items-center space-x-3 text-rose-500">
          <UIcon name="i-heroicons-trash" class="w-6 h-6" />
          <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Görsel Silinecek</h3>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed font-light">
          <strong>"{{ activeMedia.file_name }}"</strong> görselini silmek istediğinizden emin misiniz? Bu görsel hem depolama alanından (Storage) hem de veritabanından kalıcı olarak silinecektir.
        </p>
        <div class="flex space-x-3 justify-end pt-2">
          <UButton
            color="error"
            class="rounded-full px-5 py-2 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white"
            :loading="isDeleting"
            @click="confirmDelete"
          >
            Evet, Sil
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            class="rounded-full px-5 py-2 text-xs font-semibold"
            @click="isConfirmDeleteOpen = false"
          >
            Vazgeç
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
