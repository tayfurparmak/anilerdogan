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
      stats: profileData.stats
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
          children: JSON.stringify(personSchema)
        }
      ]
    })
  }
})
</script>

<template>
  <div class="space-y-0 bg-slate-950 text-white min-h-screen">
    <!-- Hero Profile Section -->
    <section class="py-24 lg:py-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <!-- Text -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
            <UIcon name="i-heroicons-user" class="w-4 h-4" />
            <span>Özgeçmiş & Vizyon</span>
          </div>
          
          <h1 class="text-4xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
            Ben <span class="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">{{ profile.name }}</span>. <br />
            Liderlik ve Teknoloji Dönüşüm Ortağınızım.
          </h1>

          <p class="text-base text-slate-300 leading-relaxed font-sans font-light">
            {{ profile.title }} olarak; yöneticilere, teknoloji ve ürün takımlarına özel, sonuç odaklı modern koçluk ve strateji çözümleri sunuyorum.
          </p>

          <p class="text-base text-slate-400 leading-relaxed font-sans font-light">
            {{ profile.bio }}
          </p>

          <div class="flex flex-wrap gap-3 pt-2">
            <span class="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-semibold text-cyan-300">
              <UIcon name="i-heroicons-check-badge" class="w-4 h-4" />
              <span>ICF Professional Coach</span>
            </span>
            <span class="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-semibold text-emerald-300">
              <UIcon name="i-heroicons-bolt" class="w-4 h-4" />
              <span>Certified Agile Leader</span>
            </span>
            <span class="inline-flex items-center space-x-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-xs font-semibold text-indigo-300">
              <UIcon name="i-heroicons-academic-cap" class="w-4 h-4" />
              <span>Scrum Alliance PO</span>
            </span>
          </div>
        </div>

        <!-- Image -->
        <div class="lg:col-span-5 flex justify-center">
          <div class="relative w-80 h-[460px] sm:w-96 sm:h-[500px] rounded-[44px] overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
            <img
              :src="profile.avatar"
              :alt="profile.name"
              loading="eager"
              decoding="async"
              class="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="bg-slate-900/60 py-20 border-y border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-3">
          <span class="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest">Çalışma İlkelerim</span>
          <h2 class="text-3xl font-bold font-serif text-white">Değerlerim ve Dönüşüm Felsefem</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="(val, idx) in values"
            :key="idx"
            class="bg-slate-950 border border-slate-800 p-8 rounded-3xl space-y-3 hover:border-cyan-500/40 transition-colors shadow-lg"
          >
            <div class="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <UIcon name="i-heroicons-sparkles" class="w-5 h-5" />
            </div>
            <h3 class="text-lg font-bold text-white font-serif">{{ val.title }}</h3>
            <p class="text-xs text-slate-400 leading-relaxed font-light">{{ val.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Career Timeline -->
    <section class="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div class="text-center space-y-3">
        <span class="text-xs font-bold font-mono text-cyan-400 uppercase tracking-widest">Kariyer Yolculuğu</span>
        <h2 class="text-3xl font-bold font-serif text-white">Deneyim & Dönüm Noktaları</h2>
      </div>

      <div class="space-y-6">
        <div
          v-for="(t, idx) in timeline"
          :key="idx"
          class="bg-slate-900/80 border border-slate-800 p-8 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-cyan-500/40 transition-all shadow-xl"
        >
          <div class="space-y-2">
            <span class="text-xs font-mono font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              {{ t.year }}
            </span>
            <h3 class="text-xl font-bold text-white font-serif">{{ t.role }}</h3>
            <span class="text-xs font-semibold text-slate-400 block">{{ t.company }}</span>
            <p class="text-xs text-slate-400 leading-relaxed font-light max-w-2xl pt-1">
              {{ t.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
