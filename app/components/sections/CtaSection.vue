<template>
  <section class="py-28 bg-slate-950 text-white relative overflow-hidden border-b border-slate-800/60">
    <!-- Ambient Glow Mesh Background -->
    <div class="absolute inset-0 pointer-events-none opacity-40">
      <div class="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-r from-cyan-500/20 via-emerald-500/20 to-indigo-500/20 rounded-full blur-[140px]" />
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
      <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400">
        <span class="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>Stratejik Adım Zamanı</span>
      </div>

      <h2 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-serif leading-tight tracking-tight text-white">
        Bir Sonraki Stratejik Adımınızı <br class="hidden sm:inline" />
        <span class="bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
          Birlikte Tasarlayalım
        </span>
      </h2>
      
      <p class="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto font-sans font-light leading-relaxed">
        Liderlik hedeflerinizi, teknoloji mimarinizi ve ekibinizin dönüşüm ihtiyacını 30 dakikalık ücretsiz strateji seansında değerlendirelim.
      </p>

      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <UButton
          to="/iletisim"
          size="xl"
          class="rounded-full px-9 py-4 font-bold text-sm bg-gradient-to-r from-cyan-500 via-emerald-500 to-teal-500 hover:from-cyan-400 hover:to-emerald-400 text-slate-950 shadow-xl shadow-cyan-500/25 hover:scale-105 transition-all duration-300"
        >
          Ücretsiz Strateji Seansı Planla
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-2" />
        </UButton>
        
        <UButton
          to="/danismanlik"
          variant="outline"
          size="xl"
          class="rounded-full px-8 py-4 font-semibold text-sm border-slate-700 text-slate-200 hover:bg-slate-900 transition-all duration-300"
        >
          Danışmanlık Paketleri
        </UButton>
      </div>
    </div>
  </section>
</template>
