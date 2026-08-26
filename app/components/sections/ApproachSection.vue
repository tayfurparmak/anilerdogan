<script setup lang="ts">
const steps = [
  {
    num: '01',
    title: 'Keşif & Ön Değerlendirme',
    icon: 'i-heroicons-magnifying-glass',
    desc: 'İlk adımda, hedeflerinizi, mevcut zorluklarınızı ve beklentilerinizi analiz etmek için 30 dakikalık ücretsiz bir ön görüşme gerçekleştiriyoruz.'
  },
  {
    num: '02',
    title: 'Derin Analiz & Teşhis',
    icon: 'i-heroicons-chart-bar',
    desc: 'Mevcut durumunuzu, liderlik yetkinliklerinizi ve mimari yapınızı analiz ederek gelişim alanlarını kesin verilerle tespit ediyoruz.'
  },
  {
    num: '03',
    title: 'Stratejik Yol Haritası',
    icon: 'i-heroicons-map',
    desc: 'Ölçülebilir OKR ve KPI hedefleri içeren, size ve organizasyonunuza özel adım adım uygulanabilir bir aksiyon planı ve takvim çıkarıyoruz.'
  },
  {
    num: '04',
    title: 'Uygulama & Koçluk',
    icon: 'i-heroicons-fire',
    desc: 'Periyodik birebir koçluk seansları, atölyeler ve pratik ödevlerle süreci işletiyor; seans aralarında da doğrudan iletişim desteği sunuyorum.'
  },
  {
    num: '05',
    title: 'Ölçüm & Sürdürülebilirlik',
    icon: 'i-heroicons-arrow-trending-up',
    desc: 'Çalışma periyodu sonunda elde edilen gelişimi analiz ediyor; kazanımların kalıcı ve organizasyonel kültüre entegre olması için takip sistemi kuruyoruz.'
  }
]
</script>

<template>
  <section class="py-28 bg-slate-950 text-white relative border-b border-slate-800/60 overflow-hidden">
    <!-- Background Ambient Mesh -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 blur-[140px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
          <span>Progressive Execution Methodology</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          5 Adımda Stratejik Çalışma Süreci
        </h2>
        <p class="text-slate-400 text-base leading-relaxed font-light">
          Sürdürülebilir başarı ve dönüşüm şans eseri değildir. Metodolojik ve ölçülebilir 5 aşamalı sürecimiz.
        </p>
      </div>

      <!-- Progressive Timeline Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
        <div
          v-for="(step, idx) in steps"
          :key="idx"
          class="bg-slate-900/60 border border-slate-800/80 p-6 rounded-3xl relative flex flex-col justify-between group hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 shadow-xl"
        >
          <!-- Top Row: Icon & Step Number -->
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <UIcon :name="step.icon" class="w-5 h-5" />
              </div>
              <span class="text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                STAGE {{ step.num }}
              </span>
            </div>

            <h3 class="text-base font-bold text-white font-serif group-hover:text-cyan-300 transition-colors">
              {{ step.title }}
            </h3>

            <p class="text-xs text-slate-400 leading-relaxed font-light">
              {{ step.desc }}
            </p>
          </div>

          <!-- Bottom Status Indicator -->
          <div class="pt-6 border-t border-slate-800/60 mt-6 flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span class="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Aşama {{ step.num }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
