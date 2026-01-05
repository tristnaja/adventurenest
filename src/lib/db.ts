import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  // ✅ Update: Check for the prefixed Vercel variable first, then the standard one
  const connectionString = 
    process.env.adventurenest_DATABASE_URL || 
    process.env.DATABASE_URL;

  // Prisma 7 Fix: If no connection string is found (common during the build phase),
  // we provide a placeholder to prevent the constructor from crashing.
  if (!connectionString) {
    // Cast options to any because PrismaClientOptions typing doesn't include the
    // datasources override we need during the build step.
    return new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://placeholder:5432/db"
        }
      }
    } as any)
  }

  // Use the Neon Driver Adapter if it's a Neon URL
  if (connectionString.includes('neon.tech')) {
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool as any)
    return new PrismaClient({ adapter })
  }

  // Fallback for standard PostgreSQL (local dev)
  return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma