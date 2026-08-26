<script setup lang="ts">
import { ArrowRight, Github, Linkedin, Twitter, Sparkles, FileText, Code2 } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    availabilityText?: string
    title?: string
    highlightedTitle?: string
    description?: string
    primaryCtaText?: string
    primaryCtaLink?: string
    secondaryCtaText?: string
    secondaryCtaLink?: string
    stats?: Array<{ label: string; value: string }>
  }>(),
  {
    availabilityText: 'Yeni projeler ve danışmanlık için müsait',
    title: 'Modern Web Deneyimleri & Ölçeklenebilir',
    highlightedTitle: 'Mimari Çözümler',
    description: 'Nuxt 3, Vue, TypeScript ve modern UI/UX prensipleriyle yüksek performanslı, estetik ve kullanıcı odaklı dijital ürünler geliştiriyorum.',
    primaryCtaText: 'İletişime Geç',
    primaryCtaLink: '#contact',
    secondaryCtaText: 'Projeleri İncele',
    secondaryCtaLink: '#projects',
    stats: () => [
      { label: 'Yıllık Deneyim', value: '7+' },
      { label: 'Tamamlanan Proje', value: '45+' },
      { label: 'Mutlu Müşteri', value: '30+' }
    ]
  }
)
</script>

<template>
  <section class="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-zinc-950">
    <!-- Subtle Background Grid & Radial Gradient -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
    <div class="absolute top-1/3 right-1/4 w-[400px] h-[300px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

    <div class="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
      <!-- Status Badge -->
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-md mb-8 shadow-inner animate-fade-in">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span class="text-xs font-medium text-zinc-300 tracking-wide">
          {{ availabilityText }}
        </span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.1] mb-6">
        {{ title }}
        <span class="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent block sm:inline sm:ml-3">
          {{ highlightedTitle }}
        </span>
      </h1>

      <!-- Description -->
      <p class="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
        {{ description }}
      </p>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
        <a
          :href="primaryCtaLink"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-950 bg-zinc-100 hover:bg-white rounded-xl transition-all duration-200 shadow-lg shadow-white/5 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles class="w-4 h-4 text-indigo-600" />
          <span>{{ primaryCtaText }}</span>
        </a>

        <a
          :href="secondaryCtaLink"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-zinc-200 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{{ secondaryCtaText }}</span>
          <ArrowRight class="w-4 h-4 text-zinc-400" />
        </a>
      </div>

      <!-- Stats Bar / Highlights -->
      <div class="grid grid-cols-3 gap-4 max-w-2xl mx-auto pt-8 border-t border-zinc-900">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col items-center">
          <span class="text-2xl sm:text-3xl font-bold text-zinc-100 font-mono tracking-tight mb-1">
            {{ stat.value }}
          </span>
          <span class="text-xs text-zinc-500 font-medium text-center">
            {{ stat.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
