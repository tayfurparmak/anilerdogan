export interface Profile {
  id: string
  name: string
  title: string
  bio: string
  avatar: string
  socialLinks: {
    linkedin?: string
    twitter?: string
    instagram?: string
    medium?: string
  }
  stats: {
    clients: string
    experience: string
    trainings: string
    satisfaction: string
  }
}

export interface Education {
  id: string
  title: string
  description: string
  duration: string
  price: string
  level: string
  image: string
  slug: string
  features: string[]
  isActive: boolean
}

export interface Service {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  features: string[]
  duration: string
  price: string
  slug: string
  icon: string
  isActive: boolean
}

export interface BlogPost {
  id: string
  title: string
  summary: string
  content: string
  category: string
  readTime: string
  publishedAt: string
  image: string
  slug: string
  author: {
    name: string
    role: string
    avatar: string
  }
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  quote: string
  avatar: string
  rating: number
}

export interface ContactInfo {
  email: string
  phone: string
  address: string
  mapUrl?: string
}

export interface SiteSettings {
  siteName: string
  siteTitle: string
  siteDescription: string
  contactInfo: ContactInfo
}
