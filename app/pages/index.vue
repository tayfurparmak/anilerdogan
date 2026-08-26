<script setup lang="ts">
import HeroSection from '~/components/hero/HeroSection.vue'
import AboutSection from '~/components/sections/AboutSection.vue'
import ExpertiseSection from '~/components/sections/ExpertiseSection.vue'
import ServicesSection from '~/components/sections/ServicesSection.vue'
import EducationSection from '~/components/sections/EducationSection.vue'
import ApproachSection from '~/components/sections/ApproachSection.vue'
import TestimonialsSection from '~/components/sections/TestimonialsSection.vue'
import BlogSection from '~/components/sections/BlogSection.vue'
import CtaSection from '~/components/sections/CtaSection.vue'
import { useSeo } from '~/composables/useSeo'

// Define metadata for home page
useSeo(
  'Yönetici Koçu & Teknoloji Stratejisi Danışmanı',
  'Premium ve sonuç odaklı yönetici koçluğu, liderlik gelişimi, teknoloji stratejisi ve ürün yönetimi danışmanlık hizmetleri.'
)

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Anıl Erdoğan",
  "jobTitle": "Yönetici Koçu & Yönetim Danışmanı",
  "url": "https://anilerdogan.com",
  "sameAs": [
    "https://www.linkedin.com/in/anilerdogan"
  ]
}

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "Anıl Erdoğan Yönetici Koçluğu ve Yönetim Danışmanlığı",
  "image": "https://anilerdogan.com/anil-erdogan.png",
  "@id": "https://anilerdogan.com/#service",
  "url": "https://anilerdogan.com",
  "telephone": "+905320000000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Maslak",
    "addressLocality": "İstanbul",
    "addressCountry": "TR"
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(personSchema)
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify(serviceSchema)
    }
  ]
})
</script>

<template>
  <div class="overflow-x-hidden">
    <!-- Hero Section -->
    <HeroSection />

    <!-- Brief About -->
    <AboutSection />

    <!-- Expertise Areas -->
    <ExpertiseSection />

    <!-- Services Grid -->
    <ServicesSection />

    <!-- Education Courses -->
    <EducationSection />

    <!-- Approach / Methodology -->
    <ApproachSection />

    <!-- Testimonials -->
    <TestimonialsSection />

    <!-- Blog Posts -->
    <BlogSection />

    <!-- Call to Action -->
    <CtaSection />
  </div>
</template>
