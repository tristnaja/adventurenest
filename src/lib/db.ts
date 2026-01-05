import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL

  // If no URL (common during build/static analysis), 
  // return a standard client. It will only fail if a query is actually executed.
  if (!url) {
    return new PrismaClient()
  }

  // If it's a Neon URL, use the adapter
  if (url.includes('neon.tech')) {
    const pool = new Pool({ connectionString: url })
    const adapter = new PrismaNeon(pool as any)
    return new PrismaClient({ adapter })
  }

  return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma