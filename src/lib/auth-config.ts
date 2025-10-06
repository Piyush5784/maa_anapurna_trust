import { prisma } from "@/db/prisma";
import { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      httpOptions: {
        timeout: 60000,
        agent: false,
      },
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          // Create new user with default USER role
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name,
              image: user.image,
              emailVerified: new Date(),
              role: "USER", // Default role
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign in:", error);
        return false;
      }
    },
    async jwt({ token, user }) {

      if (user) {
        // Get user from database
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        console.log(
          "[AUTH] Database user found:",
          !!dbUser,
          "role:",
          dbUser?.role
        );

        if (dbUser) {
          token.uid = dbUser.id;
          token.email = dbUser.email!;
          token.name = dbUser.name!;
          token.picture = dbUser.image!;
          token.role = dbUser.role; // Include role in token
          console.log("[AUTH] Token updated with role:", token.role);
        }
      }

      console.log("[AUTH] Returning token with role:", token.role);
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.uid as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.role = token.role as string; // Include role in session
      }
      return session;
    },
  },
  debug: true,
};
