import { db } from "@blueprint/db";

export async function verifyEmail(token: string) {
    const verifyToken = await db.verificationToken.findFirst({
        include: { user: true },
        where: {
            id: token,
        },
    });
    if (!verifyToken) {
        return false;
    }
    const expired = verifyToken.expires < new Date();
    if (expired) {
        return false;
    }
    const user = await db.user.update({
        where: {
            id: verifyToken.userId,
        },
        data: {
            emailVerified: new Date(),
        },
    });
    const tokensToDelete = await db.verificationToken.findMany({
        where: {
            userId: user.id,
        },
    });
    await db.verificationToken.deleteMany({
        where: {
            id: {
                in: tokensToDelete.map((token) => token.id),
            },
        },
    });
    return true;
}
