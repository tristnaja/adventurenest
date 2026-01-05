import { defineConfig } from 'prisma/config'

// TEMPORARY: Hardcoding URL for debugging.
// This is NOT a good practice and should be reverted.
const DATABASE_URL = "postgresql://user:password@localhost:5432/adventurenest?schema=public";

export default defineConfig({
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
})