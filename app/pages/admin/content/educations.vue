<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const toast = useToast()

const educations = ref<any[]>([])
const isLoading = ref(true)
const isSubmitting = ref(false)
const searchQuery = ref('')
const selectedStatus = ref('All')
const sortBy = ref('Sıralama Sırası') // Sıralama Sırası, Başlık (A-Z), Başlık (Z-A)

// Modals
const isSlideoverOpen = ref(false)
const isConfirmDeleteOpen = ref(false)
const deleteTargetId = ref<number | null>(null)

// Form fields
const eduId = ref<number | null>(null)
const title = ref('')
const institution = ref('Anıl Erdoğan Akademi')
const description = ref('')
const imageUrl = ref('')
const isPublished = ref(true)
const sortOrder = ref(0)

const fetchEducations = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('educations')
      .select('*')
      .order('sort_order', { ascending: true })
    
    if (error) throw error
    educations.value = data || []
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Eğitimler yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchEducations()
})

const openCreate = () => {
  eduId.value = null
  title.value = ''
  institution.value = 'Anıl Erdoğan Akademi'
  description.value = ''
  imageUrl.value = ''
  isPublished.value = true
  sortOrder.value = 0
  isSlideoverOpen.value = true
}

const openEdit = (item: any) => {
  eduId.value = item.id
  title.value = item.title
  institution.value = item.institution || 'Anıl Erdoğan Akademi'
  description.value = item.description || ''
  imageUrl.value = item.image_url || ''
  isPublished.value = item.is_published
  sortOrder.value = item.sort_order || 0
  isSlideoverOpen.value = true
}

const saveEducation = async () => {
  if (!title.value) {
    toast.add({ title: 'Hata', description: 'Lütfen eğitim başlığını girin.', color: 'error' })
    return
  }

  isSubmitting.value = true

  const payload = {
    title: title.value,
    institution: institution.value,
    description: description.value,
    image_url: imageUrl.value,
    is_published: isPublished.value,
    sort_order: sortOrder.value
  }

  try {
    if (eduId.value) {
      const { error } = await supabase
        .from('educations')
        .update(payload as any)
        .eq('id', eduId.value)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Eğitim başarıyla güncellendi.', color: 'success' })
    } else {
      const { error } = await supabase
        .from('educations')
        .insert(payload as any)
      
      if (error) throw error
      toast.add({ title: 'Başarılı', description: 'Eğitim başarıyla oluşturuldu.', color: 'success' })
    }
    isSlideoverOpen.value = false
    fetchEducations()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Kayıt sırasında hata oluştu: ' + err.message, color: 'error' })
  } finally {
    isSubmitting.value = false
  }
}

const togglePublish = async (item: any) => {
  try {
    const { error } = await supabase
      .from('educations')
      .update({ is_published: !item.is_published } as any)
      .eq('id', item.id)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Yayın durumu güncellendi.', color: 'success' })
    fetchEducations()
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
      .from('educations')
      .delete()
      .eq('id', deleteTargetId.value)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Eğitim silindi.', color: 'success' })
    fetchEducations()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Silme işlemi başarısız: ' + err.message, color: 'error' })
  } finally {
    isConfirmDeleteOpen.value = false
    deleteTargetId.value = null
  }
}

const filteredEducations = computed(() => {
  let list = educations.value.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          (e.institution && e.institution.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesStatus = selectedStatus.value === 'All' ||
                          (selectedStatus.value === 'Published' && e.is_published) ||
                          (selectedStatus.value === 'Draft' && !e.is_published)
    
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
        <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">Eğitim Programları</h1>
        <p class="text-xs text-slate-400 font-light">Sitede yayınlanan eğitim programlarını ve sınıflarını yönetin.</p>
      </div>

      <UButton
        color="primary"
        icon="i-heroicons-plus-circle"
        class="rounded-full px-5 py-2.5 text-xs font-semibold"
        @click="openCreate"
      >
        Yeni Eğitim Ekle
      </UButton>
    </div>

    <!-- Filters Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div class="w-full sm:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="Eğitimlerde ara..."
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
      
      <div v-if="isLoading" class="p-8 space-y-4 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>

      <div v-else-if="filteredEducations.length === 0" class="p-12 text-center space-y-3">
        <span class="text-3xl block">🔍</span>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">Kayıt Bulunamadı</h3>
        <p class="text-xs text-slate-400 font-light">Belirtilen kriterlerde henüz hiç eğitim kaydı bulunmuyor.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-850/60 text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th class="p-4 font-bold">Eğitim Başlığı</th>
              <th class="p-4 font-bold">Kurum</th>
              <th class="p-4 font-bold">Yayın Durumu</th>
              <th class="p-4 font-bold">Sıra</th>
              <th class="p-4 font-bold text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-150/60 dark:divide-slate-800/60">
            <tr v-for="item in filteredEducations" :key="item.id" class="hover:bg-slate-50/50 dark:hover:bg-slate-850/20">
              <td class="p-4 font-bold text-slate-900 dark:text-white">{{ item.title }}</td>
              <td class="p-4 text-slate-400 font-sans">{{ item.institution }}</td>
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
              {{ eduId ? 'Eğitimi Düzenle' : 'Yeni Eğitim Ekle' }}
            </h2>
            <UButton
              variant="ghost"
              color="neutral"
              icon="i-heroicons-x-mark"
              class="rounded-full"
              @click="isSlideoverOpen = false"
            />
          </div>

          <form class="space-y-4" @submit.prevent="saveEducation">
            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Eğitim Adı</label>
              <UInput v-model="title" required placeholder="Örn: Modern Liderin Yol Haritası" class="rounded-lg" />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Eğitim Kurumu</label>
              <UInput v-model="institution" placeholder="Örn: Anıl Erdoğan Akademi" class="rounded-lg" />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Detaylı Açıklama</label>
              <UTextarea v-model="description" placeholder="Eğitim hedefleri ve müfredatı..." :rows="8" class="rounded-lg w-full" />
            </div>

            <div class="space-y-1">
              <label class="text-[10px] font-bold uppercase text-slate-400">Görsel</label>
              <MediaPicker v-model="imageUrl" folder="education" label="Görsel Seç" />
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div class="space-y-1">
                <label class="text-[10px] font-bold uppercase text-slate-400">Sıralama Sırası</label>
                <UInput v-model="sortOrder" type="number" class="rounded-lg" />
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
            @click="saveEducation"
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
          Bu eğitim programını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz ve ön yüzden anında kaldırılır.
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
