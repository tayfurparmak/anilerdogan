<script setup lang="ts">
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 px-4 py-16 text-center space-y-6">
    <!-- Visual icon indicator -->
    <div class="w-20 h-20 rounded-3xl bg-emerald-500/10 dark:bg-emerald-500/15 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-4 mx-auto">
      <UIcon name="i-heroicons-exclamation-triangle" class="w-10 h-10" />
    </div>

    <!-- Error status code -->
    <h1 class="text-6xl font-extrabold font-serif text-slate-900 dark:text-white">
      {{ error?.statusCode || 500 }}
    </h1>

    <h2 class="text-xl font-bold text-slate-800 dark:text-slate-200 font-serif">
      {{ error?.statusCode === 404 ? 'Sayfa Bulunamadı' : 'Bir Hata Oluştu' }}
    </h2>

    <p class="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto font-sans font-light leading-relaxed">
      {{ error?.statusCode === 404 
        ? (error?.message || 'Aradığınız sayfa kaldırılmış veya hiç var olmamış olabilir.') 
        : 'Sistemlerimizde beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyin.' 
      }}
    </p>

    <!-- Clear error CTA -->
    <div class="pt-4">
      <UButton
        color="emerald"
        size="lg"
        class="rounded-full px-8 py-3.5 font-semibold"
        @click="handleError"
      >
        Ana Sayfaya Git
      </UButton>
    </div>
  </div>
</template>
