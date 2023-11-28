import { TRPCError } from "@trpc/server";
import { addHours } from "date-fns";
import { Resend } from "resend";
import * as z from "zod";

import { hashPassword } from "@blueprint/auth/src/crypto";
import { ResetPasswordEmail } from "@blueprint/emails";
import { forgotPasswordSchema, resetPasswordSchmea, signupSchema } from "@blueprint/utils";

import { createRouter, protectedProcedure, publicProcedure } from "../trpc";
import { stripe, url } from "./stripe/index";

const resend = new Resend(process.env.RESEND_API_KEY);

export const userRouter = createRouter({
    me: protectedProcedure.query(async (opts) => {
        return opts.ctx.session.user;
    }),
    updateUser: protectedProcedure
        .input(z.object({ id: z.string().cuid(), name: z.string() }))
        .mutation(async (opts) => {
            if (opts.ctx.session.user.id !== opts.input.id) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            return await opts.ctx.db.user.update({
                where: { id: opts.input.id },
                data: {
                    name: opts.input.name,
                },
            });
        }),
    createUser: publicProcedure.input(signupSchema).mutation(async (opts) => {
        const userExists = await opts.ctx.db.user.findFirst({
            where: {
                email: opts.input.email,
            },
        });
        if (userExists) {
            throw new Error("User already exists.");
        }
        await opts.ctx.db.user.create({
            data: {
                email: opts.input.email,
                hashedPassword: await hashPassword(opts.input.password),
                name: opts.input.email.split("@")[0],
            },
        });
    }),
    sendForgotPasswordEmail: publicProcedure.input(forgotPasswordSchema).mutation(async (opts) => {
        const userExists = await opts.ctx.db.user.findFirst({
            where: {
                email: opts.input.email,
            },
        });
        if (!userExists || !userExists.hashedPassword) {
            throw new Error("User does not exist.");
        }
        const token = await opts.ctx.db.resetPasswordToken.create({
            data: {
                userId: userExists.id,
                expiresAt: addHours(Date.now(), 2),
            },
        });
        const resetLink = `${url}/reset-password?token=${token.id}`;
        return await resend.emails.send({
            from: "Jack <no-reply@jackquinlan.co>",
            to: [userExists.email],
            subject: "Blueprint",
            react: ResetPasswordEmail({ name: userExists.name ?? "User", resetLink: resetLink }),
        });
    }),
    updatePassword: publicProcedure.input(resetPasswordSchmea).mutation(async (opts) => {
        const token = await opts.ctx.db.resetPasswordToken.findFirst({
            where: {
                id: opts.input.token,
            },
        });
        if (!token) {
            throw new Error("Invalid token.");
        }
        const user = await opts.ctx.db.user.findFirst({
            where: {
                id: token.userId,
            },
        });
        if (!user) {
            throw new Error("Invalid token.");
        }
        const newHashedPassword = await hashPassword(opts.input.password);
        await opts.ctx.db.user.update({
            where: {
                id: user.id,
            },
            data: {
                hashedPassword: newHashedPassword,
            },
        });
        await opts.ctx.db.resetPasswordToken.update({
            where: {
                id: token.id,
            },
            data: {
                used: true,
            },
        });
    }),
    deleteUser: protectedProcedure
        .input(
            z.object({
                id: z.string().cuid(),
            }),
        )
        .mutation(async (opts) => {
            if (opts.ctx.session.user.id !== opts.input.id) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            const user = await opts.ctx.db.user.findFirstOrThrow({
                where: {
                    id: opts.input.id,
                },
            });
            // cancel subscription plan to prevent further charges
            if (user.stripeSubscriptionId) {
                await stripe.subscriptions.cancel(user.stripeSubscriptionId);
            }
            // delete customer
            if (user.stripeCustomerId) {
                await stripe.customers.del(user.stripeCustomerId);
            }
            await opts.ctx.db.user.delete({
                where: {
                    id: opts.input.id,
                },
            });
        }),
});
