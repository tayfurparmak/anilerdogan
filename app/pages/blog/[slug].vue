<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, computed, onMounted, watchEffect } from 'vue'
import { sanitizeHtml } from '~/utils/sanitizer'

const route = useRoute()
const router = useRouter()
const slug = route.params.slug as string
const supabase = useSupabaseClient()
const toast = useToast()

// Fetch blog post by slug from Supabase
const { data: dbPost } = await useAsyncData(`post-${slug}`, async () => {
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single()
    return data
  } catch (e) {
    return null
  }
})

// Fetch related posts
const { data: dbRelated } = await useAsyncData(`related-${slug}`, async () => {
  if (!dbPost.value) return []
  try {
    const { data } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_image, category, published_at')
      .eq('is_published', true)
      .eq('category', dbPost.value.category)
      .neq('id', dbPost.value.id)
      .limit(3)
    return data || []
  } catch (e) {
    return []
  }
})

onMounted(() => {
  if (!dbPost.value) {
    router.replace('/404')
  }
})

const calculateReadTime = (content: string) => {
  if (!content) return '1 dk okuma'
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, "")
  const words = cleanText.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 225)
  return `${minutes} dk okuma`
}

const post = computed(() => {
  if (dbPost.value) {
    const b = dbPost.value
    return {
      id: b.id,
      title: b.title,
      summary: b.excerpt,
      content: b.content,
      category: b.category || 'Genel',
      tags: b.tags || [],
      readTime: calculateReadTime(b.content || ''),
      publishedAt: b.published_at ? new Date(b.published_at).toLocaleDateString('tr-TR') : 'Yeni',
      image: b.cover_image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      slug: b.slug,
      author: {
        name: 'Anıl Erdoğan',
        role: 'Yönetici Koçu',
        avatar: '/anil-erdogan.png'
      }
    }
  }
  return null
})

const relatedPosts = computed(() => {
  return (dbRelated.value || []).map((b: any) => ({
    id: b.id,
    title: b.title,
    slug: b.slug,
    category: b.category || 'Genel',
    cover_image: b.cover_image
  }))
})

const routePath = computed(() => `https://anilerdogan.com/blog/${slug}`)

useHead(() => {
  if (!post.value) return {}
  const title = dbPost.value?.seo_title || post.value.title
  const desc = dbPost.value?.seo_description || post.value.summary
  const img = post.value.image

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.value.title,
    "description": post.value.summary,
    "image": post.value.image,
    "datePublished": dbPost.value?.published_at || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Anıl Erdoğan"
    }
  }

  return {
    title,
    meta: [
      { name: 'description', content: desc },
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: img }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(articleSchema)
      }
    ]
  }
})

const copyBlogLink = async () => {
  try {
    await navigator.clipboard.writeText(routePath.value)
    toast.add({ title: 'Kopyalandı', description: 'Yazı bağlantısı kopyalandı.', color: 'success' })
  } catch (e) {
    toast.add({ title: 'Hata', description: 'Kopyalanamadı.', color: 'error' })
  }
}

const parsedContent = computed(() => {
  if (!post.value) return ''
  if (post.value.content.includes('<p>') || post.value.content.includes('<div>') || post.value.content.includes('<h2>')) {
    return sanitizeHtml(post.value.content)
  }
  
  const paragraphs = post.value.content.split('\n\n')
  const html = paragraphs.map(para => {
    if (para.startsWith('### ')) {
      return `<h3 class="text-lg font-bold font-serif text-white mt-8 mb-4">${para.replace('### ', '')}</h3>`
    }
    if (para.startsWith('## ')) {
      return `<h2 class="text-xl font-bold font-serif text-white mt-10 mb-6">${para.replace('## ', '')}</h2>`
    }
    if (para.startsWith('- ')) {
      const listItems = para.split('\n').map(item => `<li class="ml-6 list-disc mb-2 text-slate-300">${item.replace('- ', '')}</li>`).join('')
      return `<ul class="my-4 text-sm text-slate-300 font-sans leading-relaxed">${listItems}</ul>`
    }
    return `<p class="text-sm sm:text-base text-slate-300 leading-relaxed font-sans font-light mb-6">${para}</p>`
  }).join('')

  return sanitizeHtml(html)
})
</script>

<template>
  <div v-if="post" class="py-16 bg-slate-950 text-white min-h-screen">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      <!-- Back Button -->
      <div>
        <NuxtLink
          to="/blog"
          class="inline-flex items-center space-x-2 text-xs font-bold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-4 h-4" />
          <span>Tüm Makalelere Dön</span>
        </NuxtLink>
      </div>

      <!-- Article Header -->
      <header class="space-y-6">
        <div class="flex items-center space-x-3 text-xs">
          <span class="px-3.5 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono font-bold uppercase">
            {{ post.category }}
          </span>
          <span class="text-slate-400 font-mono">{{ post.publishedAt }}</span>
        </div>

        <h1 class="text-3xl sm:text-5xl font-extrabold text-white font-serif leading-tight">
          {{ post.title }}
        </h1>
        
        <p class="text-base text-slate-300 leading-relaxed font-sans font-light italic border-l-4 border-cyan-500 pl-4 py-1">
          {{ post.summary }}
        </p>
      </header>

      <!-- Author & Read Meta -->
      <div class="flex items-center space-x-4 border-y border-slate-800 py-4">
        <img
          :src="post.author.avatar"
          :alt="post.author.name + ' profil fotoğrafı'"
          loading="lazy"
          decoding="async"
          width="48"
          height="48"
          class="w-12 h-12 rounded-full object-cover shrink-0 border border-slate-800"
        />
        <div>
          <span class="block text-sm font-bold text-white">{{ post.author.name }}</span>
          <span class="block text-xs text-slate-400">{{ post.author.role }} • {{ post.readTime }}</span>
        </div>
      </div>

      <!-- Featured Image -->
      <div class="relative aspect-video rounded-[32px] overflow-hidden shadow-2xl border border-slate-800">
        <img
          :src="post.image"
          :alt="post.title + ' kapak görseli'"
          loading="lazy"
          decoding="async"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Article Body -->
      <article
        class="prose prose-invert max-w-none text-slate-300 focus:outline-none"
        v-html="parsedContent"
      />

      <!-- Share Area -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-800 pt-6 space-y-4 sm:space-y-0">
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-xs text-slate-400 mr-2 font-medium">Bu yazıyı paylaş:</span>
          <UButton
            color="neutral"
            variant="soft"
            size="sm"
            icon="i-simple-icons-linkedin"
            class="rounded-full bg-slate-900 border-slate-800 text-slate-300"
            title="LinkedIn'de Paylaş"
            :to="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(routePath)}`"
            target="_blank"
          />
          <UButton
            color="neutral"
            variant="soft"
            size="sm"
            icon="i-heroicons-link"
            class="rounded-full bg-slate-900 border-slate-800 text-slate-300"
            title="Bağlantıyı Kopyala"
            @click="copyBlogLink"
          />
        </div>
      </div>

      <!-- Related Posts -->
      <div v-if="relatedPosts.length > 0" class="border-t border-slate-800 pt-10 space-y-6">
        <h3 class="text-xl font-bold text-white font-serif">İlgili Yazılar</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="item in relatedPosts"
            :key="item.id"
            :to="`/blog/${item.slug}`"
            class="group space-y-3 block bg-slate-900/60 p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all"
          >
            <div class="aspect-video w-full rounded-xl overflow-hidden bg-slate-950 relative shadow-sm">
              <img :src="item.cover_image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'" :alt="item.title" loading="lazy" decoding="async" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div class="space-y-1">
              <span class="text-[10px] text-cyan-400 font-bold uppercase font-mono">{{ item.category }}</span>
              <h4 class="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                {{ item.title }}
              </h4>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
