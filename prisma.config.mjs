import { defineConfig } from 'prisma'

export default defineConfig({
  datasource: {
    url: process.env.adventurenest_POSTGRES_PRISMA_URL,
  },
})