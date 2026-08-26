<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu, X, ArrowUpRight, Code2, Sparkles } from 'lucide-vue-next'

interface NavItem {
  name: string
  to: string
  isExternal?: boolean
}

const props = withDefaults(
  defineProps<{
    brandName?: string
    brandRole?: string
    navItems?: NavItem[]
  }>(),
  {
    brandName: 'Anıl Erdoğan',
    brandRole: 'Senior Frontend Architect',
    navItems: () => [
      { name: 'Ana Sayfa', to: '#' },
      { name: 'Projeler', to: '#projects' },
      { name: 'Blog', to: '#blog' },
      { name: 'Hakkımda', to: '#about' },
      { name: 'İletişim', to: '#contact' }
    ]
  }
)

const isOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 shadow-lg shadow-black/20 py-3'
        : 'bg-transparent py-5'
    ]"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between">
        <!-- Logo / Brand -->
        <NuxtLink
          to="/"
          class="group flex items-center gap-3 focus:outline-none"
          @click="closeMenu"
        >
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 border border-zinc-800 flex items-center justify-center text-indigo-400 group-hover:border-indigo-500/50 transition-colors">
            <Code2 class="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
          </div>
          <div class="flex flex-col">
            <span class="text-zinc-100 font-semibold tracking-tight text-base group-hover:text-indigo-400 transition-colors">
              {{ brandName }}
            </span>
            <span class="text-xs text-zinc-400 font-mono">
              {{ brandRole }}
            </span>
          </div>
        </NuxtLink>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-inner">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.to"
            class="px-4 py-1.5 text-xs font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800/60 rounded-full transition-all duration-200"
          >
            {{ item.name }}
          </a>
        </nav>

        <!-- Desktop Action -->
        <div class="hidden md:flex items-center gap-3">
          <a
            href="#contact"
            class="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-900 bg-zinc-100 hover:bg-white rounded-full transition-all duration-200 shadow-sm hover:shadow-indigo-500/25 hover:shadow-md active:scale-95"
          >
            <Sparkles class="w-3.5 h-3.5 text-indigo-600" />
            <span>İletişime Geç</span>
          </a>
        </div>

        <!-- Mobile Menu Toggle -->
        <div class="flex md:hidden items-center">
          <button
            type="button"
            class="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 focus:outline-none"
            aria-label="Menüyü aç/kapat"
            @click="toggleMenu"
          >
            <Component :is="isOpen ? X : Menu" class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="md:hidden absolute top-full left-0 right-0 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-800/80 px-6 py-6 shadow-2xl"
      >
        <div class="flex flex-col space-y-3">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.to"
            class="px-4 py-3 rounded-xl text-sm font-medium text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 transition-colors"
            @click="closeMenu"
          >
            {{ item.name }}
          </a>
          <div class="pt-2 border-t border-zinc-800/80">
            <a
              href="#contact"
              class="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-zinc-900 bg-zinc-100 hover:bg-white rounded-xl transition-colors shadow-sm"
              @click="closeMenu"
            >
              <Sparkles class="w-4 h-4 text-indigo-600" />
              <span>İletişime Geç</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
