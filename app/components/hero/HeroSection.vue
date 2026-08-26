<script setup lang="ts">
import { ref, onMounted } from 'vue'

const experienceCount = ref(0)
const clientsCount = ref(0)
const trainingsCount = ref(0)
const satisfactionCount = ref(0)

const animateCounters = () => {
  const duration = 2000
  const steps = 50
  const stepTime = duration / steps

  let step = 0
  const timer = setInterval(() => {
    step++
    const progress = step / steps
    experienceCount.value = Math.floor(15 * progress)
    clientsCount.value = Math.floor(150 * progress)
    trainingsCount.value = Math.floor(40 * progress)
    satisfactionCount.value = Math.floor(98 * progress)

    if (step >= steps) {
      experienceCount.value = 15
      clientsCount.value = 150
      trainingsCount.value = 40
      satisfactionCount.value = 98
      clearInterval(timer)
    }
  }, stepTime)
}

onMounted(() => {
  animateCounters()
})
</script>

<template>
  <section class="relative overflow-hidden py-24 lg:py-36 bg-slate-950 text-white border-b border-slate-800/50">
    <!-- Ambient AI Neural Mesh Grid Background -->
    <div class="absolute inset-0 z-0 opacity-30 pointer-events-none">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" stroke-width="1" />
          </pattern>
          <radialGradient id="cyan-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#06B6D4" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#090D16" stop-opacity="0" />
          </radialGradient>
          <radialGradient id="indigo-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#6366F1" stop-opacity="0.2" />
            <stop offset="100%" stop-color="#090D16" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>

    <!-- Soft Glowing Orbs -->
    <div class="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
    <div class="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <!-- Hero Text & Value Proposition -->
        <div class="lg:col-span-7 text-center lg:text-left space-y-8">
          <!-- AI Badge -->
          <div class="inline-flex items-center space-x-2.5 bg-slate-900/90 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 backdrop-blur-md shadow-lg shadow-cyan-500/10">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>2026 AI-Era Technology & Strategic Leadership Platform</span>
          </div>

          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight font-serif">
            AI Çağında İnsan Zekası & <br class="hidden sm:inline" />
            <span class="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Stratejik Liderlik
            </span>
          </h1>

          <p class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
            Yöneticilere, teknoloji liderlerine ve organizasyonlara özel; yapay zeka entegrasyonu, stratejik dönüşüm ve yüksek performanslı koçluk çözümleri.
          </p>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <UButton
              to="/iletisim"
              size="xl"
              class="rounded-full px-8 py-4 font-bold text-sm bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-xl shadow-cyan-500/25 hover:scale-[1.03] transition-all duration-300"
            >
              Strateji Seansı Planla
              <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
            </UButton>
            
            <UButton
              to="/danismanlik"
              variant="outline"
              size="xl"
              class="rounded-full px-8 py-4 font-semibold text-sm border-slate-700 hover:border-slate-500 text-slate-200 hover:bg-slate-900/60 backdrop-blur-md transition-all duration-300"
            >
              Hizmet Ekosistemini İnceleyin
            </UButton>
          </div>

          <!-- Animated Social Proof Counters -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-900 text-center lg:text-left">
            <div class="space-y-1">
              <span class="block text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">{{ experienceCount }}+</span>
              <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Yıl Sektör Deneyimi</span>
            </div>
            <div class="space-y-1">
              <span class="block text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">{{ clientsCount }}+</span>
              <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Başarılı Danışan</span>
            </div>
            <div class="space-y-1">
              <span class="block text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">{{ trainingsCount }}+</span>
              <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Tamamlanan Eğitim</span>
            </div>
            <div class="space-y-1">
              <span class="block text-3xl sm:text-4xl font-extrabold text-teal-300 font-mono">%{{ satisfactionCount }}</span>
              <span class="text-xs text-slate-400 font-medium uppercase tracking-wider">Memnuniyet Oranı</span>
            </div>
          </div>
        </div>

        <!-- Interactive AI Visual Ecosystem (Right Column) -->
        <div class="lg:col-span-5 relative flex justify-center lg:justify-end">
          <!-- Outer Animated Node Ring -->
          <div class="absolute -inset-4 rounded-full border border-cyan-500/20 animate-[spin_25s_linear_infinite] pointer-events-none" />
          <div class="absolute -inset-10 rounded-full border border-indigo-500/15 animate-[spin_35s_linear_infinite_reverse] pointer-events-none" />

          <!-- Portrait Container -->
          <div class="relative w-80 h-[460px] sm:w-96 sm:h-[520px] rounded-[48px] overflow-hidden border border-slate-800 bg-slate-900/80 shadow-2xl group hover:border-cyan-500/50 transition-all duration-500">
            <img
              src="/anil-erdogan.png"
              alt="Anıl Erdoğan - Yönetici Koçu & Teknoloji Stratejisti"
              loading="eager"
              decoding="async"
              width="400"
              height="520"
              class="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            />
            
            <!-- Dark Overlay Gradient -->
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

            <!-- Floating Badge 1: Certified Coach -->
            <div class="absolute top-6 left-6 right-6 bg-slate-950/80 backdrop-blur-xl border border-cyan-500/30 p-3.5 rounded-2xl flex items-center space-x-3 shadow-xl">
              <div class="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-check-badge" class="w-5 h-5 text-cyan-400" />
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-white">ICF Onaylı Profesyonel Koç</span>
                <span class="text-[10px] text-slate-400">International Coaching Federation</span>
              </div>
            </div>

            <!-- Floating Badge 2: AI Leadership -->
            <div class="absolute bottom-6 left-6 right-6 bg-slate-950/90 backdrop-blur-xl border border-emerald-500/30 p-4 rounded-2xl space-y-2 shadow-2xl">
              <div class="flex items-center justify-between text-xs font-semibold text-slate-200">
                <span class="flex items-center space-x-2">
                  <UIcon name="i-heroicons-cpu-chip" class="w-4 h-4 text-emerald-400" />
                  <span>Stratejik Ekosistem</span>
                </span>
                <span class="text-emerald-400 font-mono text-[11px]">%100 Odaklı</span>
              </div>
              <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div class="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full w-[95%] rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
