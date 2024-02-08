import { PrismaAdapter } from "@next-auth/prisma-adapter";
import type { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { db } from "@blueprint/db";

import { verifyPassword } from "./crypto";

const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token }) {
            // prettier-ignore
            const updatedSession: Session = {
                ...session,
                user: {
                    id: token.id, name: token.name, email: token.email, image: token.picture, emailVerified: token.emailVerified,
                },
            };
            return updatedSession;
        },
        jwt: async ({ user, token }) => {
            const userFromPrisma = await db.user.findFirst({
                where: { email: token.email },
            });
            if (!userFromPrisma) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }
            return {
                id: userFromPrisma.id, 
                name: userFromPrisma.name,
                emailVerified: userFromPrisma.emailVerified ? new Date(userFromPrisma.emailVerified).toISOString() : null, 
                email: userFromPrisma.email, 
                picture: userFromPrisma.image,
            }
        },
    },
    adapter: PrismaAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "you@email.com" },
                password: { label: "Password", type: "password", placeholder: "••••••••••" },
            },
            authorize: async (credentials) => {
                if (!credentials) {
                    throw new Error("No credentials were provided");
                }
                const { email, password } = credentials;

                const user = await db.user.findFirst({
                    where: {
                        email: email,
                    },
                });
                if (!user || !user.hashedPassword) {
                    throw new Error("No user found");
                }
                if (!(await verifyPassword(user.hashedPassword, password))) {
                    throw new Error("Invalid email or password.");
                }
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    emailVerified: user.emailVerified?.toISOString() ?? null,
                } satisfies User;
            },
        }),
        /**
         * Add any more providers you want here
         *
         * @see https://next-auth.js.org/configuration/providers
         */
    ],
    session: {
        strategy: "jwt",
    },
};

export { authOptions };
