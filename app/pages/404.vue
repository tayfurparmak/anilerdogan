<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'

useSeo(
  'Sayfa Bulunamadı (404)',
  'Aradığınız sayfa bulunamadı. Lütfen ana sayfaya dönün veya diğer hizmetlerimize göz atın.'
)
</script>

<template>
  <div class="py-32 flex flex-col items-center justify-center text-center space-y-6 max-w-xl mx-auto px-4 bg-slate-950 text-white min-h-[70vh]">
    <div class="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 text-4xl shadow-2xl">
      🧭
    </div>
    
    <h1 class="text-4xl sm:text-5xl font-extrabold text-white font-serif tracking-tight">
      Sayfa Bulunamadı
    </h1>
    
    <p class="text-sm text-slate-400 font-sans font-light leading-relaxed">
      Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
    </p>

    <div class="pt-4">
      <UButton
        to="/"
        color="primary"
        size="lg"
        class="rounded-full px-8 py-3.5 font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-xl shadow-cyan-500/20"
      >
        Ana Sayfaya Dön
      </UButton>
    </div>
  </div>
</template>
