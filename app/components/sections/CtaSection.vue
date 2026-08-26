<template>
  <section class="py-20 lg:py-28 bg-gradient-to-r from-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
    <!-- Background Accents -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
    </div>

    <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
      <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif leading-tight">
        Kariyerinizde veya Şirketinizde <br class="hidden sm:inline" />
        Bir Sonraki Seviyeye Geçmeye Hazır mısınız?
      </h2>
      
      <p class="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-sans font-light leading-relaxed">
        Gelin, karşılaştığınız zorlukları birlikte analiz edelim ve size en uygun gelişim veya dönüşüm planını oluşturalım. İlk tanışma seansı tamamen ücretsizdir.
      </p>

      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
        <UButton
          to="/iletisim"
          color="emerald"
          size="lg"
          class="rounded-full px-8 py-4 font-semibold text-base shadow-lg shadow-emerald-500/10 hover:bg-emerald-500"
        >
          Ücretsiz Ön Görüşme Planla
        </UButton>
        
        <UButton
          to="/danismanlik"
          color="neutral"
          variant="outline"
          size="lg"
          class="rounded-full px-8 py-4 font-semibold text-base text-white border-white/20 hover:bg-white/10"
        >
          Danışmanlık Paketleri
        </UButton>
      </div>
    </div>
  </section>
</template>
