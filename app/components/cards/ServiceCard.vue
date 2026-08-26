<script setup lang="ts">
import type { Service } from '~/types'

defineProps<{
  service: Service
}>()
</script>

<template>
  <div class="premium-card bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 flex flex-col justify-between hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/20">
    <div>
      <!-- Icon Wrapper -->
      <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center mb-6">
        <UIcon :name="service.icon" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
      </div>

      <!-- Title & Details -->
      <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
        {{ service.title }}
      </h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
        {{ service.shortDescription }}
      </p>

      <!-- Key features sneak peek -->
      <ul class="space-y-2 mb-8">
        <li
          v-for="(feature, idx) in service.features.slice(0, 3)"
          :key="idx"
          class="flex items-center text-xs text-slate-600 dark:text-slate-400"
        >
          <UIcon name="i-heroicons-check" class="w-4 h-4 text-emerald-500 mr-2 shrink-0" />
          <span class="line-clamp-1">{{ feature }}</span>
        </li>
      </ul>
    </div>

    <!-- Footer of Card -->
    <div class="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
      <div class="text-xs">
        <span class="text-slate-400 block">Süre: {{ service.duration }}</span>
        <span class="text-slate-900 dark:text-white font-bold text-sm">{{ service.price }}</span>
      </div>
      
      <UButton
        :to="`/danismanlik/${service.slug}`"
        variant="ghost"
        color="emerald"
        icon="i-heroicons-arrow-right"
        trailing
        class="rounded-full group-hover:translate-x-1 transition-transform"
      >
        Detaylar
      </UButton>
    </div>
  </div>
</template>
