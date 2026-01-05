import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcryptjs";

// const prisma = new PrismaClient();

export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    // Credentials({
    //   async authorize(credentials) {
    //     if (!credentials?.email || !credentials?.password) {
    //       return null;
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email: credentials.email as string,
    //       },
    //     });

    //     if (!user || !user.password) {
    //       return null;
    //     }

    //     const isPasswordValid = await bcrypt.compare(
    //       credentials.password as string,
    //       user.password
    //     );

    //     if (isPasswordValid) {
    //       return user;
    //     }

    //     return null;
    //   },
    // }),
  ],
} satisfies NextAuthConfig;
