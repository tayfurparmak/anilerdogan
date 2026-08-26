<script setup lang="ts">
import { testimonialsData } from '~/data/mockData'

const supabase = useSupabaseClient()

// Fetch testimonials from Supabase
const { data: dbTestimonials } = await useAsyncData('testimonials-public', async () => {
  try {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true })
    return data
  } catch (e) {
    return null
  }
})

const testimonials = computed(() => {
  if (dbTestimonials.value && dbTestimonials.value.length > 0) {
    return dbTestimonials.value.map((t: any) => ({
      id: t.id,
      name: t.name,
      role: t.position,
      company: t.company,
      quote: t.content,
      avatar: t.image_url || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      rating: 5
    }))
  }
  // Fallback to local mock data
  return testimonialsData
})
</script>

<template>
  <section class="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Referanslar</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-serif">
          Danışan Yorumları
        </h2>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
          Birlikte çalıştığımız yöneticilerin, ürün liderlerinin ve kurucuların başarı hikayeleri ve deneyimleri.
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <!-- Stars -->
            <div class="flex space-x-1 mb-6">
              <UIcon
                v-for="star in 5"
                :key="star"
                name="i-heroicons-star"
                class="w-4 h-4 text-amber-500"
              />
            </div>

            <!-- Quote -->
            <p class="text-sm text-slate-600 dark:text-slate-400 italic leading-relaxed font-sans font-light mb-6">
              "{{ item.quote }}"
            </p>
          </div>

          <!-- Profile -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-800/60 flex items-center space-x-4">
            <img
              :src="item.avatar"
              :alt="item.name + ' profil fotoğrafı'"
              loading="lazy"
              decoding="async"
              width="48"
              height="48"
              class="w-12 h-12 rounded-full object-cover shrink-0"
            />
            <div>
              <span class="block text-sm font-bold text-slate-900 dark:text-white">{{ item.name }}</span>
              <span class="block text-xs text-slate-400">{{ item.role }}, {{ item.company }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
