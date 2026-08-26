<script setup lang="ts">
import { ref, computed } from 'vue'
import ProjectCard, { type Project } from './ProjectCard.vue'
import { FolderGit2 } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    description?: string
    projects?: Project[]
  }>(),
  {
    title: 'Öne Çıkan Projeler',
    subtitle: 'Portfolyo',
    description: 'En son geliştirdiğim modern web uygulamaları, açık kaynaklı projeler ve mimari çalışmalarım.',
    projects: () => [
      {
        id: 1,
        title: 'Vercel-Inspired SaaS Dashboard',
        description: 'Nuxt 3, Tailwind CSS v4 ve Supabase kullanılarak geliştirilmiş, yüksek performanslı analitik ve yönetim paneli.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
        tags: ['Nuxt 3', 'TypeScript', 'TailwindCSS', 'Supabase'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com'
      },
      {
        id: 2,
        title: 'AI Prompt Studio & Marketplace',
        description: 'Yapay zeka prompt mühendisliği için modern arayüz, topluluk paylaşım platformu ve gelişmiş arama modülü.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
        tags: ['Vue 3', 'Pinia', 'TailwindCSS', 'OpenAI API'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com'
      },
      {
        id: 3,
        title: 'Enterprise E-Commerce Engine',
        description: 'Headless e-ticaret mimarisi, ultra hızlı sayfa geçişleri, çoklu dil desteği ve özel ödeme entegrasyonları.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
        tags: ['Nuxt 3', 'GraphQL', 'TailwindCSS', 'Stripe'],
        liveUrl: 'https://example.com',
        githubUrl: 'https://github.com'
      }
    ]
  }
)

const activeFilter = ref('Tümü')

const categories = ['Tümü', 'Nuxt 3', 'Vue 3', 'Fullstack']

const filteredProjects = computed(() => {
  if (activeFilter.value === 'Tümü') return props.projects
  return props.projects.filter(p => p.tags.includes(activeFilter.value))
})
</script>

<template>
  <section id="projects" class="py-24 bg-zinc-950 relative">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="flex flex-col items-center text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
          <FolderGit2 class="w-3.5 h-3.5" />
          <span>{{ subtitle }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          {{ title }}
        </h2>
        <p class="text-sm sm:text-base text-zinc-400 max-w-xl">
          {{ description }}
        </p>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
