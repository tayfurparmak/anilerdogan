<script setup lang="ts">
import type { BlogPost } from '~/types'

defineProps<{
  post: BlogPost
}>()
</script>

<template>
  <article class="premium-card group bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl overflow-hidden hover:shadow-xl hover:border-emerald-500/30 dark:hover:border-emerald-500/20 flex flex-col h-full">
    <!-- Image Header -->
    <div class="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0">
      <img
        :src="post.image"
        :alt="post.title"
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <!-- Category Badge -->
      <span class="absolute top-4 left-4 bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-sm">
        {{ post.category }}
      </span>
    </div>

    <!-- Content -->
    <div class="p-6 flex flex-col justify-between flex-grow">
      <div>
        <!-- Publish Date & Read Time -->
        <div class="flex items-center space-x-2 text-xs text-slate-400 dark:text-slate-500 mb-3">
          <span>{{ post.publishedAt }}</span>
          <span>&bull;</span>
          <span>{{ post.readTime }}</span>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-200 mb-3">
          <NuxtLink :to="`/blog/${post.slug}`">
            {{ post.title }}
          </NuxtLink>
        </h3>
        
        <!-- Summary -->
        <p class="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-6">
          {{ post.summary }}
        </p>
      </div>

      <!-- Author -->
      <div class="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between mt-auto">
        <div class="flex items-center space-x-3">
          <img
            :src="post.author.avatar"
            :alt="post.author.name + ' profil fotoğrafı'"
            loading="lazy"
            decoding="async"
            width="32"
            height="32"
            class="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <span class="block text-xs font-medium text-slate-800 dark:text-slate-200">{{ post.author.name }}</span>
            <span class="block text-[10px] text-slate-400">{{ post.author.role }}</span>
          </div>
        </div>

        <UButton
          :to="`/blog/${post.slug}`"
          variant="ghost"
          color="emerald"
          icon="i-heroicons-arrow-up-right"
          class="rounded-full hover:bg-emerald-50"
        />
      </div>
    </div>
  </article>
</template>
