<script setup lang="ts">
import type { Service } from '~/types'

defineProps<{
  service: Service
}>()
</script>

<template>
  <div class="bg-slate-900/80 border border-slate-800/80 rounded-[32px] p-8 flex flex-col justify-between hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 shadow-2xl group">
    <div>
      <!-- Icon Wrapper -->
      <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform">
        <UIcon :name="service.icon" class="w-6 h-6" />
      </div>

      <!-- Title & Details -->
      <h3 class="text-xl font-bold text-white mb-3 font-serif group-hover:text-cyan-300 transition-colors">
        {{ service.title }}
      </h3>
      <p class="text-xs text-slate-400 leading-relaxed font-light mb-6 line-clamp-3">
        {{ service.shortDescription }}
      </p>

      <!-- Key features sneak peek -->
      <ul class="space-y-2.5 mb-8">
        <li
          v-for="(feature, idx) in service.features.slice(0, 3)"
          :key="idx"
          class="flex items-center text-xs text-slate-300 font-light"
        >
          <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-emerald-400 mr-2 shrink-0" />
          <span class="line-clamp-1">{{ feature }}</span>
        </li>
      </ul>
    </div>

    <!-- Footer of Card -->
    <div class="pt-6 border-t border-slate-800/60 flex items-center justify-between">
      <div class="text-xs">
        <span class="text-slate-500 block text-[10px] uppercase font-mono">Süre / Paket</span>
        <span class="text-white font-bold text-xs">{{ service.duration }}</span>
      </div>
      
      <UButton
        :to="`/danismanlik/${service.slug}`"
        variant="ghost"
        color="primary"
        icon="i-heroicons-arrow-right"
        trailing
        class="rounded-full text-xs font-bold text-cyan-400 hover:text-cyan-300 p-2 group-hover:translate-x-1 transition-transform"
        aria-label="Hizmet detaylarını görün"
      >
        Detaylar
      </UButton>
    </div>
  </div>
</template>
