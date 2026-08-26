<script setup lang="ts">
import { blogPostsData } from '~/data/mockData'
import BlogCard from '~/components/cards/BlogCard.vue'

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
      category: b.category || 'Genel',
      readTime: '5 dk okuma',
      publishedAt: b.published_at ? new Date(b.published_at).toLocaleDateString('tr-TR') : 'Yeni',
      image: b.cover_image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      slug: b.slug,
      author: {
        name: 'Anıl Erdoğan',
        role: 'Yönetici Koçu',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=150'
      }
    }))
  }
  // Fallback to local mock data
  return blogPostsData.slice(0, 3)
})
</script>

<template>
  <section class="py-20 lg:py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="max-w-xl space-y-4">
          <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span>Yazılarım</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-serif">
            Gelişime Dair İçgörüler
          </h2>
          <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
            Liderlik, yazılım dünyası yönetimi ve kariyer planlaması üzerine en son makalelerim ve düşüncelerim.
          </p>
        </div>
        
        <div>
          <UButton
            to="/blog"
            color="emerald"
            variant="outline"
            class="rounded-full px-6 font-medium"
          >
            Tüm Makaleleri Gör
          </UButton>
        </div>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard
          v-for="post in recentPosts"
          :key="post.id"
          :post="post"
        />
      </div>
    </div>
  </section>
</template>
