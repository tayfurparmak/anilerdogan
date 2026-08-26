<script setup lang="ts">
import type { Education } from '~/types'

defineProps<{
  education: Education
}>()
</script>

<template>
  <div class="premium-card group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/20 flex flex-col h-full">
    <!-- Image Header -->
    <div class="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
      <img
        :src="education.image"
        :alt="education.title"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Level Badge -->
      <span class="absolute top-4 left-4 bg-slate-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
        {{ education.level }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col justify-between flex-grow">
      <div>
        <!-- Title -->
        <h3 class="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 mb-2">
          {{ education.title }}
        </h3>
        
        <!-- Description -->
        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {{ education.description }}
        </p>

        <!-- Features list -->
        <ul class="space-y-2 mb-6">
          <li
            v-for="(feature, idx) in education.features.slice(0, 3)"
            :key="idx"
            class="flex items-center text-xs text-slate-600 dark:text-slate-400"
          >
            <UIcon name="i-heroicons-check" class="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
            <span class="line-clamp-1">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Card Footer -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between mt-auto">
        <div class="text-xs">
          <span class="text-slate-400 block">Süre: {{ education.duration }}</span>
          <span class="text-slate-900 dark:text-white font-bold text-sm">{{ education.price }}</span>
        </div>
        
        <UButton
          to="/egitimler"
          color="emerald"
          variant="outline"
          class="rounded-full px-4 text-xs font-medium"
        >
          Kayıt Ol / İncele
        </UButton>
      </div>
    </div>
  </div>
</template>
