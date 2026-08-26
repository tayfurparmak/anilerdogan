import { PrismaClient } from '@prisma/client'

let prismaInstance: any = null

try {
  if (process.env.NODE_ENV === 'production') {
    prismaInstance = new PrismaClient()
  } else {
    if (!(globalThis as any).__prisma) {
      ;(globalThis as any).__prisma = new PrismaClient()
    }
    prismaInstance = (globalThis as any).__prisma
  }
} catch (e) {
  console.warn('[Prisma] Client error:', e)
}

export default prismaInstance
