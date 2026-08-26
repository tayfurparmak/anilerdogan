<script setup lang="ts">
import { ExternalLink, Github, Layers } from 'lucide-vue-next'

export interface Project {
  id: string | number
  title: string
  description: string
  image: string
  tags: string[]
  liveUrl?: string
  githubUrl?: string
  featured?: boolean
}

defineProps<{
  project: Project
}>()
</script>

<template>
  <div class="group relative bg-zinc-900/50 border border-zinc-800/80 rounded-2xl overflow-hidden backdrop-blur-md hover:border-zinc-700/80 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full">
    <!-- Project Thumbnail Container -->
    <div class="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border-b border-zinc-800/60">
      <img
        :src="project.image"
        :alt="project.title"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <!-- Content Area -->
    <div class="p-6 flex flex-col flex-grow justify-between">
      <div>
        <!-- Tech Badges -->
        <div class="flex flex-wrap gap-1.5 mb-4">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="px-2.5 py-1 text-[11px] font-medium font-mono rounded-md bg-zinc-800/60 text-zinc-300 border border-zinc-700/40"
          >
            {{ tag }}
          </span>
        </div>

        <!-- Title -->
        <h3 class="text-lg font-semibold text-zinc-100 tracking-tight mb-2 group-hover:text-indigo-400 transition-colors">
          {{ project.title }}
        </h3>

        <!-- Description -->
        <p class="text-sm text-zinc-400 leading-relaxed line-clamp-3 mb-6">
          {{ project.description }}
        </p>
      </div>

      <!-- Footer Actions -->
      <div class="flex items-center gap-3 pt-4 border-t border-zinc-800/60 mt-auto">
        <a
          v-if="project.liveUrl"
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-zinc-950 bg-zinc-100 hover:bg-white rounded-lg transition-colors shadow-sm"
        >
          <span>Canlı Demo</span>
          <ExternalLink class="w-3.5 h-3.5" />
        </a>
        <a
          v-if="project.githubUrl"
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          :class="[
            'inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-medium text-zinc-300 bg-zinc-800/80 hover:bg-zinc-800 hover:text-zinc-100 border border-zinc-700/60 rounded-lg transition-colors',
            project.liveUrl ? 'w-auto' : 'flex-1'
          ]"
        >
          <Github class="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
      </div>
    </div>
  </div>
</template>
