<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const isSidebarOpen = ref(false)

const handleLogout = async () => {
  const { error } = await supabase.auth.signOut()
  if (!error) {
    router.push('/admin/login')
  }
}

// Sidebar links structure
const navigation = [
  { name: 'Dashboard', to: '/admin/dashboard', icon: 'i-heroicons-squares-2x2' },
  {
    name: 'İçerik Yönetimi',
    icon: 'i-heroicons-document-duplicate',
    children: [
      { name: 'Ana Sayfa', to: '/admin/content/home' },
      { name: 'Hakkımda', to: '/admin/content/about' },
      { name: 'Eğitimler', to: '/admin/content/educations' },
      { name: 'Danışmanlıklar', to: '/admin/content/services' },
      { name: 'Blog', to: '/admin/content/blog' },
      { name: 'Referanslar', to: '/admin/content/testimonials' }
    ]
  },
  { name: 'Medya Kütüphanesi', to: '/admin/media', icon: 'i-heroicons-photo' },
  { name: 'İletişim Mesajları', to: '/admin/messages', icon: 'i-heroicons-envelope' },
  {
    name: 'Ayarlar',
    icon: 'i-heroicons-cog-6-tooth',
    children: [
      { name: 'Profil', to: '/admin/settings/profile' },
      { name: 'Sosyal Medya', to: '/admin/settings/social' },
      { name: 'SEO Ayarları', to: '/admin/settings/seo' },
      { name: 'Site Ayarları', to: '/admin/settings/site' }
    ]
  }
]

// Breadcrumb calculations
const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean)
  return paths.map((path, idx) => {
    const to = '/' + paths.slice(0, idx + 1).join('/')
    const name = path.charAt(0).toUpperCase() + path.slice(1)
    return { name, to }
  })
})

const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})
</script>

<template>
  <div class="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/80 z-20">
      <div class="h-16 flex items-center px-6 border-b border-slate-100 dark:border-slate-800">
        <span class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-serif">
          Anıl Erdoğan
        </span>
        <span class="ml-2 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">
          Admin
        </span>
      </div>

      <!-- Navigation links -->
      <nav class="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        <div v-for="item in navigation" :key="item.name">
          <!-- Main Link / Title -->
          <div v-if="!item.children">
            <NuxtLink
              :to="item.to"
              class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              active-class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
            >
              <UIcon :name="item.icon" class="w-5 h-5" />
              <span>{{ item.name }}</span>
            </NuxtLink>
          </div>
          
          <!-- Nested Links -->
          <div v-else class="space-y-2">
            <span class="flex items-center space-x-3 px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              <UIcon :name="item.icon" class="w-4 h-4" />
              <span>{{ item.name }}</span>
            </span>
            <div class="pl-4 space-y-1">
              <NuxtLink
                v-for="sub in item.children"
                :key="sub.name"
                :to="sub.to"
                class="flex items-center px-3 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                active-class="text-emerald-600 dark:text-emerald-400 font-semibold border-l-2 border-emerald-500 pl-2 rounded-l-none"
              >
                {{ sub.name }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main Container -->
    <div class="flex-1 lg:pl-64 flex flex-col min-h-screen">
      <!-- Topbar Header -->
      <header class="h-16 bg-white dark:bg-slate-900 border-b border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-10">
        <div class="flex items-center space-x-4">
          <!-- Mobile Menu Hamburger button -->
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-bars-3"
            class="lg:hidden rounded-full"
            aria-label="Menüyü aç"
            @click="isSidebarOpen = true"
          />

          <!-- Breadcrumbs -->
          <nav class="hidden sm:flex" aria-label="Breadcrumb">
            <ol class="flex items-center space-x-2 text-xs text-slate-400">
              <li>
                <NuxtLink to="/admin/dashboard" class="hover:text-slate-600 dark:hover:text-slate-200">Admin</NuxtLink>
              </li>
              <li v-for="crumb in breadcrumbs" :key="crumb.to" class="flex items-center space-x-2">
                <span>/</span>
                <NuxtLink :to="crumb.to" class="hover:text-slate-600 dark:hover:text-slate-200">{{ crumb.name }}</NuxtLink>
              </li>
            </ol>
          </nav>
        </div>

        <!-- User / Actions header -->
        <div class="flex items-center space-x-4">
          <!-- Theme selector toggle -->
          <UButton
            variant="ghost"
            color="neutral"
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            class="rounded-full"
            :aria-label="isDark ? 'Açık temaya geç' : 'Koyu temaya geç'"
            @click="isDark = !isDark"
          />

          <!-- User Menu Dropdown -->
          <div v-if="user" class="flex items-center space-x-3">
            <span class="hidden md:inline-block text-xs font-semibold text-slate-600 dark:text-slate-300">
              {{ user.email }}
            </span>
            <UButton
              color="rose"
              variant="ghost"
              icon="i-heroicons-arrow-left-on-rectangle"
              class="rounded-full"
              aria-label="Çıkış yap"
              @click="handleLogout"
            />
          </div>
        </div>
      </header>

      <!-- Page Content Slot wrapper -->
      <main class="flex-grow p-6 sm:p-8">
        <slot />
      </main>
    </div>

    <!-- Mobile Navigation Slideover Drawer -->
    <USlideover v-model="isSidebarOpen" side="left">
      <div class="p-6 h-full flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200/60 dark:border-slate-800/80">
        <!-- Close Menu / Header -->
        <div class="flex justify-between items-center mb-8">
          <span class="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-serif">
            Anıl Erdoğan
          </span>
          <UButton
            variant="ghost"
            color="neutral"
            icon="i-heroicons-x-mark"
            class="rounded-full"
            @click="isSidebarOpen = false"
          />
        </div>

        <!-- Navigation Drawer links -->
        <nav class="flex-1 space-y-6 overflow-y-auto">
          <div v-for="item in navigation" :key="item.name">
            <!-- Main Link -->
            <div v-if="!item.children">
              <NuxtLink
                :to="item.to"
                class="flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
                active-class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                @click="isSidebarOpen = false"
              >
                <UIcon :name="item.icon" class="w-5 h-5" />
                <span>{{ item.name }}</span>
              </NuxtLink>
            </div>
            
            <!-- Sub Links Group -->
            <div v-else class="space-y-2">
              <span class="flex items-center space-x-3 px-3 py-1 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                <UIcon :name="item.icon" class="w-4 h-4" />
                <span>{{ item.name }}</span>
              </span>
              <div class="pl-4 space-y-1">
                <NuxtLink
                  v-for="sub in item.children"
                  :key="sub.name"
                  :to="sub.to"
                  class="flex items-center px-3 py-2 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  active-class="text-emerald-600 dark:text-emerald-400 font-semibold border-l-2 border-emerald-500 pl-2 rounded-l-none"
                  @click="isSidebarOpen = false"
                >
                  {{ sub.name }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </USlideover>
  </div>
</template>
