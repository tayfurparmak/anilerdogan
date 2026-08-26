<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const toast = useToast()

const testimonials = ref<any[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('All')
const sortBy = ref('Sıralama Sırası') // Sıralama Sırası, İsim (A-Z), İsim (Z-A)

// Modals
const isSlideoverOpen = ref(false)
const isConfirmDeleteOpen = ref(false)
const deleteTargetId = ref<number | null>(null)

// Form fields
const testimonialId = ref<number | null>(null)
const name = ref('')
const position = ref('')
const company = ref('')
const content = ref('')
const imageUrl = ref('')
const isPublished = ref(true)
const sortOrder = ref(0)

const fetchTestimonials = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    testimonials.value = data || []
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Yorumlar yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTestimonials()
})

const openCreate = () => {
  testimonialId.value = null
  name.value = ''
  position.value = ''
  company.value = ''
  content.value = ''
  imageUrl.value = ''
  isPublished.value = true
  sortOrder.value = 0
  isSlideoverOpen.value = true
}

const openEdit = (item: any) => {
  testimonialId.value = item.id
  name.value = item.name
  position.value = item.position || ''
  company.value = item.company || ''
  content.value = item.content || ''
  imageUrl.value = item.image_url || ''
  isPublished.value = item.is_published
  sortOrder.value = item.sort_order || 0
  isSlideoverOpen.value = true
}

const saveTestimonial = async () => {
  if (!name.value || !content.value) {
    toast.add({ title: 'Hata', description: 'Lütfen isim ve yorum içeriğini girin.', color: 'error' })
    return
  }

  isSubmitting.value = true

  const payload = {
    name: name.value,
    position: position.value,
    company: company.value,
    content: content.value,
    image_url: imageUrl.value,
    is_published: isPublished.value,
    sort_order: sortOrder.value
  }

  try {
    if (testimonialId.value) {
      const { error } = await supabase
        .from('testimonials')
        .update(payload as any)
        .eq('id', testimonialId.value)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Yorum başarıyla güncellendi.', color: 'success' })
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert(payload as any)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Yorum başarıyla oluşturuldu.', color: 'success' })
    }
    isSlideoverOpen.value = false
    fetchTestimonials()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Kayıt sırasında hata oluştu: ' + err.message, color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}

const togglePublish = async (item: any) => {
  try {
    const { error } = await supabase
      .from('testimonials')
      .update({ is_published: !item.is_published } as any)
      .eq('id', item.id)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Yayın durumu güncellendi.', color: 'success' })
    fetchTestimonials()
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
      .from('testimonials')
      .delete()
      .eq('id', deleteTargetId.value)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Yorum silindi.', color: 'success' })
    fetchTestimonials()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Silme işlemi başarısız: ' + err.message, color: 'error' })
  } finally {
    isConfirmDeleteOpen.value = false
    deleteTargetId.value = null
  }
}

const filteredTestimonials = computed(() => {
  let list = testimonials.value.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          (t.content && t.content.toLowerCase().includes(searchQuery.value.toLowerCase())) ||
                          (t.company && t.company.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesStatus = selectedStatus.value === 'All' ||
                          (selectedStatus.value === 'Published' && t.is_published) ||
                          (selectedStatus.value === 'Draft' && !t.is_published)
    
    return matchesSearch && matchesStatus
  })

  if (sortBy.value === 'İsim (A-Z)') {
    list.sort((a, b) => a.name.localeCompare(b.name))
  } else if (sortBy.value === 'İsim (Z-A)') {
    list.sort((a, b) => b.name.localeCompare(a.name))
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
        <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Referans Yorumları</h1>
        <p class="text-xs text-slate-400 font-light">Danışanlarınızın başarı hikayelerini ve yorumlarını yönetin.</p>
      </div>

      <UButton
        color="primary"
        icon="i-heroicons-plus-circle"
        class="rounded-full px-5 py-2.5 text-xs font-semibold"
        aria-label="Yeni referans yorumu ekle"
        @click="openCreate"
      >
        Yeni Referans Ekle
      </UButton>
    </div>

    <!-- Filters Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div class="w-full sm:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Yorumlarda ara..."
            class="rounded-full"
            aria-label="Yorumlarda arama"
          />
        </div>
        <USelect
          v-model="sortBy"
          :items="['Sıralama Sırası', 'İsim (A-Z)', 'İsim (Z-A)']"
          class="w-full sm:w-44 rounded-full"
          aria-label="Sıralama seçimi"
        />
      </div>

      <div class="bg-slate-100 dark:bg-slate-900 p-1 rounded-full flex border border-slate-200/60 dark:border-slate-800/60 self-start sm:self-auto" role="tablist" aria-label="Yayın durumu filtreleri">
        <button
          v-for="status in ['All', 'Published', 'Draft']"
          :key="status"
          role="tab"
          :aria-selected="selectedStatus === status"
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
      
      <!-- Loading State -->
      <div v-if="isLoading" class="p-8 space-y-4 animate-pulse" aria-busy="true" aria-label="Yükleniyor">
        <div v-for="i in 3" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>

      <!-- Empty State -->
      <div v-else-if="filteredTestimonials.length === 0" class="p-12 text-center space-y-3">
        <span class="text-3xl block" aria-hidden="true">🔍</span>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">Yorum Bulunamadı</h3>
        <p class="text-xs text-slate-400 font-light">Belirtilen kriterlerde henüz hiç referans yorumu bulunmuyor.</p>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs" aria-label="Referans yorumları tablosu">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-850/60 text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th scope="col" class="p-4 font-bold">Danışan Adı</th>
              <th scope="col" class="p-4 font-bold">Rol / Şirket</th>
              <th scope="col" class="p-4 font-bold">Yayın Durumu</th>
              <th scope="col" class="p-4 font-bold">Sıra</th>
              <th scope="col" class="p-4 font-bold text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-150/60 dark:divide-slate-800/60">
            <tr v-for="item in filteredTestimonials" :key="item.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
              <td class="p-4 font-bold text-slate-900 dark:text-white">{{ item.name }}</td>
              <td class="p-4 text-slate-400 font-sans">{{ item.position }} @ {{ item.company }}</td>
              <td class="p-4">
                <button
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold cursor-pointer"
                  :class="item.is_published
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                    : 'bg-slate-500/10 text-slate-600 dark:text-slate-400'"
                  :aria-label="item.is_published ? 'Yayından kaldır' : 'Yayınla'"
                  @click="togglePublish(item)"
                >
                  {{ item.is_published ? 'Yayında' : 'Taslak' }}
                </button>
              </td>
              <td class="p-4 text-slate-400">{{ item.sort_order }}</td>
              <td class="p-4 text-right space-x-1">
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-pencil-square"
                  class="rounded-full"
                  aria-label="Düzenle"
                  @click="openEdit(item)"
                />
                <UButton
                  color="error"
                  variant="ghost"
                  icon="i-heroicons-trash"
                  class="rounded-full"
                  aria-label="Sil"
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
              {{ testimonialId ? 'Yorumu Düzenle' : 'Yeni Yorum Ekle' }}
            </h2>
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-heroicons-x-mark"
              class="rounded-full"
              aria-label="Kapat"
              @click="isSlideoverOpen = false"
            />
          </div>

          <form class="space-y-4" @submit.prevent="saveTestimonial">
            <div class="space-y-1">
              <label for="testimonial-name" class="text-[10px] font-bold uppercase text-slate-400">Danışan Adı Soyadı</label>
              <UInput id="testimonial-name" v-model="name" required placeholder="Örn: Caner Yılmaz" class="rounded-lg" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label for="testimonial-position" class="text-[10px] font-bold uppercase text-slate-400">Ünvan / Pozisyon</label>
                <UInput id="testimonial-position" v-model="position" placeholder="Örn: VP of Product" class="rounded-lg" />
              </div>
              <div class="space-y-1">
                <label for="testimonial-company" class="text-[10px] font-bold uppercase text-slate-400">Şirket</label>
                <UInput id="testimonial-company" v-model="company" placeholder="Örn: Acme Inc." class="rounded-lg" />
              </div>
            </div>

            <div class="space-y-1">
              <label for="testimonial-content" class="text-[10px] font-bold uppercase text-slate-400">Geri Bildirim / Yorum</label>
              <UTextarea id="testimonial-content" v-model="content" required placeholder="Danışanın süreç hakkındaki olumlu yorumları..." :rows="6" class="rounded-lg w-full" />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Profil Resmi</label>
              <MediaPicker v-model="imageUrl" folder="testimonials" label="Profil Resmi Seç" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-1">
                <label for="testimonial-sort" class="text-[10px] font-bold uppercase text-slate-400">Sıralama Sırası</label>
                <UInput id="testimonial-sort" v-model="sortOrder" type="number" class="rounded-lg" />
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
            :disabled="isSubmitting"
            class="rounded-full py-3 text-xs font-semibold flex-1 justify-center"
            @click="saveTestimonial"
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
          <UIcon name="i-heroicons-trash" class="w-6 h-6" aria-hidden="true" />
          <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Kayıt Silinecek</h3>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed font-light">
          Bu danışan yorumunu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
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
