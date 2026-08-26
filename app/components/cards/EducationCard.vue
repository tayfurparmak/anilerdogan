<script setup lang="ts">
import type { Education } from '~/types'

defineProps<{
  education: Education
}>()
</script>

<template>
  <div class="bg-slate-900/80 border border-slate-800/80 rounded-[32px] overflow-hidden hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col h-full shadow-2xl group">
    <!-- Image Header -->
    <div class="relative h-48 overflow-hidden bg-slate-950 shrink-0">
      <img
        :src="education.image"
        :alt="education.title"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Level Badge -->
      <span class="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-400 px-3 py-1 rounded-full">
        {{ education.level }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col justify-between flex-grow">
      <div class="space-y-3">
        <!-- Title -->
        <h3 class="text-lg font-bold text-white line-clamp-1 font-serif group-hover:text-cyan-300 transition-colors">
          {{ education.title }}
        </h3>
        
        <!-- Description -->
        <p class="text-xs text-slate-400 line-clamp-2 leading-relaxed font-light">
          {{ education.description }}
        </p>

        <!-- Features list -->
        <ul class="space-y-2 pt-2">
          <li
            v-for="(feature, idx) in education.features.slice(0, 3)"
            :key="idx"
            class="flex items-center text-xs text-slate-300 font-light"
          >
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
            <span class="line-clamp-1">{{ feature }}</span>
          </li>
        </ul>
      </div>

      <!-- Card Footer -->
      <div class="pt-6 border-t border-slate-800/60 flex items-center justify-between mt-6">
        <div class="text-xs">
          <span class="text-slate-500 block text-[10px] uppercase font-mono">Süre: {{ education.duration }}</span>
          <span class="text-white font-bold text-xs">{{ education.price }}</span>
        </div>
        
        <UButton
          to="/egitimler"
          color="primary"
          variant="outline"
          class="rounded-full px-5 py-2 text-xs font-bold border-slate-700 hover:border-cyan-400 text-slate-200"
          aria-label="Eğitim programını inceleyin"
        >
          Kayıt Ol / İncele
        </UButton>
      </div>
    </div>
  </div>
</template>
