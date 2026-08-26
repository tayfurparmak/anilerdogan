<script setup lang="ts">
import { ref } from 'vue'
import { siteSettingsData } from '~/data/mockData'

const email = ref('')
const isSubscribed = ref(false)

const handleSubscribe = () => {
  if (email.value) {
    isSubscribed.value = true
    email.value = ''
    setTimeout(() => {
      isSubscribed.value = false
    }, 4000)
  }
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-slate-950 text-slate-400 border-t border-slate-800/80">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand Info -->
        <div class="space-y-6">
          <div class="flex items-center space-x-3">
            <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 via-emerald-500 to-indigo-600 flex items-center justify-center p-0.5 shadow-md shadow-cyan-500/20">
              <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400 font-extrabold text-sm">AE</span>
              </div>
            </div>
            <span class="text-xl font-bold text-white font-serif">Anıl Erdoğan</span>
          </div>
          <p class="text-xs text-slate-400 leading-relaxed font-light">
            AI çağında liderlerin potansiyellerini açığa çıkarmalarına, yüksek performanslı mühendislik ve ürün takımları inşasına stratejik danışmanlık rehberliği.
          </p>
          <!-- Social Links -->
          <div class="flex space-x-4">
            <a
              href="https://linkedin.com/in/anilerdogan"
              target="_blank"
              class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="LinkedIn"
            >
              <UIcon name="i-simple-icons-linkedin" class="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com/anilerdogan"
              target="_blank"
              class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="Twitter"
            >
              <UIcon name="i-simple-icons-x" class="w-4 h-4" />
            </a>
            <a
              href="https://medium.com/@anilerdogan"
              target="_blank"
              class="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all"
              aria-label="Medium"
            >
              <UIcon name="i-simple-icons-medium" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xs font-bold text-white uppercase tracking-wider mb-6 font-mono text-cyan-400">Hızlı Menü</h3>
          <ul class="space-y-3.5 text-xs font-medium">
            <li><NuxtLink to="/" class="hover:text-cyan-300 transition-colors">Ana Sayfa</NuxtLink></li>
            <li><NuxtLink to="/hakkimda" class="hover:text-cyan-300 transition-colors">Hakkımda</NuxtLink></li>
            <li><NuxtLink to="/danismanlik" class="hover:text-cyan-300 transition-colors">Danışmanlık Çözümleri</NuxtLink></li>
            <li><NuxtLink to="/egitimler" class="hover:text-cyan-300 transition-colors">Kurumsal Eğitimler</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-cyan-300 transition-colors">Yayınlar & Makaleler</NuxtLink></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-xs font-bold text-white uppercase tracking-wider mb-6 font-mono text-cyan-400">İletişim</h3>
          <ul class="space-y-3.5 text-xs">
            <li class="flex items-start space-x-3">
              <UIcon name="i-heroicons-envelope" class="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span>{{ siteSettingsData.contactInfo.email }}</span>
            </li>
            <li class="flex items-start space-x-3">
              <UIcon name="i-heroicons-phone" class="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span>{{ siteSettingsData.contactInfo.phone }}</span>
            </li>
            <li class="flex items-start space-x-3">
              <UIcon name="i-heroicons-map-pin" class="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
              <span>Maslak, İstanbul / Türkiye</span>
            </li>
          </ul>
        </div>

        <!-- Newsletter Subscription -->
        <div>
          <h3 class="text-xs font-bold text-white uppercase tracking-wider mb-6 font-mono text-cyan-400">Bülten Aboneliği</h3>
          <p class="text-xs text-slate-400 mb-4 leading-relaxed font-light">
            AI trendleri, liderlik ve teknoloji stratejileri üzerine haftalık yayın.
          </p>
          <form class="space-y-3" @submit.prevent="handleSubscribe">
            <div class="flex flex-col gap-2">
              <UInput
                v-model="email"
                type="email"
                placeholder="E-posta adresiniz"
                required
                class="bg-slate-900 border-slate-800 text-white text-xs placeholder-slate-500 rounded-xl"
              />
              <UButton
                type="submit"
                color="primary"
                class="rounded-xl py-2.5 font-bold text-xs bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 hover:from-cyan-400 hover:to-emerald-400 justify-center"
              >
                Abone Ol
              </UButton>
            </div>
            <p v-if="isSubscribed" class="text-xs text-emerald-400 flex items-center gap-1 mt-2">
              <UIcon name="i-heroicons-check-circle" class="w-4 h-4" />
              Bülten kaydınız oluşturuldu. Teşekkürler!
            </p>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-xs text-slate-500">
          &copy; {{ currentYear }} Anıl Erdoğan. Tüm hakları saklıdır.
        </p>
        <div class="flex space-x-6 text-xs text-slate-500">
          <NuxtLink to="/kvkk" class="hover:text-slate-300 transition-colors">KVKK Metni</NuxtLink>
          <NuxtLink to="/gizlilik" class="hover:text-slate-300 transition-colors">Gizlilik Politikası</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
