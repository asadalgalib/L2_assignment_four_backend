import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [`${process.env.APP_URL}`, "http://localhost:5000"],
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
});