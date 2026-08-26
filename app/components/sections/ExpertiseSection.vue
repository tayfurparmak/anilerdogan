<script setup lang="ts">
const expertiseList = [
  {
    category: 'Liderlik',
    title: 'Yönetici Koçluğu',
    desc: 'Liderlik tarzının geliştirilmesi, delegasyon yönetimi, etkili delegasyon ve motivasyon, zor durum senaryoları.',
    skills: ['Birebir Geri Bildirim', 'Karar Verme Mekanizmaları', 'Duygusal Zeka (EQ)', 'Kriz İletişimi']
  },
  {
    category: 'Teknoloji',
    title: 'Mühendislik Yönetimi',
    desc: 'Teknoloji mimarisi tasarımı, teknoloji borcu (tech debt) yönetimi, yüksek performanslı mühendislik takımları inşası.',
    skills: ['Takım Yapılandırma', 'Teknik Süreç Optimizasyonu', 'Sistem Ölçekleme', 'Yetenek Kazanımı']
  },
  {
    category: 'Ürün',
    title: 'Ürün Stratejisi',
    desc: 'Ürün yaşam döngüsü (PLC), pazar uyumu, roadmap oluşturma, önceliklendirme matrisleri ve KPI/OKR yönetimi.',
    skills: ['Product Discovery', 'Roadmapping', 'Kullanıcı Testleri', 'Büyüme (Growth) Analitiği']
  },
  {
    category: 'Metodoloji',
    title: 'Agile & Çevik Süreçler',
    desc: 'Şirket kültürünün çevik prensiplere uyumlandırılması, Scrum/Kanban çerçevelerinin sürdürülebilir kurulması.',
    skills: ['Scrum Master Eğitimi', 'Sprint Planlama', 'Retrospektif Kolaylaştırıcılık', 'Kültür Dönüşümü']
  }
]
</script>

<template>
  <section class="py-20 lg:py-24 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Title Block -->
      <div class="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div class="inline-flex items-center space-x-2 bg-emerald-500/10 dark:bg-emerald-500/15 px-3 py-1 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <span>Uzmanlık Alanları</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white font-serif">
          Gelişim Odaklı Derinlemesine Uzmanlık
        </h2>
        <p class="text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-light">
          İşinizi, takımınızı ve liderliğinizi büyütmek için pratik deneyimlerime dayanan ana yetkinlik alanlarım.
        </p>
      </div>

      <!-- Expertise Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="(item, idx) in expertiseList"
          :key="idx"
          class="bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/40 rounded-3xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {{ item.category }}
              </span>
              <div class="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            
            <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
              {{ item.title }}
            </h3>
            
            <p class="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-light mb-6">
              {{ item.desc }}
            </p>
          </div>

          <!-- Skill Badges -->
          <div class="pt-6 border-t border-slate-100 dark:border-slate-800/60">
            <div class="flex flex-wrap gap-2">
              <span
                v-for="(skill, sIdx) in item.skills"
                :key="sIdx"
                class="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-400 text-xs px-3 py-1 rounded-full border border-slate-200/30 dark:border-slate-800/30 font-light"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
