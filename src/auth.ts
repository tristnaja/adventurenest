import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import authConfig from "./auth.config";

const prismaClientSingleton = () => {
  return new PrismaClient({
    // If you MUST pass the URL manually, cast it to 'any' 
    // to stop the compiler from complaining while you fix the versions
    datasources: {
      db: {
        url: process.env.adventurenest_POSTGRES_PRISMA_URL,
      },
    },
  } as any)
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prismaClientSingleton),
  session: { strategy: "jwt" },
  ...authConfig,
});
