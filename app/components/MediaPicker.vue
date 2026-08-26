<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  folder: {
    type: String,
    default: 'general'
  },
  label: {
    type: String,
    default: 'Görsel Seç'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'select'])

const supabase = useSupabaseClient()
const isOpen = ref(false)
const activeTab = ref('library') // 'library' | 'upload'
const searchQuery = ref('')
const mediaItems = ref<any[]>([])
const isLoading = ref(false)

// Fetch media for Library tab
const fetchMedia = async () => {
  isLoading.value = true
  try {
    let query = supabase
      .from('media')
      .select('*')
      .order('created_at', { ascending: false })

    if (searchQuery.value) {
      query = query.or(`file_name.ilike.%${searchQuery.value}%,alt_text.ilike.%${searchQuery.value}%`)
    }

    const { data, error } = await query
    if (error) throw error
    mediaItems.value = data || []
  } catch (err: any) {
    // Media loading failed — handled silently
  } finally {
    isLoading.value = false
  }
}

// Watchers
watch(isOpen, (newVal) => {
  if (newVal) {
    activeTab.value = 'library'
    fetchMedia()
  }
})

watch(searchQuery, () => {
  fetchMedia()
})

// Selection
const selectItem = (item: any) => {
  emit('update:modelValue', item.public_url)
  emit('select', item)
  isOpen.value = false
}

// Upload handlers
const onUploadSuccess = (dbMedia: any) => {
  selectItem(dbMedia)
}

// Clear selection
const clearSelection = () => {
  emit('update:modelValue', '')
  emit('select', null)
}
</script>

<template>
  <div class="space-y-2">
    <!-- Selected State Preview or Select Button -->
    <div class="flex items-center space-x-4">
      <!-- Thumbnail Preview -->
      <div
        v-if="modelValue"
        class="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 shadow-sm group flex-shrink-0"
      >
        <img :src="modelValue" alt="Seçilen görsel" class="object-cover w-full h-full" />
        <button
          v-if="!disabled"
          type="button"
          class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
          @click="clearSelection"
        >
          <UIcon name="i-heroicons-trash" class="w-4 h-4 text-white" />
        </button>
      </div>

      <!-- No image select box -->
      <div
        v-else
        class="w-16 h-16 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 flex items-center justify-center flex-shrink-0 text-slate-400"
      >
        <UIcon name="i-heroicons-photo" class="w-6 h-6" />
      </div>

      <!-- Trigger buttons -->
      <div class="space-y-1">
        <div class="flex space-x-2">
          <UButton
            type="button"
            size="sm"
            color="primary"
            variant="soft"
            class="rounded-full px-4"
            :disabled="disabled"
            @click="isOpen = true"
          >
            {{ modelValue ? 'Görseli Değiştir' : label }}
          </UButton>
          <UButton
            v-if="modelValue"
            type="button"
            size="sm"
            color="error"
            variant="ghost"
            class="rounded-full"
            :disabled="disabled"
            @click="clearSelection"
          >
            Kaldır
          </UButton>
        </div>
        <p class="text-[10px] text-slate-400 font-light truncate max-w-xs sm:max-w-sm md:max-w-md">
          {{ modelValue || 'Görsel seçilmedi' }}
        </p>
      </div>
    </div>

    <!-- Media Picker Modal -->
    <UModal v-model="isOpen" :ui="{ width: 'max-w-3xl' }">
      <div class="p-6 space-y-6 bg-white dark:bg-slate-900 rounded-3xl flex flex-col max-h-[85vh]">
        <!-- Header -->
        <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Medya Seçici</h3>
            <p class="text-[10px] text-slate-400 font-light mt-0.5">Klasör: {{ folder }}</p>
          </div>
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-x-mark"
            class="rounded-full"
            @click="isOpen = false"
          />
        </div>

        <!-- Custom Tabs Navigation -->
        <div class="flex border-b border-slate-100 dark:border-slate-800">
          <button
            type="button"
            class="px-4 py-2 text-xs font-bold transition-all border-b-2 -mb-[2px]"
            :class="activeTab === 'library' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'"
            @click="activeTab = 'library'"
          >
            Kütüphaneden Seç
          </button>
          <button
            type="button"
            class="px-4 py-2 text-xs font-bold transition-all border-b-2 -mb-[2px]"
            :class="activeTab === 'upload' ? 'border-primary-500 text-primary-600 dark:text-primary-400' : 'border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'"
            @click="activeTab = 'upload'"
          >
            Yeni Yükle
          </button>
        </div>

        <!-- Tab Content -->
        <div class="flex-1 overflow-y-auto min-h-[300px]">
          <!-- Library Tab -->
          <div v-if="activeTab === 'library'" class="space-y-4 h-full flex flex-col">
            <!-- Search bar -->
            <div class="relative">
              <UInput
                v-model="searchQuery"
                icon="i-heroicons-magnifying-glass"
                placeholder="Görsel adı veya açıklamasında ara..."
                class="rounded-xl w-full"
              />
            </div>

            <!-- Loader -->
            <div v-if="isLoading" class="flex-1 flex items-center justify-center p-12">
              <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 animate-spin text-slate-400" />
            </div>

            <!-- Grid View -->
            <div v-else-if="mediaItems.length > 0" class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 overflow-y-auto pr-1">
              <div
                v-for="item in mediaItems"
                :key="item.id"
                class="group relative border border-slate-100 dark:border-slate-800 rounded-2xl overflow-hidden aspect-square bg-slate-50 dark:bg-slate-950/20 cursor-pointer shadow-sm hover:ring-2 hover:ring-primary-500 hover:border-transparent transition-all"
                @click="selectItem(item)"
              >
                <img :src="item.public_url" :alt="item.alt_text" class="object-cover w-full h-full" />
                <!-- Hover description layer -->
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col justify-end p-2 transition-opacity">
                  <p class="text-[9px] text-white font-medium truncate">{{ item.file_name }}</p>
                  <p class="text-[8px] text-slate-300 truncate italic" v-if="item.alt_text">{{ item.alt_text }}</p>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="flex-1 flex flex-col items-center justify-center p-12 text-center space-y-2">
              <span class="text-3xl">🖼️</span>
              <p class="text-xs font-bold text-slate-700 dark:text-slate-300">Medya Kütüphanesi Boş</p>
              <p class="text-[10px] text-slate-400 font-light">Aradığınız kriterlere uygun görsel bulunamadı veya henüz hiç görsel yüklemediniz.</p>
            </div>
          </div>

          <!-- Upload Tab -->
          <div v-else-if="activeTab === 'upload'" class="py-2">
            <ImageUploader
              :folder="folder"
              @upload-success="onUploadSuccess"
            />
          </div>
        </div>
      </div>
    </UModal>
  </div>
</template>
