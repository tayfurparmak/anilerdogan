import { computed } from 'vue'
import { useRoute, useState, useHead, useSeoMeta } from '#app'

export function useSeo(title?: string, description?: string, image?: string) {
  const siteSettings = useState<any>('site-settings')
  const route = useRoute()

  // Fallbacks if DB is empty/loading
  const siteName = siteSettings.value?.site_name || 'Anıl Erdoğan'
  const defaultTitle = siteSettings.value?.default_seo_title || 'Anıl Erdoğan | Yönetici Koçu & Yönetim Danışmanı'
  const defaultDesc = siteSettings.value?.default_seo_description || 'Yönetici koçluğu, takım kültürü, teknolojik liderlik ve kariyer gelişimi danışmanlığı.'
  const defaultOgImage = siteSettings.value?.default_og_image || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=1200'

  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle
  const finalDesc = description || defaultDesc
  const finalImage = image || defaultOgImage

  // Construct absolute canonical URL
  const canonicalUrl = computed(() => `https://anilerdogan.com${route.path}`)

  useHead({
    title: finalTitle,
    htmlAttrs: {
      lang: 'tr'
    },
    link: [
      { rel: 'canonical', href: canonicalUrl.value }
    ]
  })

  useSeoMeta({
    title: finalTitle,
    ogTitle: finalTitle,
    description: finalDesc,
    ogDescription: finalDesc,
    ogImage: finalImage,
    ogUrl: canonicalUrl.value,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: finalTitle,
    twitterDescription: finalDesc,
    twitterImage: finalImage
  })
}
