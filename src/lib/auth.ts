import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { createAuthMiddleware, APIError } from "better-auth/api";
import { db } from "@/lib/db";
import { site } from "@/lib/site";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  secret: process.env.BETTER_AUTH_SECRET || "fallback-secret-key-shorno-portfolio",
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      // Restrict signup email to only the configured site email
      if (ctx.path === "/sign-up/email") {
        const email = ctx.body?.email;
        if (!email || email.toLowerCase() !== site.email.toLowerCase()) {
          throw new APIError("BAD_REQUEST", {
            message: "Signup restricted. Only the administrator's email is allowed.",
          });
        }
      }
    }),
  },
});
