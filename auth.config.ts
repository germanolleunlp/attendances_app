import { DASHBOARD_PATH, LOGIN_PATH } from "./app/lib/routes";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  debug: true,
  providers: [],
  pages: {
    signIn: LOGIN_PATH,
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith(DASHBOARD_PATH);
      if (isOnDashboard) return isLoggedIn;
      if (isLoggedIn)
        return Response.redirect(new URL(DASHBOARD_PATH, nextUrl));

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
} satisfies NextAuthConfig;
