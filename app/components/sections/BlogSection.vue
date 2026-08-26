<script setup lang="ts">
import { computed } from 'vue'
import { blogPostsData } from '~/data/mockData'

const supabase = useSupabaseClient()

// Fetch recent blog posts from Supabase
const { data: dbPosts } = await useAsyncData('blog-recent', async () => {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3)
    return data
  } catch (e) {
    return null
  }
})

const recentPosts = computed(() => {
  if (dbPosts.value && dbPosts.value.length > 0) {
    return dbPosts.value.map((b: any) => ({
      id: b.id,
      title: b.title,
      summary: b.excerpt,
      content: b.content,
      category: b.category || 'Liderlik',
      readTime: '5 dk okuma',
      publishedAt: b.published_at ? new Date(b.published_at).toLocaleDateString('tr-TR') : 'Yeni',
      image: b.cover_image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      slug: b.slug,
      author: {
        name: 'Anıl Erdoğan',
        role: 'Yönetici Koçu',
        avatar: '/anil-erdogan.png'
      }
    }))
  }
  return blogPostsData.slice(0, 3)
})
</script>

<template>
  <section class="py-28 bg-slate-950 text-white relative border-b border-slate-800/60 overflow-hidden">
    <!-- Ambient Glow -->
    <div class="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[160px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="max-w-xl space-y-4">
          <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
            <UIcon name="i-heroicons-document-text" class="w-4 h-4" />
            <span>AI & Stratejik Yayınlar</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
            Gelişime Dair İçgörüler
          </h2>
          <p class="text-slate-400 text-base leading-relaxed font-light">
            Liderlik, teknoloji mimarileri ve organizasyonel dönüşüm üzerine en son makalelerim.
          </p>
        </div>

        <div>
          <UButton
            to="/blog"
            variant="outline"
            class="rounded-full px-6 py-3 font-semibold text-xs border-slate-700 hover:border-cyan-400 text-slate-200"
          >
            Tüm Blog Arşivini Gör
          </UButton>
        </div>
      </div>

      <!-- Editorial Grid Layout -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="post in recentPosts"
          :key="post.id"
          class="bg-slate-900/80 border border-slate-800/80 rounded-[32px] overflow-hidden hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-2xl group"
        >
          <div>
            <!-- Cover Image Header -->
            <div class="relative h-52 overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                loading="lazy"
                decoding="async"
                width="600"
                height="320"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div class="absolute top-4 left-4">
                <span class="text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-400 px-3 py-1 rounded-full">
                  {{ post.category }}
                </span>
              </div>
            </div>

            <!-- Content Area -->
            <div class="p-6 space-y-3">
              <div class="flex items-center space-x-3 text-xs text-slate-400 font-mono">
                <span>{{ post.publishedAt }}</span>
                <span>•</span>
                <span>{{ post.readTime }}</span>
              </div>

              <h3 class="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2 font-serif">
                <NuxtLink :to="`/blog/${post.slug}`">
                  {{ post.title }}
                </NuxtLink>
              </h3>

              <p class="text-xs text-slate-400 leading-relaxed font-light line-clamp-3">
                {{ post.summary }}
              </p>
            </div>
          </div>

          <!-- Footer Read Link -->
          <div class="px-6 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/40 mt-4">
            <div class="flex items-center space-x-2.5">
              <img src="/anil-erdogan.png" alt="Anıl Erdoğan" class="w-6 h-6 rounded-full object-cover" />
              <span class="text-xs font-semibold text-slate-300">Anıl Erdoğan</span>
            </div>

            <NuxtLink
              :to="`/blog/${post.slug}`"
              class="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 group/link"
            >
              <span>Oku</span>
              <UIcon name="i-heroicons-arrow-right" class="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
