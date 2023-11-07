import type { NextRequest } from "next/server";

import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { appRouter, createTRPCContext } from "@blueprint/api";
import { stripe } from "@blueprint/api/src/routers/stripe";

export async function POST(req: NextRequest) {
    const payload = await req.text();

    const signature = req.headers.get("Stripe-Signature");
    if (!signature) return new Response("No signature", { status: 400 });

    try {
        const event = stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET ?? "",
        );
        const ctx = await createTRPCContext({ req });
        // Forward event to tRPC
        const caller = appRouter.createCaller(ctx);

        switch (event.type) {
            case "checkout.session.completed":
                await caller.stripe.webhooks.sessionCompleted({
                    event,
                });
                break;
            case "customer.subscription.deleted":
                await caller.stripe.webhooks.deleteSubscription({
                    event,
                });
                break;
            default:
                throw new Error(`Unhandled event type: ${event.type}`);
        }
    } catch (err) {
        if (err instanceof TRPCError) {
            return new Response(err.message, { status: getHTTPStatusCodeFromError(err) });
        }
        const message = err instanceof Error ? err.message : "Unknown error";
        return new Response(`Webhook Error: ${message}`, {
            status: 400,
        });
    }
    return new Response(null, { status: 200 });
}
