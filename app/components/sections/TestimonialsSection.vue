<script setup lang="ts">
import { computed } from 'vue'
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
  return testimonialsData
})
</script>

<template>
  <section class="py-28 bg-slate-900 text-white relative border-b border-slate-800/60 overflow-hidden">
    <!-- Ambient Glow -->
    <div class="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div class="inline-flex items-center space-x-2 bg-slate-800 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
          <UIcon name="i-heroicons-chat-bubble-bottom-center-text" class="w-4 h-4" />
          <span>Client Trust & Testimonials</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Liderlik Değerlendirmeleri
        </h2>
        <p class="text-slate-400 text-base leading-relaxed font-light">
          Birlikte dönüştüğümüz yöneticilerin, mühendislik liderlerinin ve kurucuların tecrübeleri.
        </p>
      </div>

      <!-- Testimonial Showcase Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="item in testimonials"
          :key="item.id"
          class="bg-slate-950/80 border border-slate-800/80 rounded-[32px] p-8 hover:border-cyan-500/40 hover:bg-slate-950 transition-all duration-300 flex flex-col justify-between shadow-2xl group"
        >
          <div class="space-y-6">
            <!-- Stars & Trust Badge -->
            <div class="flex items-center justify-between">
              <div class="flex space-x-1">
                <UIcon
                  v-for="star in 5"
                  :key="star"
                  name="i-heroicons-star"
                  class="w-4 h-4 text-amber-400 fill-amber-400"
                />
              </div>
              <span class="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
                Doğrulanmış Referans
              </span>
            </div>

            <!-- Quote Text -->
            <p class="text-sm text-slate-300 italic leading-relaxed font-sans font-light">
              "{{ item.quote }}"
            </p>
          </div>

          <!-- Profile Block -->
          <div class="pt-6 border-t border-slate-800/60 flex items-center space-x-4 mt-6">
            <img
              :src="item.avatar"
              :alt="item.name + ' profil fotoğrafı'"
              loading="lazy"
              decoding="async"
              width="48"
              height="48"
              class="w-12 h-12 rounded-2xl object-cover shrink-0 border border-slate-800 group-hover:border-cyan-500/40 transition-colors"
            />
            <div class="flex flex-col">
              <span class="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">{{ item.name }}</span>
              <span class="text-xs text-slate-400 font-medium">{{ item.role }}, <span class="text-cyan-400">{{ item.company }}</span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
