<script setup lang="ts">
import { ref } from 'vue'

const colorMode = useColorMode()
const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const isOpen = ref(false)

const navLinks = [
  { name: 'Ana Sayfa', to: '/' },
  { name: 'Hakkımda', to: '/hakkimda' },
  { name: 'Danışmanlık', to: '/danismanlik' },
  { name: 'Eğitimler', to: '/egitimler' },
  { name: 'Blog', to: '/blog' },
  { name: 'İletişim', to: '/iletisim' }
]

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-50 glass-effect transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-2" @click="closeMenu">
          <span class="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-serif">
            Anıl Erdoğan
          </span>
          <span class="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            Danışmanlık
          </span>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors duration-200"
            active-class="text-emerald-600 dark:text-emerald-400 font-semibold"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Dark Mode Toggle -->
          <UButton
            variant="ghost"
            color="neutral"
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            class="rounded-full"
            aria-label="Koyu/Açık Mod"
            @click="isDark = !isDark"
          />
          
          <!-- CTA Button -->
          <UButton
            to="/iletisim"
            color="emerald"
            variant="solid"
            class="rounded-full font-medium px-5"
          >
            Randevu Al
          </UButton>
        </div>

        <!-- Mobile Menu Toggle & Theme Toggle -->
        <div class="flex items-center space-x-2 md:hidden">
          <UButton
            variant="ghost"
            color="neutral"
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            class="rounded-full"
            aria-label="Koyu/Açık Mod"
            @click="isDark = !isDark"
          />

          <UButton
            variant="ghost"
            color="neutral"
            :icon="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="rounded-full"
            aria-label="Menüyü Aç/Kapat"
            @click="toggleMenu"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Drawer Overlay Menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-[-10px]"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-[-10px]"
    >
      <div v-if="isOpen" class="md:hidden glass-effect border-b border-slate-200/50 dark:border-slate-800/50">
        <div class="px-2 pt-2 pb-4 space-y-1 sm:px-3">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="block px-3 py-3 rounded-xl text-base font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            active-class="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
            @click="closeMenu"
          >
            {{ link.name }}
          </NuxtLink>
          <div class="pt-4 pb-2 border-t border-slate-200/50 dark:border-slate-800/50 px-3">
            <UButton
              to="/iletisim"
              color="emerald"
              block
              class="rounded-full font-medium py-3"
              @click="closeMenu"
            >
              Randevu Al
            </UButton>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
