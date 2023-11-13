import type { User as DefaultUser, DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      role: string;
    } & User;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    role: string;
  }
}
