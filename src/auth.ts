import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const connectionString = process.env.adventurenest_POSTGRES_PRISMA_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// The singleton pattern for Next.js
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = 
  globalForPrisma.prisma || new PrismaClient({ adapter: adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;