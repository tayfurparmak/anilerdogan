<script setup lang="ts">
import { ref, computed } from 'vue'
import { educationData } from '~/data/mockData'
import EducationCard from '~/components/cards/EducationCard.vue'
import { useSeo } from '~/composables/useSeo'

useSeo(
  'Eğitimler & Programlar',
  'Liderlik, teknoloji ve ürün yönetimi konularında profesyonel gelişim eğitimlerimizi inceleyin.'
)

const supabase = useSupabaseClient()

// Fetch educations from Supabase
const { data: dbEducations } = await useAsyncData('educations-list-public', async () => {
  try {
    const { data } = await supabase
      .from('educations')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data
  } catch (e) {
    return null
  }
})

const activeEducations = computed(() => {
  if (dbEducations.value && dbEducations.value.length > 0) {
    return dbEducations.value.map((e: any) => ({
      id: e.id,
      title: e.title,
      description: e.description,
      duration: '4 Hafta',
      price: 'Fiyat Bilgisi Alın',
      level: 'Orta / İleri Seviye',
      image: e.image_url || 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
      slug: e.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      features: [
        'Canlı Dersler & Atölyeler',
        'Katılım Sertifikası',
        'Discord Topluluk Erişimi'
      ],
      isActive: e.is_published
    }))
  }
  return educationData.filter(e => e.isActive)
})

const selectedLevel = ref('Tümü')
const levels = ['Tümü', 'Orta / İleri Seviye', 'Her Seviye İçin Uygun']

const filteredEducations = computed(() => {
  if (selectedLevel.value === 'Tümü') {
    return activeEducations.value
  }
  return activeEducations.value.filter(e => e.level === selectedLevel.value)
})
</script>

<template>
  <div class="py-16 space-y-16 bg-slate-950 text-white min-h-screen">
    <!-- Header Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
          <UIcon name="i-heroicons-academic-cap" class="w-4 h-4" />
          <span>Profesyonel Akademi</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
          Liderlik ve AI Gelişim Programları
        </h1>

        <p class="text-base sm:text-lg text-slate-400 leading-relaxed font-sans font-light">
          İş hayatında fark yaratmanızı sağlayacak metodolojileri ve pratikleri kapsayan, canlı eğitim sınıfları.
        </p>
      </div>
    </section>

    <!-- Filters & Grid -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <!-- Levels Filter Tabs -->
      <div class="flex justify-center">
        <div class="bg-slate-900 p-1.5 rounded-full flex space-x-1 border border-slate-800">
          <button
            v-for="lvl in levels"
            :key="lvl"
            class="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300"
            :class="selectedLevel === lvl
              ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-md font-bold'
              : 'text-slate-400 hover:text-white'"
            @click="selectedLevel = lvl"
          >
            {{ lvl }}
          </button>
        </div>
      </div>

      <!-- Educations Grid -->
      <div v-if="filteredEducations.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EducationCard
          v-for="edu in filteredEducations"
          :key="edu.id"
          :education="edu"
        />
      </div>
      
      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-slate-900/60 rounded-3xl border border-slate-800 max-w-lg mx-auto">
        <span class="text-4xl mb-4 block">🔍</span>
        <h3 class="text-base font-bold text-white mb-2">Eğitim Bulunamadı</h3>
        <p class="text-xs text-slate-400 font-light">Bu seviyede aktif bir eğitim programı bulunmamaktadır.</p>
      </div>
    </section>

    <!-- Corporate Training Call -->
    <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 text-center space-y-6 shadow-2xl">
        <h3 class="text-xl sm:text-3xl font-bold font-serif">Şirketinize Özel Kurumsal Sınıflar</h3>
        <p class="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-light">
          Eğitimlerimi şirketinizin teknik ihtiyaçlarına ve organizasyonel yapısına göre özelleştirerek kurumsal sınıflar halinde gerçekleştiriyorum.
        </p>
        <UButton
          to="/iletisim"
          color="primary"
          size="lg"
          class="rounded-full px-8 py-3.5 font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950"
        >
          Teklif Alın & Görüşelim
        </UButton>
      </div>
    </section>
  </div>
</template>
