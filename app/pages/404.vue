<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'

useSeo(
  'Sayfa Bulunamadı (404)',
  'Aradığınız sayfa bulunamadı. Lütfen ana sayfaya dönün veya diğer hizmetlerimize göz atın.'
)
</script>

<template>
  <div class="py-20 flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto px-4">
    <!-- Visual Accent -->
    <span class="text-8xl select-none">🧭</span>
    
    <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white font-serif tracking-tight">
      Sayfa Bulunamadı
    </h1>
    
    <p class="text-sm text-slate-500 dark:text-slate-400 font-sans font-light leading-relaxed">
      Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir. Lütfen ana sayfaya dönerek devam edin.
    </p>

    <div class="pt-4">
      <UButton
        to="/"
        color="emerald"
        size="lg"
        class="rounded-full px-8 py-3.5 font-medium shadow-lg shadow-emerald-500/10"
      >
        Ana Sayfaya Dön
      </UButton>
    </div>
  </div>
</template>
