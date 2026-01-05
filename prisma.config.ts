import { defineConfig } from 'prisma/config'

export default defineConfig({
  migrate: {
    datasourceUrl: process.env.adventurenest_DATABASE_URL_UNPOOLED!,
  },
})
