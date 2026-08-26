<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import BlogCard from '~/components/cards/BlogCard.vue'
import { useSeo } from '~/composables/useSeo'

useSeo(
  'Blog & Makaleler',
  'Yönetici koçluğu, takım kültürü, teknolojik liderlik ve kariyer gelişimi üzerine güncel makalelerim.'
)

const supabase = useSupabaseClient()

const categories = ['Tümü', 'Liderlik', 'Teknoloji & Yönetim', 'Kariyer']
const selectedCategory = ref('Tümü')
const searchQuery = ref('')

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 6
const totalCount = ref(0)
const isLoading = ref(true)
const isError = ref(false)
const dbPosts = ref<any[]>([])

const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage))

// Calculate read time based on word count
const calculateReadTime = (content: string) => {
  if (!content) return '1 dk okuma'
  const cleanText = content.replace(/<\/?[^>]+(>|$)/g, "")
  const words = cleanText.trim().split(/\s+/).length
  const minutes = Math.ceil(words / 225)
  return `${minutes} dk okuma`
}

const fetchPublicPosts = async () => {
  isLoading.value = true
  isError.value = false
  try {
    // 1. Fetch total count for pagination
    let countQuery = supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })
      .eq('is_published', true)

    if (selectedCategory.value !== 'Tümü') {
      countQuery = countQuery.eq('category', selectedCategory.value)
    }

    if (searchQuery.value) {
      countQuery = countQuery.ilike('title', `%${searchQuery.value}%`)
    }

    const { count, error: countErr } = await countQuery
    if (countErr) throw countErr
    totalCount.value = count || 0

    // 2. Fetch paginated records
    const from = (currentPage.value - 1) * itemsPerPage
    const to = from + itemsPerPage - 1

    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .range(from, to)

    if (selectedCategory.value !== 'Tümü') {
      query = query.eq('category', selectedCategory.value)
    }

    if (searchQuery.value) {
      query = query.ilike('title', `%${searchQuery.value}%`)
    }

    const { data, error } = await query
    if (error) throw error
    dbPosts.value = data || []
  } catch (err) {
    isError.value = true
  } finally {
    isLoading.value = false
  }
}

// Watchers
watch([currentPage, selectedCategory], () => {
  fetchPublicPosts()
})

let searchTimeout: any
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchPublicPosts()
  }, 300)
})

watch(selectedCategory, () => {
  currentPage.value = 1
})

onMounted(() => {
  fetchPublicPosts()
})

const posts = computed(() => {
  return dbPosts.value.map((b: any) => ({
    id: b.id,
    title: b.title,
    summary: b.excerpt,
    content: b.content,
    category: b.category || 'Genel',
    readTime: calculateReadTime(b.content || ''),
    publishedAt: b.published_at ? new Date(b.published_at).toLocaleDateString('tr-TR') : 'Yeni',
    image: b.cover_image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    slug: b.slug,
    author: {
      name: 'Anıl Erdoğan',
      role: 'Yönetici Koçu',
      avatar: '/anil-erdogan.png'
    }
  }))
})
</script>

<template>
  <div class="py-12 space-y-16">
    <!-- Header Hero -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto space-y-6">
        <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Bilgi & Paylaşım</span>
        </div>
        
        <h1 class="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white font-serif leading-tight">
          Liderlik, Ürün ve Teknoloji Makaleleri
        </h1>

        <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
          İş hayatında karşılaşılan pratik problemlere yönelik çözümler, liderlik felsefeleri ve yönetim stratejileri üzerine kaleme aldığım içerikler.
        </p>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-6 border-b border-slate-200/50 dark:border-slate-800/50">
        <!-- Categories Tab -->
        <div class="flex flex-wrap gap-2">
          <button
            v-for="cat in categories"
            :key="cat"
            class="px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border"
            :class="selectedCategory === cat
              ? 'bg-emerald-500 border-emerald-500 text-white'
              : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/40'"
            @click="selectedCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="w-full md:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Makalelerde ara..."
            class="rounded-full"
          />
        </div>
      </div>
    </section>

    <!-- Grid / Loader / Error -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Loading Skeleton -->
      <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="i in 3" :key="i" class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden aspect-[4/3] animate-pulse" />
      </div>

      <!-- Error State -->
      <div v-else-if="isError" class="text-center py-20 bg-rose-500/5 dark:bg-rose-500/10 border border-rose-500/20 rounded-3xl max-w-lg mx-auto space-y-4">
        <span class="text-4xl">⚠️</span>
        <h3 class="text-base font-bold text-slate-900 dark:text-white">Bağlantı Hatası</h3>
        <p class="text-xs text-slate-400 max-w-xs mx-auto">Makaleler yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.</p>
        <UButton color="primary" variant="soft" size="sm" class="rounded-full" @click="fetchPublicPosts">Yeniden Dene</UButton>
      </div>

      <!-- Content Grid -->
      <div v-else-if="posts.length > 0" class="space-y-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BlogCard
            v-for="post in posts"
            :key="post.id"
            :post="post"
          />
        </div>

        <!-- Pagination Controls -->
        <div v-if="totalPages > 1" class="flex justify-center items-center space-x-2 pt-6">
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            class="rounded-full"
            icon="i-heroicons-chevron-left"
            :disabled="currentPage === 1"
            @click="currentPage--"
          />
          <span class="text-xs text-slate-500">Sayfa {{ currentPage }} / {{ totalPages }}</span>
          <UButton
            variant="outline"
            color="neutral"
            size="sm"
            class="rounded-full"
            icon="i-heroicons-chevron-right"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/50 dark:border-slate-800/40 max-w-lg mx-auto">
        <span class="text-4xl mb-4 block">🔍</span>
        <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2">Makale Bulunamadı</h3>
        <p class="text-xs text-slate-400 font-light">Arama teriminize veya kategorinize uygun bir yazı bulunamadı. Lütfen filtrelerinizi gözden geçirin.</p>
      </div>
    </section>
  </div>
</template>
