import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  // Check for the prefixed Vercel variable first, then the standard one
  const connectionString = 
    process.env.adventurenest_DATABASE_URL || 
    process.env.DATABASE_URL;

  // If no connection string is found, log a warning and use a placeholder
  // This prevents hard crashes during build or when env vars aren't set
  if (!connectionString) {
    console.warn(
      '[Prisma] DATABASE_URL not configured. Using placeholder. ' +
      'Set DATABASE_URL or adventurenest_DATABASE_URL for database operations to work.'
    );
    
    // Return a Prisma client with a placeholder URL
    // This allows the app to initialize without crashing
    return new PrismaClient({
      datasources: {
        db: {
          url: "postgresql://user:password@localhost:5432/placeholder"
        }
      }
    } as any)
  }

  // Use the Neon Driver Adapter if it's a Neon URL
  if (connectionString.includes('neon.tech')) {
    try {
      const pool = new Pool({ connectionString })
      const adapter = new PrismaNeon(pool as any)
      return new PrismaClient({ adapter })
    } catch (error) {
      console.error('[Prisma] Failed to initialize Neon adapter:', error);
      // Fallback to standard client if adapter fails
      return new PrismaClient()
    }
  }

  // Fallback for standard PostgreSQL (local dev or standard Postgres)
  return new PrismaClient()
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma