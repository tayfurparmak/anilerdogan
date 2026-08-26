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

// Fetch related posts (same category, excluding current post)
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

// Redirect if post not found
onMounted(() => {
  if (!dbPost.value) {
    router.replace('/404')
  }
})

// Calculate read time based on word count
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

// Dynamic Canonical & OG URL
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
    "dateModified": dbPost.value?.updated_at || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": "Anıl Erdoğan",
      "url": "https://anilerdogan.com/hakkimda"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Anıl Erdoğan",
      "logo": {
        "@type": "ImageObject",
        "url": "https://anilerdogan.com/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": routePath.value
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": "https://anilerdogan.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://anilerdogan.com/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": post.value.title,
        "item": routePath.value
      }
    ]
  }

  return {
    title,
    meta: [
      { name: 'description', content: desc },
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: desc },
      { property: 'og:image', content: img },
      { property: 'og:url', content: routePath.value },
      { property: 'og:type', content: 'article' },
      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: desc },
      { name: 'twitter:image', content: img }
    ],
    link: [
      { rel: 'canonical', href: routePath.value }
    ],
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(articleSchema)
      },
      {
        type: 'application/ld+json',
        children: JSON.stringify(breadcrumbSchema)
      }
    ]
  }
})

// Copy Link helper
const copyBlogLink = async () => {
  try {
    await navigator.clipboard.writeText(routePath.value)
    toast.add({ title: 'Kopyalandı', description: 'Yazı bağlantısı panoya kopyalandı.', color: 'success' })
  } catch (e) {
    toast.add({ title: 'Hata', description: 'Kopyalanamadı.', color: 'error' })
  }
}

// Custom Markdown or HTML renderer wrapper with client-side XSS sanitization
const parsedContent = computed(() => {
  if (!post.value) return ''
  
  // Render HTML directly if rich text was saved
  if (post.value.content.includes('<p>') || post.value.content.includes('<div>') || post.value.content.includes('<h2>')) {
    return sanitizeHtml(post.value.content)
  }
  
  // Fallback splitting for legacy mock descriptions/plain-text
  const paragraphs = post.value.content.split('\n\n')
  const html = paragraphs.map(para => {
    if (para.startsWith('### ')) {
      return `<h3 class="text-lg font-bold font-serif text-slate-900 dark:text-white mt-8 mb-4">${para.replace('### ', '')}</h3>`
    }
    if (para.startsWith('## ')) {
      return `<h2 class="text-xl font-bold font-serif text-slate-900 dark:text-white mt-10 mb-6">${para.replace('## ', '')}</h2>`
    }
    if (para.startsWith('- ')) {
      const listItems = para.split('\n').map(item => `<li class="ml-6 list-disc mb-2">${item.replace('- ', '')}</li>`).join('')
      return `<ul class="my-4 text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">${listItems}</ul>`
    }
    return `<p class="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-light mb-6">${para}</p>`
  }).join('')

  return sanitizeHtml(html)
})
</script>

<template>
  <div v-if="post" class="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
    <!-- Back Button -->
    <div>
      <UButton
        to="/blog"
        variant="link"
        color="neutral"
        icon="i-heroicons-arrow-left"
        class="p-0 text-slate-500 hover:text-slate-900 dark:hover:text-white"
      >
        Tüm Makalelere Geri Dön
      </UButton>
    </div>

    <!-- Article Header -->
    <header class="space-y-6">
      <div class="flex items-center space-x-3 text-xs">
        <span class="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold uppercase">
          {{ post.category }}
        </span>
        <span class="text-slate-400 font-light">{{ post.publishedAt }}</span>
      </div>

      <h1 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white font-serif leading-tight">
        {{ post.title }}
      </h1>
      
      <p class="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light italic border-l-4 border-emerald-500 pl-4">
        {{ post.summary }}
      </p>
    </header>

    <!-- Author & Read Meta -->
    <div class="flex items-center space-x-4 border-y border-slate-200/50 dark:border-slate-800/50 py-4">
      <img
        :src="post.author.avatar"
        :alt="post.author.name + ' profil fotoğrafı'"
        loading="lazy"
        decoding="async"
        width="48"
        height="48"
        class="w-12 h-12 rounded-full object-cover shrink-0"
      />
      <div>
        <span class="block text-sm font-bold text-slate-900 dark:text-white">{{ post.author.name }}</span>
        <span class="block text-xs text-slate-400">{{ post.author.role }} &bull; {{ post.readTime }}</span>
      </div>
    </div>

    <!-- Featured Image -->
    <div class="relative aspect-video rounded-3xl overflow-hidden shadow-lg border border-slate-200/40 dark:border-slate-800/40">
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
      class="prose prose-slate dark:prose-invert max-w-none focus:outline-none"
      v-html="parsedContent"
    />

    <!-- Share Area -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-200/50 dark:border-slate-800/50 pt-6 space-y-4 sm:space-y-0">
      <div class="flex flex-wrap gap-2 items-center">
        <span class="text-xs text-slate-400 mr-2 font-medium">Bu yazıyı paylaş:</span>
        <UButton
          color="neutral"
          variant="soft"
          size="sm"
          icon="i-simple-icons-linkedin"
          class="rounded-full"
          title="LinkedIn'de Paylaş"
          :to="`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(routePath)}`"
          target="_blank"
        />
        <UButton
          color="neutral"
          variant="soft"
          size="sm"
          icon="i-simple-icons-x"
          class="rounded-full"
          title="X'te Paylaş"
          :to="`https://twitter.com/intent/tweet?url=${encodeURIComponent(routePath)}&text=${encodeURIComponent(post.title)}`"
          target="_blank"
        />
        <UButton
          color="neutral"
          variant="soft"
          size="sm"
          icon="i-heroicons-link"
          class="rounded-full"
          title="Bağlantıyı Kopyala"
          @click="copyBlogLink"
        />
      </div>
      
      <!-- Tags list -->
      <div v-if="post.tags && post.tags.length > 0" class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] text-slate-500 font-sans"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Related Posts -->
    <div v-if="relatedPosts.length > 0" class="border-t border-slate-200/50 dark:border-slate-800/50 pt-10 space-y-6">
      <h3 class="text-xl font-bold text-slate-900 dark:text-white font-serif">İlgili Yazılar</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="item in relatedPosts"
          :key="item.id"
          :to="`/blog/${item.slug}`"
          class="group space-y-3 block"
        >
          <div class="aspect-video w-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/40 relative shadow-sm">
            <img :src="item.cover_image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800'" :alt="item.title" loading="lazy" decoding="async" class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" />
          </div>
          <div class="space-y-1">
            <span class="text-[10px] text-emerald-500 font-bold uppercase">{{ item.category }}</span>
            <h4 class="text-xs font-bold text-slate-800 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2">
              {{ item.title }}
            </h4>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
