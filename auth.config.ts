import { NextAuthConfig } from "next-auth";
import { DASHBOARD_PATH, LOGIN_PATH } from "@/app/lib/routes";

export const authConfig = {
  providers: [],
  pages: {
    signIn: LOGIN_PATH,
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
  },
} satisfies NextAuthConfig;
