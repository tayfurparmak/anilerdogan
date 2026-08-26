<script setup lang="ts">
import { ref, computed } from 'vue'
import { servicesData } from '~/data/mockData'

const supabase = useSupabaseClient()
const selectedServiceIndex = ref(0)

// Fetch services from Supabase
const { data: dbServices } = await useAsyncData('services-public', async () => {
  try {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data
  } catch (e) {
    return null
  }
})

const activeServices = computed(() => {
  if (dbServices.value && dbServices.value.length > 0) {
    return dbServices.value.map((s: any) => ({
      id: s.id,
      title: s.title,
      shortDescription: s.short_description || s.description,
      fullDescription: s.description,
      targetAudience: 'Yöneticiler, Ürün Liderleri ve Mühendislik Direktörleri',
      deliverables: [
        'Kişiselleştirilmiş 1:1 Koçluk Seansları',
        'Stratejik Roadmap ve Aksiyon Takip Matrisi',
        'Süreç İçi Asenkron Soru-Cevap Desteği',
        'Sertifikalı Gelişim ve Değerlendirme Raporu'
      ],
      duration: 'Sürekli / Dönemsel',
      slug: s.slug,
      icon: s.icon || 'i-heroicons-cpu-chip'
    }))
  }
  
  return servicesData.filter(s => s.isActive).map(s => ({
    id: s.id,
    title: s.title,
    shortDescription: s.shortDescription,
    fullDescription: s.fullDescription,
    targetAudience: 'C-Level, Ürün ve Mühendislik Liderleri',
    deliverables: s.features || [
      'Birebir detaylı görüşmeler',
      'Stratejik yol haritası ve takipleri',
      'Seans dışı soru-cevap desteği'
    ],
    duration: s.duration || 'Bireysel Seanslar',
    slug: s.slug,
    icon: s.icon || 'i-heroicons-cpu-chip'
  }))
})

const currentService = computed(() => {
  return activeServices.value[selectedServiceIndex.value] || activeServices.value[0]
})
</script>

<template>
  <section class="py-28 bg-slate-900 text-white relative border-b border-slate-800/60 overflow-hidden">
    <!-- Ambient Glow Background -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Title Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="max-w-xl space-y-4">
          <div class="inline-flex items-center space-x-2 bg-slate-800 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
            <UIcon name="i-heroicons-briefcase" class="w-4 h-4" />
            <span>Interactive Service Explorer</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
            Danışmanlık & Koçluk Modelleri
          </h2>
          <p class="text-slate-400 text-base leading-relaxed font-light">
            İhtiyaçlarınıza özel kurgulanmış, ölçülebilir çıktılara sahip sonuç odaklı danışmanlık paketleri.
          </p>
        </div>

        <div>
          <UButton
            to="/danismanlik"
            variant="outline"
            class="rounded-full px-6 py-3 font-semibold text-xs border-slate-700 hover:border-cyan-400 text-slate-200"
          >
            Tüm Danışmanlık Detayları
          </UButton>
        </div>
      </div>

      <!-- Tabbed Explorer (Desktop & Tablet) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Left Side Service Navigation Tabs -->
        <div class="lg:col-span-4 space-y-3">
          <button
            v-for="(service, idx) in activeServices"
            :key="service.id"
            class="w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-center justify-between group"
            :class="[
              selectedServiceIndex === idx
                ? 'bg-slate-800/90 border-cyan-500/50 shadow-lg shadow-cyan-500/10 text-white'
                : 'bg-slate-950/60 border-slate-800/60 text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
            ]"
            @click="selectedServiceIndex = idx"
          >
            <div class="flex items-center space-x-3.5">
              <div
                class="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                :class="[
                  selectedServiceIndex === idx ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-cyan-400'
                ]"
              >
                <UIcon :name="service.icon" class="w-5 h-5" />
              </div>
              <span class="text-sm font-bold tracking-tight">{{ service.title }}</span>
            </div>
            <UIcon
              name="i-heroicons-chevron-right"
              class="w-4 h-4 transition-transform"
              :class="[selectedServiceIndex === idx ? 'text-cyan-400 translate-x-1' : 'text-slate-600']"
            />
          </button>
        </div>

        <!-- Right Side Selected Service Dynamic Display -->
        <div class="lg:col-span-8">
          <div
            v-if="currentService"
            class="bg-slate-950/90 border border-slate-800 p-8 sm:p-12 rounded-[36px] shadow-2xl backdrop-blur-xl space-y-8 relative overflow-hidden"
          >
            <!-- Background Glow -->
            <div class="absolute -bottom-20 -right-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px]" />

            <!-- Header Badge & Icon -->
            <div class="flex items-center justify-between pb-6 border-b border-slate-800">
              <div class="flex items-center space-x-3">
                <div class="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <UIcon :name="currentService.icon" class="w-6 h-6" />
                </div>
                <span class="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  Özel Yapılandırılmış Çözüm
                </span>
              </div>
              <span class="text-xs font-mono text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                {{ currentService.duration }}
              </span>
            </div>

            <!-- Service Details -->
            <div class="space-y-4">
              <h3 class="text-2xl sm:text-3xl font-extrabold text-white font-serif">
                {{ currentService.title }}
              </h3>
              <p class="text-slate-300 text-base leading-relaxed font-light">
                {{ currentService.fullDescription || currentService.shortDescription }}
              </p>
            </div>

            <!-- Target Audience -->
            <div class="bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 space-y-1">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">🎯 Hedef Kitle:</span>
              <p class="text-sm font-semibold text-slate-200">{{ currentService.targetAudience }}</p>
            </div>

            <!-- Key Deliverables List -->
            <div class="space-y-3">
              <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">📦 Paket İçi Çıktılar & Süreç:</span>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="(item, dIdx) in currentService.deliverables"
                  :key="dIdx"
                  class="flex items-start space-x-2.5 bg-slate-900/40 p-3 rounded-xl border border-slate-800/50 text-xs font-medium text-slate-200"
                >
                  <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{{ item }}</span>
                </div>
              </div>
            </div>

            <!-- CTA Action -->
            <div class="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span class="text-xs text-slate-400">Ücretsiz 30 dakikalık ön değerlendirme seansı dahildir.</span>
              <UButton
                :to="`/danismanlik/${currentService.slug}`"
                color="primary"
                class="rounded-full px-8 py-3 font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:scale-105 transition-all"
              >
                Hizmet Detayı ve Başvuru
                <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1.5" />
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
