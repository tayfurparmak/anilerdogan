<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  totalItems?: number
  itemsPerPage?: number
}>()

const emit = defineEmits<{
  (e: 'update:currentPage', page: number): void
}>()

const setPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('update:currentPage', page)
  }
}

// Generate page numbers range with ellipsis for large page counts
const displayedPages = computed(() => {
  const total = props.totalPages
  const current = props.currentPage
  const delta = 1
  const range: (number | string)[] = []

  for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
    range.push(i)
  }

  if (current - delta > 2) {
    range.unshift('...')
  }
  if (current + delta < total - 1) {
    range.push('...')
  }

  range.unshift(1)
  if (total > 1) {
    range.push(total)
  }

  return range
})
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800/80">
    <!-- Item Count Text -->
    <div class="text-xs text-slate-400 font-mono">
      <template v-if="totalItems && itemsPerPage">
        Gösterilen: <span class="text-cyan-400 font-bold">{{ Math.min((currentPage - 1) * itemsPerPage + 1, totalItems) }}-{{ Math.min(currentPage * itemsPerPage, totalItems) }}</span> / Toplam {{ totalItems }} Kayıt
      </template>
      <template v-else>
        Sayfa <span class="text-cyan-400 font-bold">{{ currentPage }}</span> / {{ totalPages }}
      </template>
    </div>

    <!-- Pagination Controls -->
    <div class="flex items-center space-x-2">
      <!-- Previous Button -->
      <button
        type="button"
        class="inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200"
        :class="[
          currentPage === 1
            ? 'border-slate-800 text-slate-600 cursor-not-allowed bg-slate-950'
            : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:scale-105'
        ]"
        :disabled="currentPage === 1"
        aria-label="Önceki Sayfa"
        @click="setPage(currentPage - 1)"
      >
        <UIcon name="i-heroicons-chevron-left" class="w-4 h-4" />
        <span>Önceki</span>
      </button>

      <!-- Page Numbers -->
      <div class="flex items-center space-x-1">
        <button
          v-for="(page, idx) in displayedPages"
          :key="idx"
          type="button"
          class="w-9 h-9 rounded-xl text-xs font-bold font-mono transition-all duration-200 flex items-center justify-center border"
          :class="[
            page === '...'
              ? 'border-transparent text-slate-600 cursor-default'
              : page === currentPage
                ? 'bg-gradient-to-br from-cyan-500 to-emerald-500 text-slate-950 border-transparent shadow-lg shadow-cyan-500/20 scale-105'
                : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:border-cyan-500/30'
          ]"
          :disabled="page === '...'"
          @click="typeof page === 'number' && setPage(page)"
        >
          {{ page }}
        </button>
      </div>

      <!-- Next Button -->
      <button
        type="button"
        class="inline-flex items-center space-x-1 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all duration-200"
        :class="[
          currentPage === totalPages
            ? 'border-slate-800 text-slate-600 cursor-not-allowed bg-slate-950'
            : 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-cyan-500/40 hover:scale-105'
        ]"
        :disabled="currentPage === totalPages"
        aria-label="Sonraki Sayfa"
        @click="setPage(currentPage + 1)"
      >
        <span>Sonraki</span>
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
