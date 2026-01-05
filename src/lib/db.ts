import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'
import { Pool, neonConfig } from '@neondatabase/serverless'
import ws from 'ws'

// This allows the Neon serverless driver to work in local environments/Node.js
if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
  neonConfig.webSocketConstructor = ws
}

const prismaClientSingleton = () => {
  const connectionString = process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error('DATABASE_URL is not defined')
  }

  // Use the Neon Driver Adapter for Neon databases
  if (connectionString.includes('neon.tech')) {
    const pool = new Pool({ connectionString })
    const adapter = new PrismaNeon(pool as any)
    return new PrismaClient({ adapter })
  }

  // Fallback for local Postgres (standard driver)
  return new PrismaClient()
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

export const prisma = globalThis.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma