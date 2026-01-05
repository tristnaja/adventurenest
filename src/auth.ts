// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db" // Ensure this path to your prisma client is correct
import Google from "next-auth/providers/google"
// Import other providers as needed

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
})

// This solves the "Export GET/POST doesn't exist" error 
// by making the handlers available to the route file
export const { GET, POST } = handlers;