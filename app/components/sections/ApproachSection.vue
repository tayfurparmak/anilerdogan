<script setup lang="ts">
const steps = [
  {
    num: '01',
    title: 'Tanışma ve Keşif Seansı',
    desc: 'İlk adımda, hedeflerinizi, mevcut zorluklarınızı ve beklentilerinizi analiz etmek için 30 dakikalık ücretsiz bir ön görüşme gerçekleştiriyoruz.'
  },
  {
    num: '02',
    title: 'Analiz ve Yol Haritası',
    desc: 'Mevcut durumunuzu, yetkinliklerinizi ve organizasyonel yapınızı analiz edip, size veya şirketinize özel somut bir çalışma planı ve takvimi çıkarıyoruz.'
  },
  {
    num: '03',
    title: 'Uygulama ve Koçluk Süreci',
    desc: 'Belirlediğimiz periyotlarda birebir seanslar, atölyeler ve pratik ödevlerle süreci işletiyor; seans aralarında da mesaj / e-posta ile destek oluyorum.'
  },
  {
    num: '04',
    title: 'Değerlendirme ve Takip',
    desc: 'Çalışma periyodu sonunda elde edilen gelişimi KPI ve OKR bazlı analiz ediyor; kazanımların kalıcı olması için takip mekanizmaları kuruyoruz.'
  }
]
</script>

<template>
  <section class="py-20 lg:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Metodoloji</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-serif">
          Birlikte Nasıl Çalışacağız?
        </h2>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
          Sürdürülebilir başarı ve gelişim şans eseri değildir. Süreç odaklı yaklaşımımızla adımları planlı şekilde atıyoruz.
        </p>
      </div>

      <!-- Steps Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
        <!-- Connecting Line for Desktop -->
        <div class="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-[1px] bg-slate-200 dark:bg-slate-800 z-0" />

        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="relative z-10 space-y-4 flex flex-col items-center md:items-start text-center md:text-left group"
        >
          <!-- Step Number Bubble -->
          <div class="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-center font-bold text-slate-400 group-hover:text-emerald-500 group-hover:border-emerald-500 transition-colors duration-300">
            {{ step.num }}
          </div>

          <!-- Text -->
          <h3 class="text-lg font-bold text-slate-900 dark:text-white pt-2">
            {{ step.title }}
          </h3>
          
          <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
            {{ step.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
