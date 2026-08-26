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
  { name: 'Uzmanlık', to: '/#uzmanlik' },
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
  <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/60 shadow-2xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group" @click="closeMenu">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 via-emerald-500 to-indigo-600 flex items-center justify-center p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
            <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-extrabold text-lg">AE</span>
            </div>
          </div>
          <div class="flex flex-col">
            <span class="text-lg font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Anıl Erdoğan
            </span>
            <span class="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
              AI & Tech Leadership
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-1 bg-slate-900/60 border border-slate-800/80 px-4 py-1.5 rounded-full backdrop-blur-md">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="text-xs font-semibold px-4 py-2 rounded-full text-slate-300 hover:text-white hover:bg-slate-800/60 transition-all duration-200"
            active-class="bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-300 border border-cyan-500/30 font-bold shadow-sm"
          >
            {{ link.name }}
          </NuxtLink>
        </nav>

        <!-- Desktop Actions -->
        <div class="hidden md:flex items-center space-x-4">
          <!-- Dark/Light Theme Toggle -->
          <UButton
            variant="ghost"
            color="neutral"
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            class="rounded-full text-slate-400 hover:text-cyan-400"
            aria-label="Tema Değiştir"
            @click="isDark = !isDark"
          />
          
          <!-- Primary CTA Button -->
          <UButton
            to="/iletisim"
            color="primary"
            class="rounded-full px-6 py-2.5 font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
          >
            Strateji Görüşmesi Planla
          </UButton>
        </div>

        <!-- Mobile Menu Controls -->
        <div class="flex items-center space-x-2 md:hidden">
          <UButton
            variant="ghost"
            color="neutral"
            :icon="isDark ? 'i-heroicons-sun' : 'i-heroicons-moon'"
            class="rounded-full text-slate-300"
            aria-label="Tema Değiştir"
            @click="isDark = !isDark"
          />

          <UButton
            variant="ghost"
            color="neutral"
            :icon="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'"
            class="rounded-full text-slate-300"
            aria-label="Menü"
            @click="toggleMenu"
          />
        </div>
      </div>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isOpen" class="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-4 pb-6 space-y-3">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block px-4 py-3 rounded-2xl text-sm font-semibold text-slate-300 hover:bg-slate-900 hover:text-cyan-400 transition-all"
          active-class="bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
          @click="closeMenu"
        >
          {{ link.name }}
        </NuxtLink>
        <div class="pt-4 border-t border-slate-900">
          <UButton
            to="/iletisim"
            color="primary"
            block
            class="rounded-full font-bold py-3.5 text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950"
            @click="closeMenu"
          >
            Strateji Görüşmesi Planla
          </UButton>
        </div>
      </div>
    </Transition>
  </header>
</template>
