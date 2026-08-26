<script setup lang="ts">
import { ref } from 'vue'
import { siteSettingsData } from '~/data/mockData'

const email = ref('')
const isSubscribed = ref(false)

const handleSubscribe = () => {
  if (email.value) {
    // Mimic API subscription
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
  <footer class="bg-slate-900 text-slate-400 border-t border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <!-- Brand Info -->
        <div class="space-y-6">
          <div class="flex items-center space-x-2">
            <span class="text-2xl font-bold text-white font-serif">Anıl Erdoğan</span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed">
            Liderlerin potansiyellerini açığa çıkarmalarına, ekiplerin yüksek performanslı yapılar kurmalarına ve teknolojik hedeflere ulaşmalarına rehberlik eden premium danışmanlık hizmetleri.
          </p>
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a
              v-if="siteSettingsData.contactInfo"
              href="https://linkedin.com/in/anilerdogan"
              target="_blank"
              class="hover:text-emerald-400 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <UIcon name="i-simple-icons-linkedin" class="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/anilerdogan"
              target="_blank"
              class="hover:text-emerald-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <UIcon name="i-simple-icons-x" class="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com/anilerdogan"
              target="_blank"
              class="hover:text-emerald-400 transition-colors duration-200"
              aria-label="Instagram"
            >
              <UIcon name="i-simple-icons-instagram" class="w-5 h-5" />
            </a>
            <a
              href="https://medium.com/@anilerdogan"
              target="_blank"
              class="hover:text-emerald-400 transition-colors duration-200"
              aria-label="Medium"
            >
              <UIcon name="i-simple-icons-medium" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- Navigation Links -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-6">Hızlı Menü</h3>
          <ul class="space-y-4">
            <li>
              <NuxtLink to="/" class="text-sm hover:text-white transition-colors">Ana Sayfa</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/hakkimda" class="text-sm hover:text-white transition-colors">Hakkımda</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/danismanlik" class="text-sm hover:text-white transition-colors">Danışmanlık</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/egitimler" class="text-sm hover:text-white transition-colors">Eğitimler</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/blog" class="text-sm hover:text-white transition-colors">Blog & Makaleler</NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-6">İletişim Bilgileri</h3>
          <ul class="space-y-4 text-sm">
            <li class="flex items-start space-x-3">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{{ siteSettingsData.contactInfo.email }}</span>
            </li>
            <li class="flex items-start space-x-3">
              <UIcon name="i-heroicons-phone" class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{{ siteSettingsData.contactInfo.phone }}</span>
            </li>
            <li class="flex items-start space-x-3">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-emerald-400 mt-0.5 shrink-0" />
              <span>{{ siteSettingsData.contactInfo.address }}</span>
            </li>
          </ul>
        </div>

        <!-- Newsletter Subscription -->
        <div>
          <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-6">Bültene Abone Olun</h3>
          <p class="text-sm text-slate-400 mb-4">
            Liderlik, teknoloji stratejileri ve kariyer tüyolarıyla ilgili haftalık bültenimi kaçırmayın.
          </p>
          <form class="space-y-3" @submit.prevent="handleSubscribe">
            <div class="flex flex-col sm:flex-row gap-2">
              <UInput
                v-model="email"
                type="email"
                placeholder="E-posta adresiniz"
                required
                class="bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:ring-emerald-500 flex-grow"
              />
              <UButton
                type="submit"
                color="emerald"
                class="rounded-full px-5 hover:bg-emerald-500"
              >
                Abone Ol
              </UButton>
            </div>
            <p v-if="isSubscribed" class="text-xs text-emerald-400 flex items-center gap-1 mt-2">
              <UIcon name="i-heroicons-check-circle" class="w-4 h-4" />
              Kaydınız başarıyla yapıldı. Teşekkürler!
            </p>
          </form>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p class="text-xs text-slate-500">
          &copy; {{ currentYear }} Anıl Erdoğan. Tüm hakları saklıdır.
        </p>
        <div class="flex space-x-6 text-xs text-slate-500">
          <NuxtLink to="/kvkk" class="hover:text-slate-300 transition-colors">KVKK Aydınlatma Metni</NuxtLink>
          <NuxtLink to="/gizlilik" class="hover:text-slate-300 transition-colors">Gizlilik Politikası</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
