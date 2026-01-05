// src/lib/db.ts
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Fix for Neon in Node.js environments
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  // Prisma 7 Fix: We must NEVER call new PrismaClient() without arguments.
  // We provide a dummy connection string if the real one is missing during build.
  const connectionString = process.env.DATABASE_URL || "postgresql://placeholder:5432/db"
  
  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool as any)
  
  return new PrismaClient({ 
    adapter,
    // Optional: useful for debugging during this migration
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma