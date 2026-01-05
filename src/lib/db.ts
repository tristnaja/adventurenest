import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// Setup for Neon in Node.js (Local Dev)
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  // We provide a fallback string to prevent the constructor from being "empty" 
  // during the Next.js static analysis/build phase.
  const connectionString = process.env.DATABASE_URL || "postgresql://placeholder:placeholder@localhost:5432/db"

  const pool = new Pool({ connectionString })
  const adapter = new PrismaNeon(pool as any)
  
  // ✅ Prisma 7 Fix: Always pass the adapter object.
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma