import type { NextAuthOptions, Session } from "next-auth";
import GithubProvider from "next-auth/providers/github";

import { db } from "@blueprint/db";

import CustomAdapter from "./next-auth-adapter";

const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, token }) {
            // prettier-ignore
            const updatedSession: Session = {
                ...session,
                user: {
                    id: token.id, name: token.name, email: token.email, image: token.picture,
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
            // prettier-ignore
            return {
                id: userFromPrisma.id, name: userFromPrisma.name, email: userFromPrisma.email, picture: userFromPrisma.image,
            }
        },
    },
    adapter: CustomAdapter(db),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        error: "/",
    },
};

export { authOptions };
