<script setup lang="ts">
import ArticleCard, { type Article } from './ArticleCard.vue'
import { BookOpen, ArrowRight } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    description?: string
    articles?: Article[]
  }>(),
  {
    title: 'Son Yazılar & Düşünceler',
    subtitle: 'Blog',
    description: 'Nuxt 3 ekosistemi, modern frontend mimarileri, performans optimizasyonları ve yazılım mühendisliği üzerine yazılarım.',
    articles: () => [
      {
        id: 1,
        title: 'Nuxt 3 ile Yüksek Performanslı ve SEO Dostu Web Uygulamaları Geliştirme',
        summary: 'Server-side rendering (SSR), hydration optimizasyonları ve Nuxt 3\'ün sunduğu güçlü composable mimarisi ile modern web projeleri inşa edin.',
        date: '15 Ağustos 2026',
        readTime: '6 dk',
        category: 'Nuxt 3',
        slug: 'nuxt-3-yuksek-performans'
      },
      {
        id: 2,
        title: 'Tailwind CSS v4 ile Daha Temiz ve Hızlı UI Geliştirme Pratikleri',
        summary: 'Yeni nesil Tailwind CSS sürümü ile gelen CSS-first yapılandırma, hızlandırılmış derleme ve tasarım token yönetimi.',
        date: '28 Temmuz 2026',
        readTime: '4 dk',
        category: 'Tailwind CSS',
        slug: 'tailwind-css-v4-pratikleri'
      },
      {
        id: 3,
        title: 'TypeScript Tip Güvenliği ile Büyük Ölçekli Vue Projelerini Yönetmek',
        summary: 'Karmaşık Vue 3 bileşenlerinde advanced TypeScript tipleri, Generic bileşenler ve refactor kolaylığı sağlayan en iyi pratikler.',
        date: '10 Temmuz 2026',
        readTime: '8 dk',
        category: 'TypeScript',
        slug: 'typescript-vue-3-tip-guvenligi'
      }
    ]
  }
)
</script>

<template>
  <section id="blog" class="py-24 bg-zinc-950 relative border-t border-zinc-900">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-4">
            <BookOpen class="w-3.5 h-3.5" />
            <span>{{ subtitle }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-3">
            {{ title }}
          </h2>
          <p class="text-sm sm:text-base text-zinc-400 max-w-xl">
            {{ description }}
          </p>
        </div>

        <NuxtLink
          to="/blog"
          class="inline-flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-zinc-100 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2.5 rounded-xl transition-all self-start md:self-auto"
        >
          <span>Tüm Yazıları Gör</span>
          <ArrowRight class="w-4 h-4 text-zinc-400" />
        </NuxtLink>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
        />
      </div>
    </div>
  </section>
</template>
