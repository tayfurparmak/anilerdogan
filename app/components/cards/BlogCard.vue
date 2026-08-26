<script setup lang="ts">
import type { BlogPost } from '~/types'

defineProps<{
  post: BlogPost
}>()
</script>

<template>
  <article class="bg-slate-900/80 border border-slate-800/80 rounded-[32px] overflow-hidden hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col h-full shadow-2xl group">
    <!-- Image Header -->
    <div class="relative h-48 overflow-hidden bg-slate-950 shrink-0">
      <img
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md border border-slate-800 text-cyan-400 px-3 py-1 rounded-full">
        {{ post.category }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col justify-between flex-grow">
      <div class="space-y-3">
        <!-- Publish Date & Read Time -->
        <div class="flex items-center space-x-2 text-xs text-slate-400 font-mono">
          <span>{{ post.publishedAt }}</span>
          <span>•</span>
          <span>{{ post.readTime }}</span>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-white line-clamp-2 group-hover:text-cyan-300 transition-colors font-serif">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h3>
        
        <!-- Summary -->
        <p class="text-xs text-slate-400 line-clamp-3 leading-relaxed font-light">
          {{ post.summary }}
        </p>
      </div>

      <!-- Author -->
      <div class="pt-4 border-t border-slate-800/60 flex items-center justify-between mt-6">
        <div class="flex items-center space-x-3">
          <img
            :src="post.author.avatar"
            :alt="post.author.name + ' profil fotoğrafı'"
            loading="lazy"
            decoding="async"
            width="32"
            height="32"
            class="w-8 h-8 rounded-full object-cover border border-slate-800"
          />
          <div>
            <span class="block text-xs font-semibold text-white">{{ post.author.name }}</span>
            <span class="block text-[10px] text-slate-400">{{ post.author.role }}</span>
          </div>
        </div>

        <NuxtLink
          :to="`/blog/${post.slug}`"
          class="w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-cyan-400 hover:border-cyan-500/40 hover:scale-105 transition-all"
          :aria-label="post.title + ' makalesini okuyun'"
        >
          <UIcon name="i-heroicons-arrow-up-right" class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>
  </article>
</template>
