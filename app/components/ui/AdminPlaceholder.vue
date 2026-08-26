<script setup lang="ts">
defineProps<{
  title: string
  icon: string
}>()
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-6 sm:p-8">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <UIcon :name="icon" class="w-6 h-6" />
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-900 dark:text-white font-serif">{{ title }}</h1>
          <p class="text-xs text-slate-400 font-light">Bu içerik modülü Supabase veritabanı entegrasyonu için yapılandırılmıştır.</p>
        </div>
      </div>
    </div>

    <!-- Empty State / Placeholder Body -->
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-12 text-center max-w-xl mx-auto space-y-6 my-10">
      <div class="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-center mx-auto text-slate-400">
        <UIcon name="i-heroicons-wrench-screwdriver" class="w-10 h-10 animate-bounce" />
      </div>

      <div class="space-y-2">
        <h2 class="text-lg font-bold text-slate-900 dark:text-white font-serif">Modül Hazırlanıyor</h2>
        <p class="text-xs text-slate-400 leading-relaxed font-light">
          Bu alan için Supabase veri şeması oluşturuldu (Faz 3). CRUD işlemlerini, admin yetkilerini ve form arayüzlerini içerecek olan veri yönetimi modülü bir sonraki fazda aktif edilecektir.
        </p>
      </div>

      <div class="flex items-center justify-center space-x-2 text-xs">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span class="text-emerald-600 dark:text-emerald-400 font-semibold">Supabase Bağlantısı Hazır</span>
      </div>
    </div>
  </div>
</template>
