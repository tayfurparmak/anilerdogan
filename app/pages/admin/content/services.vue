<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const toast = useToast()

const services = ref<any[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('All') // All, Published, Draft

const sortBy = ref('Sıralama Sırası') // Sıralama Sırası, Başlık (A-Z), Başlık (Z-A)

// Modal and Slideover controls
const isSlideoverOpen = ref(false)
const isConfirmDeleteOpen = ref(false)
const deleteTargetId = ref<number | null>(null)

// Form fields
const serviceId = ref<number | null>(null)
const title = ref('')
const slug = ref('')
const shortDescription = ref('')
const description = ref('')
const icon = ref('i-heroicons-cpu-chip')
const isPublished = ref(true)
const sortOrder = ref(0)
const imageUrl = ref('')

// Load data
const fetchServices = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    services.value = data || []
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Hizmetler yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchServices()
})

// Auto slug generation helper
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
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .replace(/[\s-]+/g, '-')      // replace spaces with hyphens
}

// Watch title to auto-generate slug
watch(title, (newVal) => {
  if (!serviceId.value) { // only for new creations
    slug.value = generateSlug(newVal)
  }
})

// Open Create Form
const openCreate = () => {
  serviceId.value = null
  title.value = ''
  slug.value = ''
  shortDescription.value = ''
  description.value = ''
  icon.value = 'i-heroicons-cpu-chip'
  isPublished.value = true
  sortOrder.value = 0
  imageUrl.value = ''
  isSlideoverOpen.value = true
}

// Open Edit Form
const openEdit = (item: any) => {
  serviceId.value = item.id
  title.value = item.title
  slug.value = item.slug
  shortDescription.value = item.short_description || ''
  description.value = item.description || ''
  icon.value = item.icon || 'i-heroicons-cpu-chip'
  isPublished.value = item.is_published
  sortOrder.value = item.sort_order || 0
  imageUrl.value = item.image_url || ''
  isSlideoverOpen.value = true
}

// Save Service (Create or Update)
const saveService = async () => {
  if (!title.value || !slug.value) {
    toast.add({ title: 'Hata', description: 'Lütfen başlık ve slug alanlarını doldurun.', color: 'danger' })
    return
  }

  isSubmitting.value = true

  const payload = {
    title: title.value,
    slug: slug.value,
    short_description: shortDescription.value,
    description: description.value,
    image_url: imageUrl.value,
    icon: icon.value,
    is_published: isPublished.value,
    sort_order: sortOrder.value
  }

  try {
    if (serviceId.value) {
      // Update
      const { error } = await supabase
        .from('services')
        .update(payload as any)
        .eq('id', serviceId.value)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Hizmet başarıyla güncellendi.', color: 'success' })
    } else {
      // Create
      const { error } = await supabase
        .from('services')
        .insert(payload as any)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Hizmet başarıyla oluşturuldu.', color: 'success' })
    }
    isSlideoverOpen.value = false
    fetchServices()
  } catch (err: any) {
    if (err.message.includes('unique_slug')) {
      toast.add({ title: 'Hata', description: 'Bu slug zaten kullanımda. Lütfen başka bir slug deneyin.', color: 'error' })
    } else {
      toast.add({ title: 'Hata', description: 'Kayıt sırasında hata oluştu: ' + err.message, color: 'error' })
    }
  } finally {
    isSubmitting.value = false
  }
}

// Quick status toggle
const togglePublish = async (item: any) => {
  try {
    const { error } = await supabase
      .from('services')
      .update({ is_published: !item.is_published } as any)
      .eq('id', item.id)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Yayın durumu güncellendi.', color: 'success' })
    fetchServices()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Durum güncellenemedi: ' + err.message, color: 'error' })
  }
}

// Delete triggers
const triggerDelete = (id: number) => {
  deleteTargetId.value = id
  isConfirmDeleteOpen.value = true
}

const confirmDelete = async () => {
  if (!deleteTargetId.value) return
  try {
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', deleteTargetId.value)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Hizmet silindi.', color: 'success' })
    fetchServices()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Silme işlemi başarısız: ' + err.message, color: 'error' })
  } finally {
    isConfirmDeleteOpen.value = false
    deleteTargetId.value = null
  }
}

// Search & Filter computes
const filteredServices = computed(() => {
  let list = services.value.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          s.slug.toLowerCase().includes(searchQuery.value.toLowerCase())
    
    const matchesStatus = selectedStatus.value === 'All' ||
                          (selectedStatus.value === 'Published' && s.is_published) ||
                          (selectedStatus.value === 'Draft' && !s.is_published)
    
    return matchesSearch && matchesStatus
  })

  if (sortBy.value === 'Başlık (A-Z)') {
    list.sort((a, b) => a.title.localeCompare(b.title))
  } else if (sortBy.value === 'Başlık (Z-A)') {
    list.sort((a, b) => b.title.localeCompare(a.title))
  } else {
    list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
  }

  return list
})
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 gap-4 shadow-sm">
      <div class="space-y-1">
        <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Danışmanlık Hizmetleri</h1>
        <p class="text-xs text-slate-400 font-light">Sitede yayınlanan danışmanlık hizmet ve modellerini yönetin.</p>
      </div>

      <UButton
        color="primary"
        icon="i-heroicons-plus-circle"
        class="rounded-full px-5 py-2.5 text-xs font-semibold"
        @click="openCreate"
      >
        Yeni Hizmet Ekle
      </UButton>
    </div>

    <!-- Filters Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div class="w-full sm:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Hizmetlerde ara..."
            class="rounded-full"
          />
        </div>
        <USelect
          v-model="sortBy"
          :items="['Sıralama Sırası', 'Başlık (A-Z)', 'Başlık (Z-A)']"
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
      
      <!-- Skeleton Loading -->
      <div v-if="isLoading" class="p-8 space-y-4 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredServices.length === 0" class="p-12 text-center space-y-3">
        <span class="text-3xl block">🔍</span>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">Kayıt Bulunamadı</h3>
        <p class="text-xs text-slate-400 font-light">Belirtilen kriterlerde henüz hiç hizmet kaydı bulunmuyor.</p>
      </div>

      <!-- Content list table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-850/60 text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th class="p-4 font-bold">Hizmet Adı</th>
              <th class="p-4 font-bold">Slug</th>
              <th class="p-4 font-bold">Yayın Durumu</th>
              <th class="p-4 font-bold">Sıra</th>
              <th class="p-4 font-bold text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-150/60 dark:divide-slate-800/60">
            <tr v-for="item in filteredServices" :key="item.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
              <td class="p-4 font-bold text-slate-900 dark:text-white">{{ item.title }}</td>
              <td class="p-4 text-slate-400 font-mono">{{ item.slug }}</td>
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
              <td class="p-4 text-slate-400">{{ item.sort_order }}</td>
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
    <USlideover v-model="isSlideoverOpen" class="z-50">
      <div class="p-6 h-full flex flex-col justify-between bg-white dark:bg-slate-900 overflow-y-auto">
        <div class="space-y-6">
          <div class="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 class="text-base font-bold text-slate-900 dark:text-white font-serif">
              {{ serviceId ? 'Hizmeti Düzenle' : 'Yeni Hizmet Ekle' }}
            </h2>
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-heroicons-x-mark"
              class="rounded-full"
              @click="isSlideoverOpen = false"
            />
          </div>

          <form class="space-y-4" @submit.prevent="saveService">
            <!-- Title -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Hizmet Başlığı</label>
              <UInput v-model="title" required placeholder="Örn: Liderlik Koçluğu" class="rounded-lg" />
            </div>

            <!-- Slug -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Slug (URL Adresi)</label>
              <UInput v-model="slug" required placeholder="orn-liderlik-koclugu" class="rounded-lg font-mono text-xs" />
            </div>

            <!-- Short Description -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Kısa Açıklama</label>
              <UInput v-model="shortDescription" placeholder="Ön yüzde görünecek özet..." class="rounded-lg" />
            </div>

            <!-- Full Description -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Detaylı İçerik</label>
              <UTextarea v-model="description" placeholder="Hizmet detayları ve program kapsamı..." :rows="8" class="rounded-lg w-full" />
            </div>

            <!-- Service Image -->
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Hizmet Görseli</label>
              <MediaPicker v-model="imageUrl" folder="services" label="Görsel Seç" />
            </div>

            <!-- Icon & Sort -->
            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-slate-400">İkon Sınıfı</label>
                <UInput v-model="icon" placeholder="i-heroicons-cpu-chip" class="rounded-lg" />
              </div>
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-slate-400">Sıralama Sırası</label>
                <UInput v-model="sortOrder" type="number" class="rounded-lg" />
              </div>
            </div>

            <!-- Publish Switch -->
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
            @click="saveService"
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
          <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Kayıt Silinecek</h3>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed font-light">
          Bu hizmet kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve ön yüzden anında kaldırılır.
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
