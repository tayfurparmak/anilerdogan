<script setup lang="ts">
import { ref } from 'vue'

const activeCategoryIndex = ref(0)

const expertiseList = [
  {
    category: 'Liderlik & Koçluk',
    title: 'Yönetici Koçluğu & Liderlik Dönüşümü',
    icon: 'i-heroicons-user-group',
    color: 'from-cyan-500 to-blue-600',
    glowColor: 'cyan',
    desc: 'Liderlik tarzının geliştirilmesi, stratejik karar alma mekanizmaları, duygusal zeka (EQ) ve kriz döneminde yüksek performans yönetimi.',
    skills: ['Birebir Geri Bildirim Sistemleri', 'Karar Verme Mekanizmaları', 'Duygusal Zeka (EQ)', 'Kriz İletişimi', 'Delegasyon & Güven']
  },
  {
    category: 'Teknoloji & Mimari',
    title: 'Mühendislik Yönetimi & AI Mimari',
    icon: 'i-heroicons-cpu-chip',
    color: 'from-indigo-500 to-purple-600',
    glowColor: 'indigo',
    desc: 'Teknoloji mimarisi tasarımı, yapay zeka entegrasyonu, teknoloji borcu (tech debt) yönetimi ve yüksek performanslı mühendislik takımları inşası.',
    skills: ['Takım Yapılandırma', 'Teknik Süreç Optimizasyonu', 'Sistem Ölçekleme', 'Yapay Zeka Entegrasyonları', 'Yetenek Yönetimi']
  },
  {
    category: 'Ürün & Büyüme',
    title: 'Ürün Stratejisi & Pazar Uyumu',
    icon: 'i-heroicons-chart-bar-square',
    color: 'from-emerald-500 to-teal-600',
    glowColor: 'emerald',
    desc: 'Ürün yaşam döngüsü (PLC), pazar uyumu, roadmap oluşturma, önceliklendirme matrisleri ve veri odaklı OKR/KPI yönetimi.',
    skills: ['Product Discovery', 'Roadmap Yönetimi', 'Kullanıcı Deneyim Testleri', 'Büyüme (Growth) Analitiği', 'OKR Matrisleri']
  },
  {
    category: 'Metodoloji & Dönüşüm',
    title: 'Agile & Çevik Kültür Yapılanması',
    icon: 'i-heroicons-bolt',
    color: 'from-amber-500 to-orange-600',
    glowColor: 'amber',
    desc: 'Şirket kültürünün çevik prensiplere uyumlandırılması, Scrum/Kanban çerçevelerinin sürdürülebilir kurulması ve organizasyonel esneklik.',
    skills: ['Scrum Master Koçluğu', 'Sprint & Portfolio Planlama', 'Retrospektif Kolaylaştırıcılık', 'Kültür Dönüşümü', 'Yalın Yönetim']
  }
]
</script>

<template>
  <section id="uzmanlik" class="py-28 bg-slate-950 text-white relative border-b border-slate-800/60 overflow-hidden">
    <!-- Ambient Neural Nodes -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 blur-[160px] pointer-events-none" />

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Section Header -->
      <div class="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <div class="inline-flex items-center space-x-2 bg-slate-900 border border-cyan-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-cyan-400 backdrop-blur-md">
          <UIcon name="i-heroicons-sparkles" class="w-4 h-4" />
          <span>Capability Map & Ecosystem</span>
        </div>
        <h2 class="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-serif">
          Stratejik Yetkinlik Ekosistemi
        </h2>
        <p class="text-slate-400 text-base sm:text-lg leading-relaxed font-light">
          Teknoloji, insan zekası ve stratejik yönetim kesişiminde pratik deneyimlerle harmanlanmış 4 ana yetkinlik sütunu.
        </p>
      </div>

      <!-- Capability Explorer Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Interactive Category Selectors (Left List) -->
        <div class="lg:col-span-5 space-y-3">
          <button
            v-for="(item, idx) in expertiseList"
            :key="idx"
            class="w-full text-left p-6 rounded-3xl border transition-all duration-300 flex items-center justify-between group"
            :class="[
              activeCategoryIndex === idx
                ? 'bg-slate-900/90 border-cyan-500/50 shadow-xl shadow-cyan-500/10'
                : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70 hover:border-slate-700'
            ]"
            @click="activeCategoryIndex = idx"
          >
            <div class="flex items-center space-x-4">
              <div
                class="w-12 h-12 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br shadow-md shrink-0"
                :class="item.color"
              >
                <UIcon :name="item.icon" class="w-6 h-6" />
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{{ item.category }}</span>
                <span class="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">{{ item.title }}</span>
              </div>
            </div>
            <UIcon
              name="i-heroicons-chevron-right"
              class="w-5 h-5 transition-transform duration-300 shrink-0"
              :class="[
                activeCategoryIndex === idx ? 'text-cyan-400 translate-x-1' : 'text-slate-600 group-hover:text-slate-400'
              ]"
            />
          </button>
        </div>

        <!-- Capability Detail Display Node (Right Card) -->
        <div class="lg:col-span-7">
          <div
            v-if="expertiseList[activeCategoryIndex]"
            class="bg-slate-900/90 border border-slate-800 p-8 sm:p-10 rounded-[36px] shadow-2xl relative overflow-hidden backdrop-blur-xl transition-all duration-500"
          >
            <!-- Background Accent Ribbon -->
            <div
              class="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[90px] opacity-20"
              :class="[
                activeCategoryIndex === 0 ? 'bg-cyan-500' :
                activeCategoryIndex === 1 ? 'bg-indigo-500' :
                activeCategoryIndex === 2 ? 'bg-emerald-500' : 'bg-amber-500'
              ]"
            />

            <div class="relative z-10 space-y-8">
              <div class="flex items-center justify-between pb-6 border-b border-slate-800">
                <div class="flex items-center space-x-3">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center text-white bg-gradient-to-br"
                    :class="expertiseList[activeCategoryIndex]!.color"
                  >
                    <UIcon :name="expertiseList[activeCategoryIndex]!.icon" class="w-5 h-5" />
                  </div>
                  <span class="text-sm font-bold text-cyan-400 uppercase tracking-widest">
                    {{ expertiseList[activeCategoryIndex]!.category }}
                  </span>
                </div>
                <span class="text-xs font-mono text-slate-500">Node #0{{ activeCategoryIndex + 1 }}</span>
              </div>

              <div>
                <h3 class="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                  {{ expertiseList[activeCategoryIndex]!.title }}
                </h3>
                <p class="text-slate-300 text-base leading-relaxed font-light">
                  {{ expertiseList[activeCategoryIndex]!.desc }}
                </p>
              </div>

              <!-- Skill Badges Grid -->
              <div class="space-y-3">
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block">Temel Yetkinlik & Metodolojiler:</span>
                <div class="flex flex-wrap gap-2.5">
                  <span
                    v-for="(skill, sIdx) in expertiseList[activeCategoryIndex]!.skills"
                    :key="sIdx"
                    class="bg-slate-950 text-slate-200 text-xs px-4 py-2 rounded-xl border border-slate-800 font-medium shadow-sm hover:border-cyan-500/40 hover:text-cyan-300 transition-colors"
                  >
                    ✦ {{ skill }}
                  </span>
                </div>
              </div>

              <!-- Action Link -->
              <div class="pt-6 border-t border-slate-800 flex justify-end">
                <UButton
                  to="/danismanlik"
                  variant="link"
                  class="text-xs font-bold text-cyan-400 hover:text-cyan-300 p-0 flex items-center space-x-2 group"
                >
                  <span>İlgili Danışmanlık Çözümlerini İnceleyin</span>
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
