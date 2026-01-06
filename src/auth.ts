// src/auth.ts
import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
export const dynamic = "force-dynamic";
import { prisma } from "@/lib/db"
import Google from "next-auth/providers/google"

// Check if database is available before initializing adapter
const isDatabaseConfigured = () => {
  const url = process.env.DATABASE_URL || process.env.adventurenest_DATABASE_URL;
  return !!url && !url.includes('placeholder');
};

const authConfig = {
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
      if (session.user && user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
} as any;

// Only attach adapter if database is properly configured
if (isDatabaseConfigured()) {
  authConfig.adapter = PrismaAdapter(prisma);
} else {
  console.warn(
    '[NextAuth] No valid DATABASE_URL found. Auth adapter is disabled. ' +
    'Set DATABASE_URL or adventurenest_DATABASE_URL in your environment for full auth support.'
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

// This solves the "Export GET/POST doesn't exist" error 
// by making the handlers available to the route file
export const { GET, POST } = handlers;