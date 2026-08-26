<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  folder: {
    type: String,
    default: 'general'
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024 // 5MB
  }
})

const emit = defineEmits(['upload-success', 'upload-error', 'reset'])

const supabase = useSupabaseClient()
const toast = useToast()

const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const previewUrl = ref('')
const altText = ref('')
const selectedFile = ref<File | null>(null)

// Allowed MIME types
const allowedTypes = ['image/jpeg', 'image/png', 'image/webp']

// Handle file selection validation
const validateAndSetFile = (file: File) => {
  if (!allowedTypes.includes(file.type)) {
    const errMsg = 'Geçersiz dosya tipi. Lütfen JPG, PNG veya WebP görseli seçin.'
    toast.add({ title: 'Hata', description: errMsg, color: 'error' })
    emit('upload-error', errMsg)
    return false
  }

  if (file.size > props.maxSize) {
    const errMsg = `Dosya boyutu çok büyük. Maksimum limit: ${(props.maxSize / (1024 * 1024)).toFixed(0)}MB.`
    toast.add({ title: 'Hata', description: errMsg, color: 'error' })
    emit('upload-error', errMsg)
    return false
  }

  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
  return true
}

// Drag & Drop
const onDragOver = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = true
}

const onDragLeave = () => {
  isDragging.value = false
}

const onDrop = (e: DragEvent) => {
  e.preventDefault()
  isDragging.value = false
  if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
    validateAndSetFile(e.dataTransfer.files[0])
  }
}

const onFileSelect = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    validateAndSetFile(target.files[0])
  }
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

// Upload execution
const uploadImage = async () => {
  if (!selectedFile.value) return

  isUploading.value = true
  uploadProgress.value = 0

  const file = selectedFile.value
  const fileExt = file.name.split('.').pop()
  const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`
  const filePath = `${props.folder}/${uniqueName}`

  try {
    // 1. Upload to Supabase Storage
    const { data: uploadData, error: uploadErr } = await supabase.storage
      .from('website-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        onUploadProgress: (progress) => {
          uploadProgress.value = Math.round((progress.loaded / progress.total) * 100)
        }
      } as any)

    if (uploadErr) throw uploadErr

    // 2. Retrieve public URL
    const { data: urlData } = supabase.storage
      .from('website-media')
      .getPublicUrl(filePath)

    if (!urlData?.publicUrl) {
      throw new Error('Görselin genel URL\'si alınamadı.')
    }

    // 3. Save metadata to DB
    const { data: dbData, error: dbErr } = await supabase
      .from('media')
      .insert({
        file_name: file.name,
        file_path: filePath,
        public_url: urlData.publicUrl,
        mime_type: file.type,
        file_size: file.size,
        alt_text: altText.value || file.name.split('.')[0]
      } as any)
      .select()
      .single()

    if (dbErr) throw dbErr

    toast.add({ title: 'Başarılı', description: 'Görsel başarıyla yüklendi.', color: 'success' })
    emit('upload-success', dbData)
  } catch (err: any) {
    const errMsg = 'Yükleme başarısız: ' + (err.message || err.error_description || 'Bilinmeyen hata')
    toast.add({ title: 'Yükleme Hatası', description: errMsg, color: 'error' })
    emit('upload-error', errMsg)
  } finally {
    isUploading.value = false
  }
}

// Reset / Remove selected
const reset = () => {
  selectedFile.value = null
  previewUrl.value = ''
  altText.value = ''
  uploadProgress.value = 0
  isUploading.value = false
  if (fileInput.value) fileInput.value.value = ''
  emit('reset')
}
</script>

<template>
  <div class="space-y-4">
    <!-- Drag / Drop or Preview Area -->
    <div
      class="relative border-2 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center min-h-[220px] transition-all"
      :class="[
        isDragging
          ? 'border-primary-500 bg-primary-500/5'
          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-950/20',
        previewUrl ? 'border-solid p-4' : ''
      ]"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
      @drop="onDrop"
    >
      <!-- File Input (Hidden) -->
      <input
        ref="fileInput"
        type="file"
        accept="image/jpeg,image/png,image/webp"
        class="hidden"
        @change="onFileSelect"
      />

      <!-- Pre-upload Preview State -->
      <div v-if="previewUrl" class="w-full flex flex-col items-center space-y-4">
        <div class="relative max-w-xs max-h-[160px] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-sm">
          <img :src="previewUrl" alt="Önizleme" class="object-contain max-h-[160px] w-full" />
          
          <div v-if="isUploading" class="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-[2px]">
            <div class="text-center text-white space-y-2 p-4 w-full">
              <span class="text-xs font-bold block">{{ uploadProgress }}%</span>
              <div class="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                <div class="bg-primary-500 h-full transition-all duration-150" :style="{ width: `${uploadProgress}%` }" />
              </div>
            </div>
          </div>
        </div>

        <!-- File Meta Info -->
        <div v-if="selectedFile && !isUploading" class="text-center space-y-1">
          <p class="text-xs font-medium text-slate-700 dark:text-slate-300 truncate max-w-sm">{{ selectedFile.name }}</p>
          <p class="text-[10px] text-slate-400 font-mono">{{ (selectedFile.size / 1024).toFixed(1) }} KB</p>
        </div>
      </div>

      <!-- Drag & Drop Prompt State -->
      <div v-else class="text-center space-y-3 cursor-pointer" @click="triggerFileInput">
        <div class="w-12 h-12 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-center mx-auto text-slate-400 group-hover:text-primary-500 transition-colors">
          <UIcon name="i-heroicons-cloud-arrow-up" class="w-6 h-6" />
        </div>
        <div class="space-y-1">
          <p class="text-xs font-bold text-slate-800 dark:text-white">Dosya Sürükleyin veya Seçin</p>
          <p class="text-[10px] text-slate-400 font-light">JPG, PNG veya WebP (Maks: 5MB)</p>
        </div>
      </div>
    </div>

    <!-- Metadata inputs & action buttons -->
    <div v-if="previewUrl" class="space-y-4">
      <div class="space-y-1">
        <label class="text-[10px] font-bold uppercase text-slate-400">Görsel Açıklaması (Alt Text)</label>
        <UInput
          v-model="altText"
          placeholder="SEO ve ekran okuyucular için kısa açıklama..."
          class="rounded-lg text-xs"
          :disabled="isUploading"
        />
      </div>

      <div class="flex space-x-3">
        <UButton
          v-if="!isUploading && selectedFile"
          color="primary"
          block
          size="sm"
          icon="i-heroicons-arrow-up-tray"
          class="rounded-full py-2.5 flex-1 justify-center"
          @click="uploadImage"
        >
          Yüklemeyi Başlat
        </UButton>
        <UButton
          v-if="!isUploading"
          variant="outline"
          color="neutral"
          block
          size="sm"
          class="rounded-full py-2.5 flex-1 justify-center"
          @click="reset"
        >
          Vazgeç
        </UButton>
      </div>
    </div>
  </div>
</template>
