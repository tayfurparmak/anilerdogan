<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { servicesData } from '~/data/mockData'
import { useSeo } from '~/composables/useSeo'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const supabase = useSupabaseClient()

// Fetch service by slug from Supabase
const { data: dbService } = await useAsyncData(`service-${slug}`, async () => {
  try {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single()
    return data
  } catch (e) {
    return null
  }
})

const service = computed(() => {
  if (dbService.value) {
    const s = dbService.value
    return {
      id: s.id,
      title: s.title,
      shortDescription: s.short_description,
      fullDescription: s.description,
      features: [
        'Birebir 60 dakikalık derinlemesine seanslar',
        'Stratejik karar alma ve kriz yönetimi pratikleri',
        'Ekiplerle iletişim ve geri bildirim döngüleri kurma',
        'E-posta ve mesaj yoluyla seans dışı sınırsız soru-cevap desteği'
      ],
      duration: 'Hizmet Periyodu',
      price: 'Teklif Alınız',
      slug: s.slug,
      icon: s.icon || 'i-heroicons-cpu-chip',
      isActive: s.is_published
    }
  }
  return servicesData.find(s => s.slug === slug)
})

onMounted(() => {
  if (!service.value) {
    router.replace('/404')
  }
})

watchEffect(() => {
  if (service.value) {
    useSeo(service.value.title, service.value.shortDescription)

    const routePath = `https://anilerdogan.com/danismanlik/${slug}`
    
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": service.value.title,
      "description": service.value.shortDescription,
      "provider": {
        "@type": "Person",
        "name": "Anıl Erdoğan",
        "url": "https://anilerdogan.com/hakkimda"
      },
      "areaServed": "TR"
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(serviceSchema)
        }
      ]
    })
  }
})

const faqs = [
  {
    q: 'Bu program kimler için uygundur?',
    a: 'Program, ilgili başlıkta gelişim göstermek isteyen, değişime açık ve düzenli seans katılımı sağlayabilecek profesyoneller, yöneticiler ve teknoloji ekipleri için tasarlanmıştır.'
  },
  {
    q: 'Görüşmeler yüz yüze mi yoksa online mı yapılıyor?',
    a: 'Görüşmelerimiz varsayılan olarak Zoom, Google Meet veya MS Teams üzerinden çevrimiçi (online) olarak gerçekleştirilmektedir.'
  },
  {
    q: 'Ödeme ve faturalandırma süreci nasıl ilerliyor?',
    a: 'Hizmet başlangıcında fatura düzenlenir ve ödeme havale/EFT veya kredi kartı ile tahsil edilir.'
  }
]
</script>

<template>
  <div v-if="service" class="py-16 space-y-16 bg-slate-950 text-white min-h-screen">
    <!-- Header Block -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl space-y-6">
        <!-- Back Button -->
        <NuxtLink
          to="/danismanlik"
          class="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
          <span>Tüm Danışmanlık Hizmetlerine Dön</span>
        </NuxtLink>

        <h1 class="text-3xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
          {{ service.title }}
        </h1>
        
        <p class="text-lg text-slate-300 font-sans font-light leading-relaxed">
          {{ service.shortDescription }}
        </p>
      </div>
    </section>

    <!-- Details Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <!-- Main Description -->
        <div class="lg:col-span-8 space-y-8">
          <div class="bg-slate-900/90 border border-slate-800 rounded-[32px] p-8 sm:p-10 space-y-6 shadow-2xl">
            <h2 class="text-xl font-bold text-white font-serif">
              Hizmet Hakkında Detaylar
            </h2>
            <p class="text-sm text-slate-300 leading-relaxed font-sans font-light whitespace-pre-line">
              {{ service.fullDescription }}
            </p>
          </div>

          <!-- What is included (Features) -->
          <div class="bg-slate-900/90 border border-slate-800 rounded-[32px] p-8 sm:p-10 space-y-6 shadow-2xl">
            <h2 class="text-xl font-bold text-white font-serif">
              Sürece Neler Dahil?
            </h2>
            
            <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <li
                v-for="(feature, idx) in service.features"
                :key="idx"
                class="flex items-start text-sm text-slate-300 font-sans font-light"
              >
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-emerald-400 mr-3 mt-0.5 shrink-0" />
                <span>{{ feature }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar / Booking Box -->
        <div class="lg:col-span-4 sticky top-24 space-y-6">
          <div class="bg-slate-900 border border-slate-800 rounded-[32px] p-8 space-y-6 shadow-2xl">
            <div>
              <span class="text-xs text-slate-500 font-mono block mb-1">Paket Süresi</span>
              <span class="text-lg font-semibold block text-white">{{ service.duration }}</span>
            </div>
            
            <div class="pt-4 border-t border-slate-800">
              <span class="text-xs text-slate-500 font-mono block mb-1">Yatırım Tutarı</span>
              <span class="text-3xl font-extrabold text-cyan-400 block font-mono">{{ service.price }}</span>
              <span class="text-[10px] text-slate-500 mt-1 block">* KDV Dahil değildir.</span>
            </div>

            <UButton
              to="/iletisim"
              color="primary"
              block
              size="lg"
              class="rounded-full py-3.5 font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:scale-105 transition-all justify-center"
            >
              Strateji Seansı Planla
            </UButton>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h2 class="text-2xl font-bold text-white font-serif text-center mb-10">
        Sıkça Sorulan Sorular
      </h2>

      <div class="space-y-4">
        <div
          v-for="(faq, idx) in faqs"
          :key="idx"
          class="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg"
        >
          <h3 class="font-bold text-sm text-white mb-2 flex items-center">
            <UIcon name="i-heroicons-question-mark-circle" class="w-5 h-5 text-cyan-400 mr-2" />
            {{ faq.q }}
          </h3>
          <p class="text-xs text-slate-400 font-sans font-light leading-relaxed pl-7">
            {{ faq.a }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
