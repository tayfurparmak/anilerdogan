<script setup lang="ts">
import { servicesData } from '~/data/mockData'
import ServiceCard from '~/components/cards/ServiceCard.vue'
import { useSeo } from '~/composables/useSeo'

useSeo(
  'Danışmanlık Hizmetleri',
  'Yönetici koçluğu, liderlik gelişimi, teknoloji ve ürün yönetimi danışmanlığı hakkında detaylı bilgi edinin.'
)

const supabase = useSupabaseClient()

// Fetch services from Supabase
const { data: dbServices } = await useAsyncData('services-list-public', async () => {
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
        'Birebir detaylı seanslar',
        'Stratejik karar alma pratikleri',
        'Seans dışı sınırsız soru-cevap desteği'
      ], // Fallback default features
      duration: 'Bireysel Seanslar',
      price: 'Teklif Alınız',
      slug: s.slug,
      icon: s.icon || 'i-heroicons-cpu-chip',
      isActive: s.is_published
    }))
  }
  // Fallback to local mock data
  return servicesData.filter(s => s.isActive)
})
</script>

<template>
  <div class="py-12 space-y-20">
    <!-- Header Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Hizmet Modellerim</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif leading-tight">
          Profesyonel Danışmanlık ve Koçluk Çözümleri
        </h1>

        <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
          İster kariyer yolculuğunda bir lider olun, ister büyüme aşamasındaki bir teknoloji şirketi; ihtiyaçlarınıza özel olarak yapılandırılmış sonuç odaklı danışmanlık hizmetlerim.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ServiceCard
          v-for="service in activeServices"
          :key="service.id"
          :service="service"
        />
      </div>
    </section>

    <!-- Process / Accordion info -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 sm:p-12 space-y-8">
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white font-serif text-center mb-4">
          Süreç Nasıl İlerliyor?
        </h2>

        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <span class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white mb-1">Ön Görüşme</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Talep ettiğiniz hizmet için 30 dakikalık bir ücretsiz video görüşme gerçekleştiririz. Sorunları ve hedefleri ortaya koyarız.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <span class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white mb-1">Program Tasarımı</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Görüşme çıktılarına göre kişiselleştirilmiş program tasarımı ve bütçelendirmeyi hazırlar, onayınıza sunarım.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <span class="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-600 font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white mb-1">Seanslar ve Süreç Takibi</h3>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
                Plan dahilinde seanslara başlarız. Süreç boyunca takipleri yapar, ara hedeflere ulaşıp ulaşmadığımızı kontrol ederiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
