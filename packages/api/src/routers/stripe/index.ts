import Stripe from "stripe";

import { db } from "@blueprint/db";

import { createRouter, protectedProcedure } from "../../trpc";
import { webhookRouter } from "./webhook";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "", {
    apiVersion: "2023-10-16",
    appInfo: {
        name: "Blueprint",
    },
});

const url =
    process.env.NODE_ENV === "production" ? process.env.VERCEL_URL : "http://localhost:3000";

export const stripeRouter = createRouter({
    webhooks: webhookRouter,

    getUserPortal: protectedProcedure.mutation(async (opts) => {
        const user = await db.user.findUnique({
            where: {
                id: opts.ctx.session.user.id,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        let stripeId = user.stripeCustomerId;
        if (!stripeId) {
            const customerData: {
                metadata: {
                    userId: string;
                };
                email?: string;
            } = {
                metadata: {
                    userId: user.id,
                },
                email: user.email,
            };
            const stripeUser = await stripe.customers.create(customerData);
            stripeId = stripeUser.id;
            await opts.ctx.db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    stripeCustomerId: stripeId,
                },
            });
        }
        const session = await stripe.billingPortal.sessions.create({
            customer: stripeId,
            return_url: `${url}/settings`,
        });
        return session.url;
    }),
    getCheckoutSession: protectedProcedure.mutation(async (opts) => {
        const user = await db.user.findUnique({
            where: {
                id: opts.ctx.session.user.id,
            },
        });
        if (!user) {
            throw new Error("User not found");
        }
        let stripeId = user.stripeCustomerId;
        if (!stripeId) {
            const customerData: {
                metadata: {
                    userId: string;
                };
                email?: string;
            } = {
                metadata: {
                    userId: user.id,
                },
                email: user.email,
            };
            const stripeUser = await stripe.customers.create(customerData);
            stripeId = stripeUser.id;
            await opts.ctx.db.user.update({
                where: {
                    id: user.id,
                },
                data: {
                    stripeCustomerId: stripeId,
                },
            });
        }
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            customer: stripeId,
            billing_address_collection: "auto",
            line_items: [
                {
                    price: process.env.PREMIUM_PLAN_PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: "subscription",
            metadata: {
                userId: user.id,
            },
            cancel_url: `${url}/settings`,
            success_url: `${url}/settings?success=true`,
        });
        return session;
    }),
});
