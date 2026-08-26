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
      ],
      duration: 'Bireysel Seanslar',
      price: 'Teklif Alınız',
      slug: s.slug,
      icon: s.icon || 'i-heroicons-cpu-chip',
      isActive: s.is_published
    }))
  }
  return servicesData.filter(s => s.isActive)
})
</script>

<template>
  <div class="py-16 space-y-20 bg-slate-950 text-white min-h-screen">
    <!-- Header Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
          <UIcon name="i-heroicons-briefcase" class="w-4 h-4" />
          <span>Hizmet Modellerim</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
          Danışmanlık ve Koçluk Çözümleri
        </h1>

        <p class="text-base sm:text-lg text-slate-400 leading-relaxed font-sans font-light">
          Kariyer yolculuğunuzda bir lider veya büyüme aşamasındaki bir teknoloji organizasyonu için özel kurgulanmış danışmanlık paketleri.
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
      <div class="bg-slate-900/90 border border-slate-800 rounded-[32px] p-8 sm:p-12 space-y-8 shadow-2xl">
        <h2 class="text-2xl font-bold text-white font-serif text-center mb-4">
          Süreç Nasıl İlerliyor?
        </h2>

        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <span class="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center shrink-0">1</span>
            <div>
              <h3 class="font-bold text-white mb-1 font-serif">Ön Görüşme</h3>
              <p class="text-xs text-slate-400 leading-relaxed font-light">
                Talep ettiğiniz hizmet için 30 dakikalık bir ücretsiz video görüşme gerçekleştiririz. Sorunları ve hedefleri ortaya koyarız.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <span class="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center shrink-0">2</span>
            <div>
              <h3 class="font-bold text-white mb-1 font-serif">Program Tasarımı</h3>
              <p class="text-xs text-slate-400 leading-relaxed font-light">
                Görüşme çıktılarına göre kişiselleştirilmiş program tasarımı ve bütçelendirmeyi hazırlar, onayınıza sunarım.
              </p>
            </div>
          </div>

          <div class="flex items-start space-x-4">
            <span class="w-8 h-8 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-bold flex items-center justify-center shrink-0">3</span>
            <div>
              <h3 class="font-bold text-white mb-1 font-serif">Seanslar ve Süreç Takibi</h3>
              <p class="text-xs text-slate-400 leading-relaxed font-light">
                Plan dahilinde seanslara başlarız. Süreç boyunca takipleri yapar, ara hedeflere ulaşıp ulaşmadığımızı kontrol ederiz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
