import { NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
// import Google from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    })
  ],
  adapter: PrismaAdapter(db),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt"
  }, //adapter: PrismaAdapter(db)としたことで、jwtのtoken管理をしなくなってしまったため、middlewareの動作が無効になってしまうことを防ぐためにこの記述をしてjwtを基準にtoken管理をするという設定をしました。
};