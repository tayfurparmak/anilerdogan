<script setup lang="ts">
import { profileData } from '~/data/mockData'
</script>

<template>
  <section class="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
    <!-- Background Gradients -->
    <div class="absolute inset-0 z-0">
      <div class="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-3xl" />
      <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-teal-500/10 dark:bg-teal-500/5 blur-3xl" />
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <!-- Hero Text -->
        <div class="lg:col-span-7 text-center lg:text-left space-y-6">
          <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <UIcon name="i-heroicons-sparkles" class="w-4 h-4 shrink-0" />
            <span>Premium Bireysel & Kurumsal Danışmanlık</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
            Potansiyelinizi Harekete Geçirin, <br class="hidden sm:inline" />
            <span class="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">Liderliğinizi Güçlendirin</span>
          </h1>

          <p class="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-light">
            {{ profileData.title }} olarak; yöneticilere, teknoloji ve ürün takımlarına özel, sonuç odaklı modern koçluk ve strateji çözümleri sunuyorum.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <UButton
              to="/danismanlik"
              color="emerald"
              size="lg"
              class="rounded-full px-8 py-4 font-semibold text-base shadow-lg shadow-emerald-500/20"
            >
              Hizmetleri İnceleyin
            </UButton>
            
            <UButton
              to="/iletisim"
              color="neutral"
              variant="outline"
              size="lg"
              class="rounded-full px-8 py-4 font-semibold text-base"
            >
              Tanışma Seansı Planla
            </UButton>
          </div>

          <!-- Social Proof / Mini Stats -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-200/50 dark:border-slate-800/50 text-center lg:text-left">
            <div>
              <span class="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ profileData.stats.experience }}</span>
              <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Sektör Deneyimi</span>
            </div>
            <div>
              <span class="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ profileData.stats.clients }}</span>
              <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Başarılı Danışan</span>
            </div>
            <div>
              <span class="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ profileData.stats.trainings }}</span>
              <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Tamamlanan Eğitim</span>
            </div>
            <div>
              <span class="block text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{{ profileData.stats.satisfaction }}</span>
              <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">Memnuniyet Oranı</span>
            </div>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="lg:col-span-5 relative flex justify-center lg:justify-end">
          <!-- Geometric Decorative Accents -->
          <div class="absolute -top-4 -left-4 w-72 h-72 rounded-full border border-slate-200 dark:border-slate-800 -z-10" />
          <div class="absolute -bottom-8 -right-8 w-60 h-60 rounded-full border border-slate-200/60 dark:border-slate-800/40 -z-10" />
          
          <div class="relative w-72 h-96 sm:w-80 sm:h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 rotate-1 hover:rotate-0 transition-transform duration-500">
            <img
              :src="profileData.avatar"
              :alt="profileData.name + ' profil fotoğrafı'"
              loading="eager"
              decoding="async"
              width="320"
              height="450"
              class="w-full h-full object-cover"
            />
            
            <!-- Float Card -->
            <div class="absolute bottom-6 left-6 right-6 glass-effect p-4 rounded-2xl flex items-center space-x-3">
              <div class="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <UIcon name="i-heroicons-check-badge" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <span class="block text-xs font-semibold text-slate-900 dark:text-white">ICF Onaylı Profesyonel</span>
                <span class="block text-[10px] text-slate-500">Uluslararası Koçluk Federasyonu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
