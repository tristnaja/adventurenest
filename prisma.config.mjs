// prisma.config.mjs
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    // Use the env() helper provided by Prisma for better stability
    url: env("adventurenest_POSTGRES_PRISMA_URL"),
  },
});
