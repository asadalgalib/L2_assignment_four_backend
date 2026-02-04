import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    trustedOrigins: [`${process.env.APP_URL}`, "http://localhost:3000"],
    user: {
        additionalFields: {
            role: {
                type: "string",
                defaultValue: "STUDENT",
                required: false
            },
            gender: {
                type: "string",
                required: true
            },
            phone: {
                type: "string",
                required: false
            },
            status: {
                type: "string",
                defaultValue: "ACTIVE",
                required: false
            },
            isFeatured: {
                type: "boolean",
                defaultValue: false,
                required: false
            }
        }
    },
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
        requireEmailVerification: false
    },
    databaseHooks: {
        user: {
            create: {
                after: async (user, context) => {
                    const cookieHeader = context?.headers?.get("cookie") || "";
                    const user_role = cookieHeader
                        .split("; ")
                        .find(row => row.startsWith("user_role="))
                        ?.split("=")[1];

                    console.log("Found Role in Cookie:", user_role);

                    if (user_role === "TUTOR") {
                        await prisma.user.update({
                            where: {
                                id: user.id
                            },
                            data: {
                                role: "TUTOR"
                            },
                        });
                        console.log(`Success: Role updated to TUTOR for ${user.email}`);
                    }
                }
            }
        }
    },
    socialProviders: {
        google: {
            prompt: "select_account consent",
            accessType: "offline",
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },
});

