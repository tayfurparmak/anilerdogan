<script setup lang="ts">
import { servicesData } from '~/data/mockData'
import ServiceCard from '~/components/cards/ServiceCard.vue'

const supabase = useSupabaseClient()

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
      shortDescription: s.short_description,
      fullDescription: s.description,
      features: [
        'Birebir detaylı görüşmeler',
        'Stratejik yol haritası ve takipleri',
        'Seans dışı soru-cevap desteği'
      ], // Fallback default features
      duration: 'Bireysel Seanslar',
      price: 'Teklif Alınız',
      slug: s.slug,
      icon: s.icon || 'i-heroicons-cpu-chip',
      isActive: s.is_published
    }))
  }
  // Fallback to local mock data if database is empty/error
  return servicesData.filter(s => s.isActive)
})
</script>

<template>
  <section class="py-20 lg:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="max-w-xl space-y-4">
          <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span>Danışmanlık</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-serif">
            Hizmet Modelleri
          </h2>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
            Hedeflerinize ulaşmanız için özel olarak kurgulanmış, esnek ve sonuç odaklı danışmanlık ve koçluk paketleri.
          </p>
        </div>
        
        <div>
          <UButton
            to="/danismanlik"
            color="primary"
            variant="outline"
            class="rounded-full px-6 font-medium"
          >
            Tüm Hizmetleri Gör
          </UButton>
        </div>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          v-for="service in activeServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </div>
  </section>
</template>
