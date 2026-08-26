<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const toast = useToast()

const messages = ref<any[]>([])
const isLoading = ref(true)
const searchQuery = ref('')
const selectedFilter = ref('All') // All, Unread, Read
const sortBy = ref('Tarih (En Yeni)') // Tarih (En Yeni), Tarih (En Eski), Ad Soyad (A-Z)

// Modals
const isConfirmDeleteOpen = ref(false)
const deleteTargetId = ref<string | number | null>(null)
const activeMessage = ref<any | null>(null)
const isViewModalOpen = ref(false)

const fetchMessages = async () => {
  isLoading.value = true
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    messages.value = data || []
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Mesajlar yüklenemedi: ' + err.message, color: 'error' })
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchMessages()
})

const markAsRead = async (item: any) => {
  try {
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: !item.is_read } as any)
      .eq('id', item.id)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: item.is_read ? 'Okunmadı olarak işaretlendi.' : 'Okundu olarak işaretlendi.', color: 'success' })
    fetchMessages()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'İşlem başarısız: ' + err.message, color: 'error' })
  }
}

const openViewMessage = async (item: any) => {
  activeMessage.value = item
  isViewModalOpen.value = true
  
  if (!item.is_read) {
    // Automatically mark as read when viewed
    try {
      await supabase
        .from('contact_messages')
        .update({ is_read: true } as any)
        .eq('id', item.id)
      fetchMessages()
    } catch (e) {}
  }
}

const triggerDelete = (id: string | number) => {
  deleteTargetId.value = id
  isConfirmDeleteOpen.value = true
}

const confirmDelete = async () => {
  if (!deleteTargetId.value) return
  try {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', deleteTargetId.value)
    
    if (error) throw error
    toast.add({ title: 'Başarılı', description: 'Mesaj silindi.', color: 'success' })
    fetchMessages()
  } catch (err: any) {
    toast.add({ title: 'Hata', description: 'Silme işlemi başarısız: ' + err.message, color: 'error' })
  } finally {
    isConfirmDeleteOpen.value = false
    deleteTargetId.value = null
    isViewModalOpen.value = false
  }
}

const filteredMessages = computed(() => {
  let list = messages.value.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          m.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          (m.message && m.message.toLowerCase().includes(searchQuery.value.toLowerCase()))
    
    const matchesFilter = selectedFilter.value === 'All' ||
                          (selectedFilter.value === 'Unread' && !m.is_read) ||
                          (selectedFilter.value === 'Read' && m.is_read)
    
    return matchesSearch && matchesFilter
  })

  if (sortBy.value === 'Tarih (En Eski)') {
    list.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  } else if (sortBy.value === 'Ad Soyad (A-Z)') {
    list.sort((a, b) => a.name.localeCompare(b.name))
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
        <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">İletişim Mesajları</h1>
        <p class="text-xs text-slate-400 font-light">Kullanıcıların web sitesi üzerinden gönderdiği danışmanlık ve bilgi talepleri.</p>
      </div>
    </div>

    <!-- Filters Bar -->
    <div class="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
      <div class="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <div class="w-full sm:w-80">
          <UInput
            v-model="searchQuery"
            icon="i-heroicons-magnifying-glass"
            placeholder="İsim, e-posta veya mesajda ara..."
            class="rounded-full"
          />
        </div>
        <USelect
          v-model="sortBy"
          :items="['Tarih (En Yeni)', 'Tarih (En Eski)', 'Ad Soyad (A-Z)']"
          class="w-full sm:w-44 rounded-full"
        />
      </div>

      <div class="bg-slate-100 dark:bg-slate-900 p-1 rounded-full flex border border-slate-200/60 dark:border-slate-800/60 self-start sm:self-auto">
        <button
          v-for="filter in ['All', 'Unread', 'Read']"
          :key="filter"
          class="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
          :class="selectedFilter === filter
            ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow'
            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'"
          @click="selectedFilter = filter"
        >
          {{ filter === 'All' ? 'Tümü' : (filter === 'Unread' ? 'Okunmamış' : 'Okunmuş') }}
        </button>
      </div>
    </div>

    <!-- Grid / List Table -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden shadow-sm">
      
      <div v-if="isLoading" class="p-8 space-y-4 animate-pulse">
        <div v-for="i in 3" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800 rounded-xl" />
      </div>

      <div v-else-if="filteredMessages.length === 0" class="p-12 text-center space-y-3">
        <span class="text-3xl block">📥</span>
        <h3 class="text-sm font-bold text-slate-800 dark:text-white">Mesaj Bulunamadı</h3>
        <p class="text-xs text-slate-400 font-light">Belirtilen filtre kriterlerine uygun mesaj bulunmamaktadır.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-slate-50 dark:bg-slate-850/60 text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th class="p-4 font-bold">Ad Soyad</th>
              <th class="p-4 font-bold">E-posta</th>
              <th class="p-4 font-bold">Mesaj Özeti</th>
              <th class="p-4 font-bold">Durum</th>
              <th class="p-4 font-bold text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-150/60 dark:divide-slate-800/60">
            <tr
              v-for="item in filteredMessages"
              :key="item.id"
              class="hover:bg-slate-50/50 dark:hover:bg-slate-850/20 cursor-pointer"
              :class="!item.is_read ? 'font-bold bg-slate-50/20 dark:bg-slate-800/10' : ''"
              @click="openViewMessage(item)"
            >
              <td class="p-4 text-slate-900 dark:text-white">{{ item.name }}</td>
              <td class="p-4 text-slate-400">{{ item.email }}</td>
              <td class="p-4 text-slate-500 dark:text-slate-400 font-light line-clamp-1 max-w-xs">{{ item.message }}</td>
              <td class="p-4">
                <span
                  class="cursor-pointer inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold"
                  :class="item.is_read
                    ? 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'"
                  @click.stop="markAsRead(item)"
                >
                  {{ item.is_read ? 'Okundu' : 'Yeni' }}
                </span>
              </td>
              <td class="p-4 text-right space-x-1" @click.stop>
                <UButton
                  color="neutral"
                  variant="ghost"
                  icon="i-heroicons-eye"
                  class="rounded-full"
                  @click="openViewMessage(item)"
                />
                <UButton
                  color="rose"
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

    <!-- Message View Modal -->
    <UModal v-model="isViewModalOpen">
      <div v-if="activeMessage" class="p-8 space-y-6 bg-white dark:bg-slate-900 rounded-3xl">
        <div class="flex justify-between items-start border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">{{ activeMessage.name }}</h3>
            <span class="text-[10px] text-slate-400 block">{{ activeMessage.email }}</span>
          </div>
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-x-mark"
            class="rounded-full"
            @click="isViewModalOpen = false"
          />
        </div>

        <div class="space-y-2 text-xs">
          <span class="font-bold text-slate-400 block uppercase tracking-wider">İletilen Mesaj</span>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed font-sans font-light bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl whitespace-pre-wrap">
            {{ activeMessage.message }}
          </p>
        </div>

        <div class="flex space-x-3 justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <UButton
            color="rose"
            variant="outline"
            icon="i-heroicons-trash"
            class="rounded-full px-5 py-2 text-xs font-semibold bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/30"
            @click="triggerDelete(activeMessage.id)"
          >
            Sil
          </UButton>
          <UButton
            color="neutral"
            variant="solid"
            class="rounded-full px-5 py-2 text-xs font-semibold"
            @click="isViewModalOpen = false"
          >
            Kapat
          </UButton>
        </div>
      </div>
    </UModal>

    <!-- Delete Confirmation Modal -->
    <UModal v-model="isConfirmDeleteOpen">
      <div class="p-6 space-y-6 bg-white dark:bg-slate-900 rounded-3xl">
        <div class="flex items-center space-x-3 text-rose-500">
          <UIcon name="i-heroicons-trash" class="w-6 h-6" />
          <h3 class="text-base font-bold text-slate-900 dark:text-white font-serif">Kayıt Silinecek</h3>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed font-light">
          Bu iletişim mesajını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
        </p>
        <div class="flex space-x-3 justify-end pt-2">
          <UButton
            color="rose"
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
