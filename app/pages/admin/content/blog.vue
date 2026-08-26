<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const toast = useToast()

const posts = ref<any[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('All')
const sortBy = ref('Tarih (En Yeni)') // Tarih (En Yeni), Tarih (En Eski), Başlık (A-Z)

// Modals
const isSlideoverOpen = ref(false)
const isConfirmDeleteOpen = ref(false)
const deleteTargetId = ref<number | null>(null)

// Form fields
const postId = ref<number | null>(null)
const title = ref('')
const slug = ref('')
const excerpt = ref('')
const content = ref('')
const coverImage = ref('')
const category = ref('Liderlik')
const tags = ref<string[]>([])
const tagsInput = ref('')
const isPublished = ref(true)
const seoTitle = ref('')
const seoDescription = ref('')

const fetchPosts = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    posts.value = data || []
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Yazılar yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})

const generateSlug = (val: string) => {
  return val
    .toLowerCase()
    .trim()
    .replace(/[ğĞ]/g, 'g')
    .replace(/[üÜ]/g, 'u')
    .replace(/[şŞ]/g, 's')
    .replace(/[ıİ]/g, 'i')
    .replace(/[öÖ]/g, 'o')
    .replace(/[çÇ]/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-')
}

watch(title, (newVal) => {
  if (!postId.value) {
    slug.value = generateSlug(newVal)
  }
})

const openCreate = () => {
  postId.value = null
  title.value = ''
  slug.value = ''
  excerpt.value = ''
  content.value = ''
  coverImage.value = ''
  category.value = 'Liderlik'
  tags.value = ['Liderlik']
  tagsInput.value = 'Liderlik'
  isPublished.value = true
  seoTitle.value = ''
  seoDescription.value = ''
  isSlideoverOpen.value = true
}

const openEdit = (item: any) => {
  postId.value = item.id
  title.value = item.title
  slug.value = item.slug
  excerpt.value = item.excerpt || ''
  content.value = item.content || ''
  coverImage.value = item.cover_image || ''
  category.value = item.category || 'Liderlik'
  tags.value = item.tags || []
  tagsInput.value = (item.tags || []).join(', ')
  isPublished.value = item.is_published
  seoTitle.value = item.seo_title || ''
  seoDescription.value = item.seo_description || ''
  isSlideoverOpen.value = true
}

const savePost = async () => {
  if (!title.value || !slug.value) {
    toast.add({ title: 'Hata', description: 'Lütfen başlık ve slug alanlarını doldurun.', color: 'error' })
    return
  }

  isSubmitting.value = true
  
  // Parse tags
  const parsedTags = tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(Boolean)

  // Check duplicate slug manually
  try {
    const { data: existing, error: checkError } = await supabase
      .from('blog_posts')
      .select('id, slug')
      .eq('slug', slug.value)
      
    if (checkError) throw checkError
    
    const isDuplicate = existing && existing.some(item => item.id !== postId.value)
    if (isDuplicate) {
      toast.add({ title: 'Çakışma Hatası', description: 'Bu URL adresi (slug) başka bir yazıda zaten kullanılıyor.', color: 'error' })
      isSubmitting.value = false
      return
    }
  } catch (err: any) {
    // Slug check failed silently — proceed with save
  }

  const payload = {
    title: title.value,
    slug: slug.value,
    excerpt: excerpt.value,
    content: content.value,
    cover_image: coverImage.value,
    category: category.value,
    tags: parsedTags,
    is_published: isPublished.value,
    published_at: isPublished.value ? new Date().toISOString() : null,
    seo_title: seoTitle.value,
    seo_description: seoDescription.value
  }

  try {
    if (postId.value) {
      const { error } = await supabase
        .from('blog_posts')
        .update(payload as any)
        .eq('id', postId.value)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Makale başarıyla güncellendi.', color: 'success' })
    } else {
      const { error } = await supabase
        .from('blog_posts')
        .insert(payload as any)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Makale başarıyla oluşturuldu.', color: 'success' })
    }
    isSlideoverOpen.value = false
    fetchPosts()
  } catch (err: any) {
    if (err.message.includes('unique_slug')) {
      toast.add({ title: 'Hata', description: 'Bu slug zaten kullanımda.', color: 'error' })
    } else {
      toast.add({ title: 'Hata', description: 'Kayıt sırasında hata oluştu: ' + err.message, color: 'error' })
    }
  } finally {
    isSubmitting.value = false
  }
}

const togglePublish = async (item: any) => {
  try {
    const { error } = await supabase
      .from('blog_posts')
      .update({
        is_published: !item.is_published,
        published_at: !item.is_published ? new Date().toISOString() : null
      } as any)
      .eq('id', item.id)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Yayın durumu güncellendi.', color: 'success' })
    fetchPosts()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Durum güncellenemedi: ' + err.message, color: 'error' })
  }
}

const triggerDelete = (id: number) => {
  deleteTargetId.value = id
  isConfirmDeleteOpen.value = true
}

const confirmDelete = async () => {
  if (!deleteTargetId.value) return
  try {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', deleteTargetId.value)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Yazı silindi.', color: 'success' })
    fetchPosts()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Silme işlemi başarısız: ' + err.message, color: 'error' })
  } finally {
    isConfirmDeleteOpen.value = false
    deleteTargetId.value = null
  }
}

const filteredPosts = computed(() => {
  let list = posts.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          p.slug.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value === 'All' ||
                          (selectedStatus.value === 'Published' && p.is_published) ||
                          (selectedStatus.value === 'Draft' && !p.is_published)
    
    return matchesSearch && matchesStatus
  })

  if (sortBy.value === 'Tarih (En Eski)') {
    list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  } else if (sortBy.value === 'Başlık (A-Z)') {
    list.sort((a, b) => a.title.localeCompare(b.title))
  } else {
    list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  }

  return list
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 gap-4 shadow-sm">
      <div class="space-y-1">
        <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Blog Makaleleri</h1>
        <p class="text-xs text-slate-400 font-light">Sitedeki blog paylaşımlarını, SEO ayarlarını ve kategorileri yönetin.</p>
      </div>

      <UButton
        color="primary"
        icon="i-heroicons-plus-circle"
        class="rounded-full px-5 py-2.5 text-xs font-semibold"
        @click="openCreate"
      >
        Yeni Makale Yaz
      </UButton>
    </div>

    <!-- Filters Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div class="w-full sm:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Makalelerde ara..."
            class="rounded-full"
          />
        </div>
        <USelect
          v-model="sortBy"
          :items="['Tarih (En Yeni)', 'Tarih (En Eski)', 'Başlık (A-Z)']"
          class="w-full sm:w-44 rounded-full"
        />
      </div>

      <div class="bg-slate-100 dark:bg-slate-900 p-1 rounded-full flex border border-slate-200/60 dark:border-slate-800/60 self-start sm:self-auto">
        <button
          v-for="status in ['All', 'Published', 'Draft']"
          :key="status"
          class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
          :class="selectedStatus === status
            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow'
            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'"
          @click="selectedStatus = status"
        >
          {{ status === 'All' ? 'Tümü' : (status === 'Published' ? 'Yayında' : 'Taslak') }}
        </button>
      </div>
    </div>

    <!-- Grid / List Table -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm">
      
      <div v-if="isLoading" class="p-8 space-y-4 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>

      <div v-else-if="filteredPosts.length === 0" class="p-12 text-center space-y-3">
        <span class="text-3xl block">🔍</span>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">Makale Bulunamadı</h3>
        <p class="text-xs text-slate-400 font-light">Belirtilen kriterlerde henüz hiç makale kaydı bulunmuyor.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-850/60 text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th class="p-4 font-bold">Makale Başlığı</th>
              <th class="p-4 font-bold">Kategori</th>
              <th class="p-4 font-bold">Yayın Durumu</th>
              <th class="p-4 font-bold">Tarih</th>
              <th class="p-4 font-bold text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-150/60 dark:divide-slate-800/60">
            <tr v-for="item in filteredPosts" :key="item.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
              <td class="p-4 font-bold text-slate-900 dark:text-white">{{ item.title }}</td>
              <td class="p-4">
                <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-bold text-slate-500">
                  {{ item.category }}
                </span>
              </td>
              <td class="p-4">
                <span
                  class="cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  :class="item.is_published
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'"
                  @click="togglePublish(item)"
                >
                  {{ item.is_published ? 'Yayında' : 'Taslak' }}
                </span>
              </td>
              <td class="p-4 text-slate-400">
                {{ item.published_at ? new Date(item.published_at).toLocaleDateString('tr-TR') : '-' }}
              </td>
              <td class="p-4 text-right space-x-1">
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-pencil-square"
                  class="rounded-full"
                  @click="openEdit(item)"
                />
                <UButton
                  color="error"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  class="rounded-full"
                  @click="triggerDelete(item.id)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create/Edit Slideover Form -->
    <USlideover v-model="isSlideoverOpen" class="z-50" :ui="{ width: 'max-w-2xl' }">
      <div class="p-6 h-full flex flex-col justify-between bg-white dark:bg-slate-900 overflow-y-auto">
        <div class="space-y-6">
          <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white font-serif">
              {{ postId ? 'Makaleyi Düzenle' : 'Yeni Makale Yaz' }}
            </h2>
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-heroicons-x-mark"
              class="rounded-full"
              @click="isSlideoverOpen = false"
            />
          </div>

          <form class="space-y-4" @submit.prevent="savePost">
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Makale Başlığı</label>
              <UInput v-model="title" required placeholder="Örn: Modern Liderlikte Duygusal Zeka" class="rounded-lg" />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Slug (URL Adresi)</label>
              <UInput v-model="slug" required placeholder="modern-liderlikte-duygusal-zeka" class="rounded-lg font-mono text-xs" />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Özet (Excerpt)</label>
              <UTextarea v-model="excerpt" placeholder="Makale listesinde görünecek kısa giriş..." class="rounded-lg w-full" :rows="3" />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Makale Metni</label>
              <RichTextEditor v-model="content" placeholder="Yazının ana metnini zengin içerik editörü ile yazın..." />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-slate-400">Kategori</label>
                <USelect v-model="category" :items="['Liderlik', 'Teknoloji & Yönetim', 'Kariyer']" class="rounded-lg w-full" />
              </div>
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-slate-400">Kapak Resmi</label>
                <MediaPicker v-model="coverImage" folder="blog" label="Kapak Resmi Seç" />
              </div>
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Etiketler (Virgülle Ayırın)</label>
              <UInput v-model="tagsInput" placeholder="liderlik, koçluk, yonetim" class="rounded-lg" />
            </div>

            <div class="border-t border-slate-100 dark:border-slate-800 pt-4 mt-4 space-y-4">
              <h4 class="text-xs font-bold text-slate-900 dark:text-white font-serif">SEO Ayarları</h4>
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-slate-400">SEO Başlığı (SEO Title)</label>
                <UInput v-model="seoTitle" placeholder="Google arama sonuçları başlığı..." class="rounded-lg" />
              </div>
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-slate-400">SEO Açıklaması (SEO Description)</label>
                <UTextarea v-model="seoDescription" placeholder="Google arama sonuçlarında görünecek açıklama..." :rows="3" class="rounded-lg w-full" />
              </div>
            </div>

            <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-950 rounded-xl">
              <div>
                <span class="text-xs font-bold block text-slate-900 dark:text-white">Yayınla</span>
                <span class="text-[10px] text-slate-400 block leading-none mt-0.5">Sitede görünebilir yap.</span>
              </div>
              <USwitch v-model="isPublished" color="primary" />
            </div>
          </form>
        </div>

        <div class="pt-6 border-t border-slate-100 dark:border-slate-800 flex space-x-3">
          <UButton
            color="primary"
            block
            size="lg"
            :loading="isSubmitting"
            class="rounded-full py-3 text-xs font-semibold flex-1 justify-center"
            @click="savePost"
          >
            Kaydet
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            size="lg"
            class="rounded-full py-3 text-xs font-semibold flex-1 justify-center"
            @click="isSlideoverOpen = false"
          >
            Vazgeç
          </UButton>
        </div>
      </div>
    </USlideover>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="isConfirmDeleteOpen">
      <div class="p-6 space-y-6 bg-white dark:bg-slate-900 rounded-3xl">
        <div class="flex items-center space-x-3 text-rose-500">
          <UIcon name="i-heroicons-trash" class="w-6 h-6" />
          <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Yazı Silinecek</h3>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed font-light">
          Bu blog makalesini kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div class="flex space-x-3 justify-end pt-2">
          <UButton
            color="error"
            class="rounded-full px-5 py-2 text-xs font-semibold bg-red-500 hover:bg-red-600 text-white"
            @click="confirmDelete"
          >
            Evet, Sil
          </UButton>
          <UButton
            variant="outline"
            color="neutral"
            class="rounded-full px-5 py-2 text-xs font-semibold"
            @click="isConfirmDeleteOpen = false"
          >
            Vazgeç
          </UButton>
        </div>
      </div>
    </UModal>
  </div>
</template>
