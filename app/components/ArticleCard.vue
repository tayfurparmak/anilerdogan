<script setup lang="ts">
import { Calendar, Clock, ArrowRight } from 'lucide-vue-next'

export interface Article {
  id: string | number
  title: string
  summary: string
  date: string
  readTime: string
  category: string
  slug: string
  image?: string
}

defineProps<{
  article: Article
}>()
</script>

<template>
  <article class="group relative bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-6 backdrop-blur-md hover:border-zinc-700/80 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5 flex flex-col justify-between">
    <div>
      <!-- Meta: Category, Date, ReadTime -->
      <div class="flex items-center justify-between gap-2 mb-4">
        <span class="px-2.5 py-1 text-[11px] font-medium font-mono rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          {{ article.category }}
        </span>
        <div class="flex items-center gap-3 text-xs text-zinc-500 font-mono">
          <span class="flex items-center gap-1">
            <Calendar class="w-3.5 h-3.5" />
            {{ article.date }}
          </span>
          <span class="flex items-center gap-1">
            <Clock class="w-3.5 h-3.5" />
            {{ article.readTime }}
          </span>
        </div>
      </div>

      <!-- Title -->
      <h3 class="text-lg font-semibold text-zinc-100 tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">
        <NuxtLink :to="`/blog/${article.slug}`" class="focus:outline-none">
          <span class="absolute inset-0" />
          {{ article.title }}
        </NuxtLink>
      </h3>

      <!-- Summary -->
      <p class="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
        {{ article.summary }}
      </p>
    </div>

    <!-- Read More Link -->
    <div class="flex items-center text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors pt-4 border-t border-zinc-800/60 mt-auto">
      <span>Devamını Oku</span>
      <ArrowRight class="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
    </div>
  </article>
</template>
