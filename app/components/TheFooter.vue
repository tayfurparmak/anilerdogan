<script setup lang="ts">
import { Code2, Heart, Github, Linkedin, Twitter } from 'lucide-vue-next'

withDefaults(
  defineProps<{
    brandName?: string
    currentYear?: number
    navItems?: Array<{ name: string; to: string }>
  }>(),
  {
    brandName: 'Anıl Erdoğan',
    currentYear: 2026,
    navItems: () => [
      { name: 'Ana Sayfa', to: '#' },
      { name: 'Projeler', to: '#projects' },
      { name: 'Blog', to: '#blog' },
      { name: 'İletişim', to: '#contact' }
    ]
  }
)
</script>

<template>
  <footer class="bg-zinc-950 border-t border-zinc-900 py-12">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Brand & Copyright -->
        <div class="flex flex-col items-center md:items-start gap-2">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500/20 to-emerald-500/20 border border-zinc-800 flex items-center justify-center text-indigo-400">
              <Code2 class="w-4 h-4 text-indigo-400" />
            </div>
            <span class="text-zinc-100 font-semibold tracking-tight text-sm">
              {{ brandName }}
            </span>
          </div>
          <p class="text-xs text-zinc-500 text-center md:text-left">
            © {{ currentYear }} Tüm hakları saklıdır. Nuxt 3 & Tailwind CSS ile tasarlandı.
          </p>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-wrap items-center justify-center gap-6">
          <a
            v-for="item in navItems"
            :key="item.name"
            :href="item.to"
            class="text-xs font-medium text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            {{ item.name }}
          </a>
        </div>

        <!-- Social Icons -->
        <div class="flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
            aria-label="GitHub"
          >
            <Github class="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin class="w-4 h-4 text-indigo-400" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            class="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:border-zinc-700 transition-all"
            aria-label="Twitter"
          >
            <Twitter class="w-4 h-4 text-sky-400" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>
