import { Prisma, PrismaClient, VerificationToken } from "@prisma/client";
import { AdapterAccount, AdapterSession } from "next-auth/adapters";

/** @return { import('next-auth/adapters').Adapter } */
export default function CustomAdapter(p: PrismaClient): import("next-auth/adapters").Adapter {
    return {
        createUser: (data: Prisma.UserCreateInput) => p.user.create({ data }),
        getUser: (id: string) => p.user.findUnique({ where: { id } }),
        getUserByEmail: (email: string) => p.user.findUnique({ where: { email } }),
        async getUserByAccount(provider_providerAccountId: {
            providerAccountId: string;
            provider: string;
        }) {
            let _account;
            const account = await p.account.findUnique({
                where: {
                    provider_providerAccountId,
                },
                select: { user: true },
            });
            return (_account = account === null || account === void 0 ? void 0 : account.user) !==
                null && _account !== void 0
                ? _account
                : null;
        },
        updateUser: ({ id, ...data }) => p.user.update({ where: { id }, data }),
        deleteUser: (id: string) => p.user.delete({ where: { id } }),
        async createVerificationToken(data: VerificationToken) {
            const token = await p.verificationToken.create({
                data,
            });
            return token;
        },
        async useVerificationToken(
            identifier_token: Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput,
        ) {
            try {
                const token = await p.verificationToken.delete({
                    where: { identifier_token },
                });
                return token;
            } catch (error) {
                // If token already used/deleted, just return null
                // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                    if (error.code === "P2025") return null;
                }
                throw error;
            }
        },
        linkAccount: (data: AdapterAccount) =>
            p.account.create({ data }) as unknown as AdapterAccount,
        unlinkAccount: (
            provider_providerAccountId: Prisma.AccountProviderProviderAccountIdCompoundUniqueInput,
        ) =>
            p.account.delete({
                where: { provider_providerAccountId },
            }) as unknown as AdapterAccount,
        async getSessionAndUser(sessionToken: string) {
            const userAndSession = await p.session.findUnique({
                where: { sessionToken },
                include: { user: true },
            });
            if (!userAndSession) return null;

            const { user, ...session } = userAndSession;
            return { user, session };
        },
        createSession: (data) => p.session.create({ data }),
        updateSession: (data: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">) =>
            p.session.update({
                where: { sessionToken: data.sessionToken },
                data,
            }),
        deleteSession: (sessionToken: string) => p.session.delete({ where: { sessionToken } }),
    };
}
