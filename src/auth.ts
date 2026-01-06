// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db"
import Google from "next-auth/providers/google"

// Wrap the adapter to handle missing database gracefully
const getAdapter = () => {
  const connectionString = process.env.DATABASE_URL || process.env.adventurenest_DATABASE_URL;
  
  if (!connectionString) {
    console.warn(
      '[NextAuth] No DATABASE_URL configured. Auth adapter will be unavailable. ' +
      'Set DATABASE_URL or adventurenest_DATABASE_URL in your environment.'
    );
    return undefined; // Return undefined to skip adapter if no DB
  }
  
  return PrismaAdapter(prisma);
};

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: getAdapter(),
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ auth: session }) {
      return !!session;
    },
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