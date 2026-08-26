<script setup lang="ts">
import { educationData } from '~/data/mockData'
import EducationCard from '~/components/cards/EducationCard.vue'

const supabase = useSupabaseClient()

// Fetch educations from Supabase
const { data: dbEducations } = await useAsyncData('educations-public', async () => {
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
  // Fallback to local mock data
  return educationData.filter(e => e.isActive)
})
</script>

<template>
  <section class="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="max-w-xl space-y-4">
          <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span>Eğitim Programları</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-serif">
            Liderlik ve Ürün Eğitimleri
          </h2>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
            Teoriyi pratiğe dönüştüren, gerçek vaka analizleri ve grup çalışmalarıyla zenginleştirilmiş profesyonel gelişim programları.
          </p>
        </div>
        
        <div>
          <UButton
            to="/egitimler"
            color="emerald"
            variant="outline"
            class="rounded-full px-6 font-medium"
          >
            Tüm Eğitimleri Gör
          </UButton>
        </div>
      </div>

      <!-- Educations Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <EducationCard
          v-for="edu in activeEducations"
          :key="edu.id"
          :education="edu"
        />
      </div>
    </div>
  </section>
</template>
