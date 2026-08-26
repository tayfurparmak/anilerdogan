<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { servicesData, educationData, blogPostsData, testimonialsData, siteSettingsData, profileData } from '~/data/mockData'

definePageMeta({
  layout: 'admin'
})

const isLoading = ref(true)
const isSeeding = ref(false)
const dbError = ref('')
const toast = useToast()

const stats = ref([
  { name: 'Toplam Hizmet', value: 0, icon: 'i-heroicons-cpu-chip', color: 'text-emerald-500 bg-emerald-500/10' },
  { name: 'Toplam Eğitim', value: 0, icon: 'i-heroicons-academic-cap', color: 'text-blue-500 bg-blue-500/10' },
  { name: 'Toplam Blog', value: 0, icon: 'i-heroicons-document-text', color: 'text-purple-500 bg-purple-500/10' },
  { name: 'Toplam Referans', value: 0, icon: 'i-heroicons-star', color: 'text-amber-500 bg-amber-500/10' },
  { name: 'Okunmamış Mesaj', value: 0, icon: 'i-heroicons-envelope-open', color: 'text-rose-500 bg-rose-500/10' }
])

const recentContent = ref<any[]>([])
const recentMessages = ref<any[]>([])

const fetchStats = async () => {
  isLoading.value = true
  dbError.value = ''
  const supabase = useSupabaseClient()

  try {
    const { count: servicesCount, error: sErr } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })

    const { count: educationsCount, error: eErr } = await supabase
      .from('educations')
      .select('*', { count: 'exact', head: true })

    const { count: blogsCount, error: bErr } = await supabase
      .from('blog_posts')
      .select('*', { count: 'exact', head: true })

    const { count: testimonialsCount, error: tErr } = await supabase
      .from('testimonials')
      .select('*', { count: 'exact', head: true })

    const { count: messagesCount, error: mErr } = await supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false)

    if (sErr || eErr || bErr || tErr || mErr) {
      dbError.value = 'Supabase veritabanında henüz satır verisi bulunmuyor veya bazı tablolar yüklenemedi. Aşağıdaki butonla örnek verileri tohumlayabilirsiniz.'
      loadMockStats()
    } else {
      stats.value[0]!.value = servicesCount || 0
      stats.value[1]!.value = educationsCount || 0
      stats.value[2]!.value = blogsCount || 0
      stats.value[3]!.value = testimonialsCount || 0
      stats.value[4]!.value = messagesCount || 0
      
      // Load recent content lists dynamically from live db
      const { data: recentSrv } = await supabase.from('services').select('title, created_at').order('created_at', { ascending: false }).limit(2) as any
      const { data: recentB } = await supabase.from('blog_posts').select('title, created_at').order('created_at', { ascending: false }).limit(2) as any
      const { data: recentMsg } = await supabase.from('contact_messages').select('name, email, message, created_at').order('created_at', { ascending: false }).limit(3) as any
      
      recentContent.value = [
        ...(recentSrv || []).map((s: any) => ({ type: 'Hizmet', title: s.title, date: 'Yeni' })),
        ...(recentB || []).map((b: any) => ({ type: 'Makale', title: b.title, date: 'Yeni' }))
      ]
      
      recentMessages.value = (recentMsg || []).map((m: any) => ({
        name: m.name,
        email: m.email,
        message: m.message,
        date: 'Canlı Mesaj'
      }))
    }
  } catch (err: any) {
    dbError.value = 'Supabase API sunucusuna bağlanılamadı. Sistem geçici olarak Mock Verileri moduna geçirildi.'
    loadMockStats()
  } finally {
    isLoading.value = false
  }
}

const loadMockStats = () => {
  stats.value[0]!.value = servicesData.length
  stats.value[1]!.value = educationData.length
  stats.value[2]!.value = blogPostsData.length
  stats.value[3]!.value = testimonialsData.length
  stats.value[4]!.value = 2 // Mock unread messages count

  recentContent.value = [
    { type: 'Hizmet', title: 'Yönetici ve Liderlik Koçluğu', date: 'Bugün' },
    { type: 'Eğitim', title: 'Modern Yöneticinin Yol Haritası', date: 'Dün' },
    { type: 'Makale', title: 'Modern Liderlikte Duygusal Zeka', date: '12 Ağustos 2026' }
  ]

  recentMessages.value = [
    { name: 'Caner Özdemir', email: 'caner@sirket.com', message: 'Liderlik akademisi kurumsal teklifi hakkında görüşmek istiyoruz.', date: '2 saat önce' },
    { name: 'Elif Şahin', email: 'elif@saas.com', message: 'Kariyer dönüşüm seansları hakkında bilgi alabilir miyim?', date: 'Dün' }
  ]
}

onMounted(() => {
  fetchStats()
})

// Database Seeder Function to fill database tables with Phase 1 mock data
const seedDatabase = async () => {
  const supabase = useSupabaseClient()
  const user = useSupabaseUser()
  
  if (!user.value) {
    toast.add({ title: 'Hata', description: 'Oturum açık olmadığından seading yapılamaz.', color: 'error' })
    return
  }

  isSeeding.value = true
  toast.add({ title: 'Başlatılıyor', description: 'Veritabanı başlangıç verileri tohumlanıyor...', color: 'success' })

  try {
    // 1. Seed Site Settings
    await supabase.from('site_settings').upsert({
      id: 1,
      site_name: siteSettingsData.siteName,
      site_description: siteSettingsData.siteDescription,
      logo: '',
      favicon: '',
      default_seo_title: siteSettingsData.siteTitle,
      default_seo_description: siteSettingsData.siteDescription
    } as any)

    // 2. Seed Profile linking to auth user id
    await supabase.from('profiles').upsert({
      id: user.value.id,
      full_name: profileData.name,
      title: profileData.title,
      short_bio: 'Yönetici Koçu & Teknoloji Stratejisi Danışmanı',
      bio: profileData.bio,
      profile_image: profileData.avatar,
      email: user.value.email,
      phone: siteSettingsData.contactInfo.phone,
      location: 'İstanbul'
    } as any)

    // 3. Seed Services
    for (const srv of servicesData) {
      await supabase.from('services').upsert({
        id: srv.id,
        title: srv.title,
        slug: srv.slug,
        short_description: srv.shortDescription,
        description: srv.fullDescription,
        icon: srv.icon,
        sort_order: 0,
        is_published: srv.isActive
      } as any)
    }

    // 4. Seed Educations
    for (const edu of educationData) {
      await supabase.from('educations').upsert({
        id: edu.id,
        title: edu.title,
        institution: 'Anıl Erdoğan Akademi',
        description: edu.description,
        image_url: edu.image,
        sort_order: 0,
        is_published: edu.isActive
      } as any)
    }

    // 5. Seed Blog Posts
    for (const post of blogPostsData) {
      await supabase.from('blog_posts').upsert({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.summary,
        content: post.content,
        cover_image: post.image,
        category: post.category,
        tags: [post.category],
        is_published: true,
        published_at: new Date().toISOString()
      } as any)
    }

    // 6. Seed Testimonials
    for (const test of testimonialsData) {
      await supabase.from('testimonials').upsert({
        id: test.id,
        name: test.name,
        position: test.role,
        company: test.company,
        content: test.quote,
        image_url: test.avatar,
        sort_order: 0,
        is_published: true
      } as any)
    }

    // 7. Seed Social Links
    const socialPlatforms = ['linkedin', 'twitter', 'instagram', 'medium']
    for (let i = 0; i < socialPlatforms.length; i++) {
      const platform = socialPlatforms[i]
      const url = profileData.socialLinks[platform as keyof typeof profileData.socialLinks] || ''
      if (url) {
        await supabase.from('social_links').upsert({
          platform,
          url,
          icon: `i-simple-icons-${platform === 'twitter' ? 'x' : platform}`,
          sort_order: i,
          is_visible: true
        } as any)
      }
    }

    toast.add({ title: 'Başarılı', description: 'Tüm modüller başarıyla veritabanına yüklendi!', color: 'success' })
    await fetchStats()
  } catch (err: any) {
    toast.add({ title: 'Seeding Hatası', description: err.message || 'Veriler yüklenemedi.', color: 'error' })
  } finally {
    isSeeding.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    
    <!-- Database Connection Info/Error Banner -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="dbError" class="p-5 bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-3xl flex items-start justify-between gap-4">
        <div class="flex items-start space-x-3 text-xs">
          <UIcon name="i-heroicons-information-circle" class="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <span class="font-bold block mb-0.5">Veritabanı Tohumlama (Seeding) Gerekli</span>
            <p class="font-light leading-relaxed">{{ dbError }}</p>
          </div>
        </div>
        
        <UButton
          color="warning"
          size="xs"
          :loading="isSeeding"
          class="rounded-full shrink-0"
          @click="seedDatabase"
        >
          Örnek Verileri Yükle
        </UButton>
      </div>
    </Transition>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
      <template v-if="isLoading">
        <div
          v-for="i in 5"
          :key="i"
          class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 space-y-4 animate-pulse"
        >
          <div class="flex items-center justify-between">
            <div class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800" />
            <div class="w-12 h-4 bg-slate-100 dark:bg-slate-800 rounded-full" />
          </div>
          <div class="space-y-2">
            <div class="w-20 h-6 bg-slate-100 dark:bg-slate-800 rounded" />
            <div class="w-16 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
          </div>
        </div>
      </template>

      <template v-else>
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
        >
          <div class="flex items-center justify-between mb-4">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center" :class="stat.color">
              <UIcon :name="stat.icon" class="w-5 h-5" />
            </div>
            <span class="text-xs text-slate-400 font-medium">Aktif</span>
          </div>

          <div class="space-y-1">
            <span class="text-3xl font-extrabold text-slate-900 dark:text-white">{{ stat.value }}</span>
            <span class="block text-xs text-slate-400 font-light">{{ stat.name }}</span>
          </div>
        </div>
      </template>
    </div>

    <!-- Main Content Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      
      <!-- Left side: Recent Content & Messages -->
      <div class="lg:col-span-8 space-y-8">
        
        <!-- Recent Messages -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 class="font-bold text-base text-slate-900 dark:text-white font-serif">Son İletişim Talepleri</h3>
            <UButton to="/admin/messages" variant="link" color="primary" class="text-xs p-0">Tümünü Gör</UButton>
          </div>

          <div v-if="isLoading" class="space-y-4 animate-pulse">
            <div v-for="i in 2" :key="i" class="flex justify-between items-center py-3">
              <div class="space-y-2">
                <div class="w-32 h-4 bg-slate-100 dark:bg-slate-800 rounded" />
                <div class="w-60 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
              </div>
              <div class="w-16 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          </div>

          <div v-else-if="recentMessages.length === 0" class="text-center py-8">
            <span class="text-3xl block mb-2">📥</span>
            <span class="text-xs text-slate-400 font-light block">Henüz hiç mesajınız bulunmuyor.</span>
          </div>

          <div v-else class="divide-y divide-slate-100 dark:divide-slate-800/60">
            <div
              v-for="(msg, idx) in recentMessages"
              :key="idx"
              class="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row justify-between sm:items-center gap-2"
            >
              <div class="space-y-1">
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-bold text-slate-900 dark:text-white">{{ msg.name }}</span>
                  <span class="text-[10px] text-slate-400">({{ msg.email }})</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-light line-clamp-1">
                  {{ msg.message }}
                </p>
              </div>
              
              <span class="text-[10px] text-slate-400 self-start sm:self-center shrink-0">
                {{ msg.date }}
              </span>
            </div>
          </div>
        </div>

        <!-- Recent Activities -->
        <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 class="font-bold text-base text-slate-900 dark:text-white font-serif">Son Güncellenen İçerikler</h3>
            <span class="text-xs text-slate-400">Canlı Değişiklikler</span>
          </div>

          <div v-if="isLoading" class="space-y-4 animate-pulse">
            <div v-for="i in 3" :key="i" class="flex justify-between items-center py-2">
              <div class="w-48 h-4 bg-slate-100 dark:bg-slate-800 rounded" />
              <div class="w-16 h-3 bg-slate-100 dark:bg-slate-800 rounded" />
            </div>
          </div>

          <div v-else-if="recentContent.length === 0" class="text-center py-8">
            <span class="text-3xl block mb-2">📁</span>
            <span class="text-xs text-slate-400 font-light block">Sitede henüz hiç içerik kaydı bulunmuyor.</span>
          </div>

          <div v-else class="divide-y divide-slate-100 dark:divide-slate-800/60">
            <div
              v-for="(item, idx) in recentContent"
              :key="idx"
              class="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs"
            >
              <div class="flex items-center space-x-3">
                <span class="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500">
                  {{ item.type }}
                </span>
                <span class="font-medium text-slate-800 dark:text-slate-200">{{ item.title }}</span>
              </div>
              <span class="text-[10px] text-slate-400">{{ item.date }}</span>
            </div>
          </div>
        </div>

      </div>

      <!-- Right side: Quick actions -->
      <div class="lg:col-span-4 sticky top-24 space-y-6">
        <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8 space-y-6">
          <h3 class="font-bold text-base text-slate-900 dark:text-white font-serif border-b border-slate-100 dark:border-slate-800 pb-4">
            Hızlı İşlemler
          </h3>

          <div class="space-y-3">
            <UButton
              to="/admin/content/services"
              color="primary"
              variant="solid"
              icon="i-heroicons-plus-circle"
              block
              class="rounded-full py-3 text-xs font-semibold justify-start"
            >
              Yeni Hizmet Ekle
            </UButton>

            <UButton
              to="/admin/content/educations"
              color="primary"
              variant="outline"
              icon="i-heroicons-plus-circle"
              block
              class="rounded-full py-3 text-xs font-semibold justify-start"
            >
              Yeni Eğitim Sınıfı
            </UButton>

            <UButton
              to="/admin/content/blog"
              color="primary"
              variant="ghost"
              icon="i-heroicons-plus-circle"
              block
              class="rounded-full py-3 text-xs font-semibold justify-start border border-primary-500/20"
            >
              Yeni Makale Yaz
            </UButton>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
