import { addHours } from "date-fns";
import { Resend } from "resend";

import { db, type User } from "@blueprint/db";
import { VerifyAccountEmail } from "@blueprint/emails";

const resend = new Resend(process.env.RESEND_API_KEY);
export const url =
    process.env.NODE_ENV === "production" ? "https://blueprint.jackquinlan.co" : "http://localhost:3000";

export async function sendVerificationEmail(user: User) {
    const token = await db.verificationToken.create({
        data: {
            identifier: "verify-email",
            userId: user.id,
            expires: addHours(Date.now(), 2),
        },
    });
    const verifyLink = `${url}/verify-email?token=${token.id}`;
    await resend.emails.send({
        from: "Jack <no-reply@jackquinlan.co>",
        to: [user.email],
        subject: "Verify your email",
        react: VerifyAccountEmail({ verifyLink: verifyLink }),
    });
}
