import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Standard setup for Neon serverless in Node environments
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL

  // If there's no connection string during build, we still provide a 
  // "dummy" configuration to prevent the "empty options" crash.
  if (!connectionString) {
    return new PrismaClient()
  }

  // Use Neon Adapter for Neon databases (Production/Preview)
  if (connectionString.includes('neon.tech')) {
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool as any)
    return new PrismaClient({ adapter })
  }

  // Fallback for local development (Standard Postgres)
  return new PrismaClient()
}

// Singleton pattern to prevent multiple clients in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma