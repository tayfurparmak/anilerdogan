<script setup lang="ts">
import { useSeo } from '~/composables/useSeo'

useSeo(
  'Gizlilik Politikası',
  'Kişisel verilerinizin toplanması, kullanımı ve gizlilik kurallarımız hakkında detaylı açıklama.'
)
</script>

<template>
  <div class="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/80 rounded-3xl p-8 sm:p-12 space-y-8">
      <h1 class="text-3xl font-extrabold text-slate-900 dark:text-white font-serif mb-6 pb-4 border-b border-slate-100 dark:border-slate-800">
        Gizlilik Politikası
      </h1>

      <div class="space-y-6 text-sm text-slate-600 dark:text-slate-400 font-sans font-light leading-relaxed">
        <p>
          Son Güncelleme Tarihi: 26 Ağustos 2026
        </p>
        <p>
          <strong>Anıl Erdoğan Danışmanlık</strong> olarak gizliliğinize büyük saygı duyuyoruz. Web sitemizi ziyaret ettiğinizde ve sunduğumuz hizmetleri kullandığınızda, kişisel bilgilerinizin güvende kalmasını sağlamak temel prensibimizdir. Bu gizlilik politikası, verilerinizi nasıl topladığımızı ve kullandığımızı açıklar.
        </p>

        <h2 class="text-lg font-bold text-slate-900 dark:text-white font-serif pt-4">1. Toplanan Veriler</h2>
        <p>
          Web sitemizi ziyaretiniz sırasında, kullanıcı deneyimini iyileştirmek adına çerezler (cookies) aracılığıyla bazı teknik veriler (IP adresi, tarayıcı türü, ziyaret süresi vb.) toplanabilir. Ayrıca, sitemizdeki iletişim ve başvuru formlarını doldurarak bize kendi rızanızla ilettiğiniz kişisel verileriniz veri tabanımızda güvenle saklanır.
        </p>

        <h2 class="text-lg font-bold text-slate-900 dark:text-white font-serif pt-4">2. Verilerin Kullanımı</h2>
        <p>
          Bize ilettiğiniz bilgiler sadece şu amaçlar doğrultusunda kullanılır:
        </p>
        <ul class="list-disc pl-5 space-y-2">
          <li>Sorularınıza ve danışmanlık taleplerinize dönüş sağlamak.</li>
          <li>Talep ettiğiniz eğitim veya mentorluk programlarının organizasyonunu yapmak.</li>
          <li>Aboneliğinizi onayladığınız bültenleri tarafınıza ulaştırmak.</li>
          <li>Sitenin performansını analiz etmek ve arayüzü iyileştirmek.</li>
        </ul>

        <h2 class="text-lg font-bold text-slate-900 dark:text-white font-serif pt-4">3. Çerezler (Cookies)</h2>
        <p>
          Web sitemiz, ziyaretçi tercihlerini hatırlamak ve site performansını analiz etmek amacıyla çerezlerden faydalanır. Çerez tercihlerinizi dilediğiniz zaman tarayıcı ayarlarınız üzerinden değiştirebilir veya çerezleri tamamen devre dışı bırakabilirsiniz.
        </p>

        <h2 class="text-lg font-bold text-slate-900 dark:text-white font-serif pt-4">4. Güvenlik</h2>
        <p>
          Kişisel verilerinizin yetkisiz erişime, kayba veya çalınmaya karşı korunması için endüstri standardı güvenlik önlemlerini (SSL şifreleme vb.) uyguluyoruz. Ancak internet üzerinden yapılan hiçbir veri iletiminin %100 güvenli olduğu garanti edilemez.
        </p>

        <h2 class="text-lg font-bold text-slate-900 dark:text-white font-serif pt-4">5. İletişim</h2>
        <p>
          Gizlilik politikamız ile ilgili soru veya görüşleriniz için bizimle <strong>info@anilerdogan.com</strong> e-posta adresi üzerinden iletişime geçebilirsiniz.
        </p>
      </div>
    </div>
  </div>
</template>
