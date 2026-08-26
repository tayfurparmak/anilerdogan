import { createRequire } from 'node:module'

let prismaInstance: any = null

try {
  const require = createRequire(import.meta.url)
  const { PrismaClient } = require('@prisma/client')
  
  if (PrismaClient) {
    if (process.env.NODE_ENV === 'production') {
      prismaInstance = new PrismaClient()
    } else {
      if (!(globalThis as any).__prisma) {
        ;(globalThis as any).__prisma = new PrismaClient()
      }
      prismaInstance = (globalThis as any).__prisma
    }
  }
} catch (e) {
  // Gracefully fallback when @prisma/client is not installed/generated
  prismaInstance = null
}

export default prismaInstance
