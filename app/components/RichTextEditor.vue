<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'İçeriğinizi buraya yazın...'
  }
})

const emit = defineEmits(['update:modelValue'])

const editorRef = ref<HTMLDivElement | null>(null)
const isMediaPickerOpen = ref(false)
const savedRange = ref<Range | null>(null)

// Synchronize external changes to editor
watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && newVal !== editorRef.value.innerHTML) {
    editorRef.value.innerHTML = newVal || ''
  }
})

onMounted(() => {
  if (editorRef.value) {
    editorRef.value.innerHTML = props.modelValue || ''
  }
})

// Trigger browser document commands
const format = (command: string, value: string = '') => {
  document.execCommand(command, false, value)
  emitChange()
}

const emitChange = () => {
  if (editorRef.value) {
    emit('update:modelValue', editorRef.value.innerHTML)
  }
}

// Custom link prompt
const addLink = () => {
  const url = prompt('Lütfen yönlendirilecek URL adresini girin:')
  if (url) {
    format('createLink', url)
  }
}

// Media Picker insertion
const triggerImageInsert = () => {
  // Save current selection range before opening picker
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    savedRange.value = selection.getRangeAt(0).cloneRange()
  }
  isMediaPickerOpen.value = true
}

const handleImageSelect = (mediaItem: any) => {
  if (!mediaItem) return

  // Restore editor focus and selection
  if (savedRange.value && window.getSelection) {
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(savedRange.value)
  } else if (editorRef.value) {
    editorRef.value.focus()
  }

  // Insert structured image node
  const imgHtml = `<img src="${mediaItem.public_url}" alt="${mediaItem.alt_text || 'Blog görseli'}" class="w-full max-w-2xl h-auto rounded-3xl my-6 mx-auto block shadow-md" />`
  document.execCommand('insertHTML', false, imgHtml)
  emitChange()
}
</script>

<template>
  <div class="border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
    <!-- Toolbar -->
    <div class="flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
      <!-- Paragraph & Headings -->
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        class="rounded-lg p-1.5"
        title="Paragraf"
        @click="format('formatBlock', '<p>')"
      >
        <span class="text-xs font-bold font-sans">P</span>
      </UButton>
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        class="rounded-lg p-1.5"
        title="Başlık 2"
        @click="format('formatBlock', '<h2>')"
      >
        <span class="text-xs font-bold font-sans">H2</span>
      </UButton>
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        class="rounded-lg p-1.5"
        title="Başlık 3"
        @click="format('formatBlock', '<h3>')"
      >
        <span class="text-xs font-bold font-sans">H3</span>
      </UButton>

      <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

      <!-- Text Styles -->
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-bold"
        class="rounded-lg"
        title="Kalın"
        @click="format('bold')"
      />
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-italic"
        class="rounded-lg"
        title="Eğik"
        @click="format('italic')"
      />
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-underline"
        class="rounded-lg"
        title="Altı Çizili"
        @click="format('underline')"
      />

      <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

      <!-- Lists -->
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-list-bullet"
        class="rounded-lg"
        title="Sırasız Liste"
        @click="format('insertUnorderedList')"
      />
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        class="rounded-lg p-1.5"
        title="Sıralı Liste"
        @click="format('insertOrderedList')"
      >
        <span class="text-xs font-bold font-mono">1.</span>
      </UButton>

      <div class="h-4 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

      <!-- Quotes & Media -->
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        class="rounded-lg p-1.5"
        title="Alıntı"
        @click="format('formatBlock', '<blockquote>')"
      >
        <span class="text-xs font-bold font-serif">“</span>
      </UButton>
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-link"
        class="rounded-lg"
        title="Bağlantı Ekle"
        @click="addLink"
      />
      <UButton
        type="button"
        size="sm"
        color="neutral"
        variant="ghost"
        icon="i-heroicons-photo"
        class="rounded-lg"
        title="Kütüphaneden Görsel Ekle"
        @click="triggerImageInsert"
      />
    </div>

    <!-- Contenteditable container -->
    <div
      ref="editorRef"
      contenteditable="true"
      class="prose prose-slate dark:prose-invert max-w-none focus:outline-none min-h-[320px] p-4 text-sm bg-white dark:bg-slate-900 overflow-y-auto leading-relaxed text-slate-800 dark:text-slate-200"
      :placeholder="placeholder"
      @input="emitChange"
      @blur="emitChange"
    />

    <!-- Hidden Media Picker for Toolbar Image insert -->
    <div class="hidden">
      <MediaPicker
        v-model="savedRange as any"
        folder="blog"
        @select="handleImageSelect"
      />
      <!-- Trigger modal manually -->
      <UModal v-model="isMediaPickerOpen" :ui="{ width: 'max-w-3xl' }">
        <div class="p-6 bg-white dark:bg-slate-900 rounded-3xl flex flex-col max-h-[85vh]">
          <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
            <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Editöre Görsel Ekle</h3>
            <UButton variant="ghost" color="neutral" icon="i-heroicons-x-mark" class="rounded-full" @click="isMediaPickerOpen = false" />
          </div>
          <div class="flex-1 overflow-y-auto">
            <MediaPicker
              model-value=""
              folder="blog"
              @select="(item: any) => { handleImageSelect(item); isMediaPickerOpen = false }"
            />
          </div>
        </div>
      </UModal>
    </div>
  </div>
</template>

<style scoped>
[contenteditable=true]:empty:before {
  content: attr(placeholder);
  display: block;
  color: #94a3b8; /* slate-400 */
  font-style: italic;
}
</style>
