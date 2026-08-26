import PrismaPkg from '@prisma/client'

// Robust CJS / ESM interop for Nuxt 3 Vite & Nitro runtime
const PrismaClient = (PrismaPkg as any).PrismaClient || (PrismaPkg as any).default?.PrismaClient || PrismaPkg

let prisma: any

declare global {
  var __prisma: any
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient()
  }
  prisma = global.__prisma
}

export default prisma
