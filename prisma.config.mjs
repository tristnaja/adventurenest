// prisma.config.mjs
import { defineConfig } from "prisma/config";

// Prefer the adventurenest-specific env var, but fall back to DATABASE_URL.
// Using `process.env` here avoids Prisma throwing during the config load
// phase when a custom env var isn't present in all environments.
const url =
  process.env.adventurenest_POSTGRES_PRISMA_URL || process.env.DATABASE_URL;

export default defineConfig({
  datasource: {
    url,
  },
});
