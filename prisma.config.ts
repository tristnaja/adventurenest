import { defineConfig } from 'prisma/config'

export default defineConfig({
  datasource: {
    url: process.env.adventurenest_DATABASE_URL_UNPOOLED!,
  },
})
