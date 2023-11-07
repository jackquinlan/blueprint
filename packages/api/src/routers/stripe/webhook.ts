import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import * as z from "zod";

import { db } from "@blueprint/db";

import { createRouter, publicProcedure } from "../../trpc";
import { stripe } from "./index";

const webhook = publicProcedure.input(
    z.object({
        event: z.object({
            id: z.string(),
            account: z.string().nullish(),
            created: z.number(),
            data: z.object({
                object: z.record(z.any()),
            }),
            type: z.string(),
        }),
    }),
);

export const webhookRouter = createRouter({
    sessionCompleted: webhook.mutation(async (opts) => {
        const session = opts.input.event.data.object as Stripe.Checkout.Session;
        if (typeof session.subscription !== "string") {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Missing or invalid subscription id",
            });
        }
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        const customerId =
            typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer.id;
        const user = await db.user.findFirst({
            where: {
                stripeCustomerId: customerId,
            },
        });
        if (!user) {
            throw new TRPCError({
                code: "NOT_FOUND",
                message: "User not found",
            });
        }
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                plan: "premium",
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }),
    deleteSubscription: webhook.mutation(async (opts) => {
        const subscription = opts.input.event.data.object as Stripe.Subscription;
        // get customer id
        const customerId =
            typeof subscription.customer === "string"
                ? subscription.customer
                : subscription.customer.id;
        await opts.ctx.db.user.update({
            where: {
                stripeCustomerId: customerId,
            },
            data: {
                plan: "free",
                stripeSubscriptionId: null,
                stripePriceId: null,
            },
        });
    }),
});
