<script setup lang="ts">
import { profileData } from '~/data/mockData'
import { useSeo } from '~/composables/useSeo'

useSeo(
  'Hakkımda',
  'Anıl Erdoğan kimdir? 15 yılı aşkın teknoloji ve liderlik tecrübesiyle yönetici koçluğu ve danışmanlık kariyeri.'
)

const supabase = useSupabaseClient()

// Fetch Profile from Supabase
const { data: dbProfile } = await useAsyncData('profile-public', async () => {
  try {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
      .single()
    return data
  } catch (e) {
    return null
  }
})

const profile = computed(() => {
  if (dbProfile.value) {
    const p = dbProfile.value as any
    return {
      name: p.full_name,
      title: p.title,
      bio: p.bio,
      avatar: p.profile_image || profileData.avatar,
      stats: profileData.stats // default fallback stats
    }
  }
  return profileData
})

const timeline = [
  {
    year: '2022 - Günümüz',
    role: 'Yönetici Koçu & Yönetim Danışmanı',
    company: 'Serbest / Freelance',
    desc: 'Liderler, teknoloji yöneticileri ve kurucu ortaklar için birebir liderlik koçluğu, organizasyon tasarımı ve ürün/teknoloji stratejisi danışmanlığı sunuyorum.'
  },
  {
    year: '2019 - 2022',
    role: 'Teknoloji Direktörü (VP of Engineering)',
    company: 'Fintech Scale-up',
    desc: '40+ kişilik yazılım ve ürün ekibinin yönetimini üstlendim. Sistem mimarisinin modernizasyonu, Agile dönüşüm ve organizasyonel ölçekleme süreçlerini başarıyla yönettim.'
  },
  {
    year: '2015 - 2019',
    role: 'Ürün Yönetimi Lideri (Head of Product)',
    company: 'SaaS Startup',
    desc: 'Sıfırdan küresel pazara açılan bir SaaS ürününün ürün yaşam döngüsünü yönettim. Ürün stratejisi, roadmap yönetimi ve büyüme metriklerinin takibinden sorumlu oldum.'
  },
  {
    year: '2010 - 2015',
    role: 'Kıdemli Yazılım Mimarı / Yazılım Ekip Lideri',
    company: 'Çeşitli Yazılım Evleri & Ajanslar',
    desc: 'Büyük ölçekli web uygulamalarının, veri tabanı mimarilerinin geliştirilmesinde teknik liderlik yaptım. Geliştirme standartlarının belirlenmesinde rol aldım.'
  }
]

const values = [
  {
    title: 'Şeffaflık ve Dürüstlük',
    desc: 'Çalışmalarımda her zaman net, dürüst ve yapıcı geri bildirimler sunarım. Danışanlarımla güvene dayalı açık ilişkiler kurarım.'
  },
  {
    title: 'Pratik ve Sonuç Odaklılık',
    desc: 'Teorik kalıplarla zaman kaybetmek yerine, iş hayatında karşılığı olan pratik pratikleri ve ölçülebilir sonuçları hedeflerim.'
  },
  {
    title: 'Sürekli Öğrenme',
    desc: 'Değişen teknoloji ve yönetim pratiklerini yakından takip eder, bilgilerimi günceller ve edindiğim güncel yaklaşımları seanslarıma taşırım.'
  }
]
// Set SEO Meta
watchEffect(() => {
  if (profile.value) {
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": profile.value.name,
      "jobTitle": profile.value.title,
      "description": profile.value.bio,
      "image": profile.value.avatar,
      "url": "https://anilerdogan.com/hakkimda"
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(personSchema)
        } as any
      ]
    })
  }
})
</script>

<template>
  <div class="py-12 space-y-20">
    <!-- Intro Header -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span>Özgeçmiş & Vizyon</span>
          </div>
          
          <h1 class="text-4xl font-extrabold text-slate-900 dark:text-white font-serif leading-tight">
            Ben <span class="text-emerald-600 dark:text-emerald-400">{{ profile.name }}</span>. <br />
            Liderlik ve Teknoloji Dönüşüm Ortacınızım.
          </h1>

          <p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-light">
            {{ profile.title }} olarak; yöneticilere, teknoloji ve ürün takımlarına özel, sonuç odaklı modern koçluk çözümleri sunuyorum.
          </p>

          <p class="text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-light">
            {{ profile.bio }}
          </p>

          <div class="flex flex-wrap gap-4 pt-2">
            <span class="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
              🏆 ICF Professional Coach
            </span>
            <span class="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
              ⚡ Certified Agile Leader
            </span>
            <span class="inline-flex items-center px-4 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300">
              🛠 Scrum Alliance PO
            </span>
          </div>
        </div>

        <!-- Image -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-80 h-[450px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
            <img
              :src="profile.avatar"
              :alt="profile.name"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="bg-slate-50 dark:bg-slate-950 py-16 border-y border-slate-100 dark:border-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif mb-12 text-center">
          Çalışma Değerlerim
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(val, idx) in values"
            :key="idx"
            class="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 hover:shadow-lg transition-all duration-300"
          >
            <span class="text-3xl mb-4 block">💡</span>
            <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-3">
              {{ val.title }}
            </h3>
            <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light">
              {{ val.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Timeline -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <h2 class="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-serif mb-16 text-center">
        Kariyer Yolculuğum
      </h2>

      <div class="relative border-l border-slate-200 dark:border-slate-800 ml-4 md:ml-0 space-y-12">
        <div
          v-for="(job, idx) in timeline"
          :key="idx"
          class="relative pl-8 md:pl-12"
        >
          <!-- Bullet Point -->
          <div class="absolute -left-[9px] top-1.5 w-4.5 h-4.5 rounded-full border-4 border-white dark:border-slate-950 bg-emerald-500" />
          
          <div class="space-y-2">
            <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              {{ job.year }}
            </span>
            
            <h3 class="text-lg font-bold text-slate-900 dark:text-white">
              {{ job.role }}
            </h3>
            
            <span class="block text-xs font-semibold text-slate-500 dark:text-slate-400">
              {{ job.company }}
            </span>
            
            <p class="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed pt-2">
              {{ job.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Simple call to contact -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
      <div class="bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-6">
        <h3 class="text-xl sm:text-2xl font-bold font-serif">Kişisel Yol Haritanızı Çıkarmaya Başlayalım</h3>
        <p class="text-sm text-emerald-50 font-light max-w-xl mx-auto">
          İş hayatınızda veya ekibinizde yaşadığınız zorlukları analiz edip, size özel bir süreç başlatmak için benimle dilediğiniz zaman iletişime geçebilirsiniz.
        </p>
        <UButton
          to="/iletisim"
          color="neutral"
          variant="solid"
          class="bg-white hover:bg-slate-100 text-slate-900 rounded-full font-medium px-8 py-3.5"
        >
          İletişime Geçin
        </UButton>
      </div>
    </section>
  </div>
</template>
