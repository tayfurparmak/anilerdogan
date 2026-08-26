<script setup lang="ts">
import { ref } from 'vue'
import { Mail, Send, Github, Linkedin, Twitter, MessageSquare, CheckCircle2, Sparkles } from 'lucide-vue-next'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const isSubmitted = ref(false)
const errorMessage = ref('')

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.message) {
    errorMessage.value = 'Lütfen tüm alanları doldurun.'
    return
  }

  errorMessage.value = ''
  isSubmitting.value = true

  // Simulate API request
  await new Promise(resolve => setTimeout(resolve, 1000))

  isSubmitting.value = false
  isSubmitted.value = true

  form.value = {
    name: '',
    email: '',
    message: ''
  }

  setTimeout(() => {
    isSubmitted.value = false
  }, 5000)
}
</script>

<template>
  <section id="contact" class="py-24 bg-zinc-950 relative border-t border-zinc-900">
    <!-- Glow element -->
    <div class="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <!-- Header -->
      <div class="flex flex-col items-center text-center mb-16">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
          <MessageSquare class="w-3.5 h-3.5" />
          <span>İletişim</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
          Birlikte Harika Bir Şeyler İnşa Edelim
        </h2>
        <p class="text-sm sm:text-base text-zinc-400 max-w-xl">
          Projeleriniz, danışmanlık talepleriniz veya sadece merhaba demek için aşağıdaki formu doldurabilir ya da doğrudan e-posta gönderebilirsiniz.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <!-- Direct Contact Cards / Info -->
        <div class="lg:col-span-5 space-y-4">
          <div class="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md">
            <h3 class="text-lg font-semibold text-zinc-100 mb-2">Doğrudan İletişim</h3>
            <p class="text-sm text-zinc-400 mb-6">
              Sorularınız için doğrudan e-posta adresimi kullanabilirsiniz. Genellikle 24 saat içinde dönüş yapıyorum.
            </p>
            <a
              href="mailto:contact@example.com"
              class="inline-flex items-center gap-3 p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 hover:text-indigo-400 hover:border-indigo-500/40 transition-all w-full group"
            >
              <div class="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                <Mail class="w-4 h-4" />
              </div>
              <div class="flex flex-col text-left">
                <span class="text-xs text-zinc-500 font-mono">E-posta</span>
                <span class="text-sm font-medium text-zinc-200">anil@example.com</span>
              </div>
            </a>
          </div>

          <!-- Social Links Card -->
          <div class="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md">
            <h3 class="text-lg font-semibold text-zinc-100 mb-4">Sosyal Medya</h3>
            <div class="grid grid-cols-3 gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-all group"
              >
                <Github class="w-5 h-5 mb-2 group-hover:scale-110 transition-transform" />
                <span class="text-xs font-medium">GitHub</span>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-all group"
              >
                <Linkedin class="w-5 h-5 mb-2 text-indigo-400 group-hover:scale-110 transition-transform" />
                <span class="text-xs font-medium">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="flex flex-col items-center justify-center p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-zinc-100 hover:border-zinc-700 transition-all group"
              >
                <Twitter class="w-5 h-5 mb-2 text-sky-400 group-hover:scale-110 transition-transform" />
                <span class="text-xs font-medium">Twitter</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div class="lg:col-span-7">
          <div class="p-8 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md relative">
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Success Alert -->
              <div v-if="isSubmitted" class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-3 animate-fade-in">
                <CheckCircle2 class="w-5 h-5 flex-shrink-0" />
                <span class="text-sm font-medium">Mesajınız başarıyla gönderildi! En kısa sürede döneceğim.</span>
              </div>

              <!-- Error Alert -->
              <div v-if="errorMessage" class="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {{ errorMessage }}
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <!-- Name Field -->
                <div class="space-y-2">
                  <label for="name" class="block text-xs font-medium text-zinc-300 font-mono">Adınız</label>
                  <input
                    id="name"
                    v-model="form.name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>

                <!-- Email Field -->
                <div class="space-y-2">
                  <label for="email" class="block text-xs font-medium text-zinc-300 font-mono">E-posta Adresiniz</label>
                  <input
                    id="email"
                    v-model="form.email"
                    type="email"
                    placeholder="ornek@domain.com"
                    class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <!-- Message Field -->
              <div class="space-y-2">
                <label for="message" class="block text-xs font-medium text-zinc-300 font-mono">Mesajınız</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  placeholder="Projenizden veya talebinizden bahsedin..."
                  class="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-zinc-100 placeholder-zinc-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-semibold text-zinc-950 bg-zinc-100 hover:bg-white transition-all shadow-lg shadow-white/5 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles v-if="!isSubmitting" class="w-4 h-4 text-indigo-600" />
                <span v-if="isSubmitting">Gönderiliyor...</span>
                <span v-else>Mesajı Gönder</span>
                <Send v-if="!isSubmitting" class="w-3.5 h-3.5 text-zinc-600 ml-1" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
