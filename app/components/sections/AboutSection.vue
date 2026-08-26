<script setup lang="ts">
import { profileData } from '~/data/mockData'

const pillars = [
  {
    title: 'Sonuç Odaklı Koçluk',
    desc: 'Teorik anlatımlar yerine tamamen pratik, iş hayatında karşılık bulan teknikler ve eylem planları.',
    icon: 'i-heroicons-chart-bar'
  },
  {
    title: 'Teknolojik Liderlik',
    desc: 'Sektörün dinamiklerine hakim, modern yazılım mühendisliği ve ürün yönetimi metodolojileriyle uyumlu stratejiler.',
    icon: 'i-heroicons-cpu-chip'
  },
  {
    title: 'Psikolojik Güvenlik',
    desc: 'Takımların çekinmeden fikir üretebildiği, hata yapmaktan korkmadığı yüksek performanslı kültür inşası.',
    icon: 'i-heroicons-shield-check'
  },
  {
    title: 'Bireysel Dönüşüm',
    desc: 'Kariyer geçişleri ve yönetici rollerinde özgüveni, delegasyonu ve stratejik karar alma yeteneğini parlatma.',
    icon: 'i-heroicons-academic-cap'
  }
]
</script>

<template>
  <section class="py-20 lg:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <!-- Content Block -->
        <div class="lg:col-span-6 space-y-6">
          <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span>Hakkımda</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white leading-tight font-serif">
            Profesyonel Gelişiminize ve <br class="hidden sm:inline" />
            Teknoloji Yolculuğunuza Yön Verin
          </h2>

          <p class="text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-light">
            {{ profileData.bio }}
          </p>

          <p class="text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-light">
            Yıllar boyunca hem start-up'larda hem de ölçeklenmiş kurumsal şirketlerde teknoloji departmanları yönettim, ürün ekipleri kurdum. Şimdi bu birikimi, liderlerin ve organizasyonların daha sürdürülebilir bir büyüme yakalaması için kullanıyorum.
          </p>

          <div class="pt-4">
            <UButton
              to="/hakkimda"
              color="emerald"
              variant="link"
              icon="i-heroicons-arrow-long-right"
              trailing
              class="font-semibold text-emerald-600 dark:text-emerald-400 p-0 text-base"
            >
              Hikayemin Tamamını Oku
            </UButton>
          </div>
        </div>

        <!-- Pillars Grid -->
        <div class="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="(pillar, idx) in pillars"
            :key="idx"
            class="bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-6 hover:shadow-lg transition-all duration-300"
          >
            <div class="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center mb-4">
              <UIcon :name="pillar.icon" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2">
              {{ pillar.title }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              {{ pillar.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
