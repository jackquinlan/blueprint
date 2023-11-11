import type { User } from "@prisma/client";

import { db } from "@blueprint/db";

import { FREE_PLAN, PREMIUM_PLAN, type SubscriptionPlan } from "./plans";

export type UserSubscriptionPlan = SubscriptionPlan &
    Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
        stripeCurrentPeriodEnd: number;
        isPremium: boolean;
    };

const DAY_IN_MS = 86_400_000;

/**
 * Get the user's current subscription plan
 */
export async function getUserPlan(userId: string): Promise<UserSubscriptionPlan> {
    // prettier-ignore
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stripePriceId: true, stripeCurrentPeriodEnd: true, stripeCustomerId: true, stripeSubscriptionId: true,
        }
    });
    if (!user) {
        throw new Error("User not found.");
    }

    const isPremium =
        user.stripePriceId && user.stripeCurrentPeriodEnd?.getTime()
            ? user.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()
            : false;

    const plan = isPremium ? PREMIUM_PLAN : FREE_PLAN;
    const userInfo = {
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
    };
    return {
        ...plan,
        ...userInfo,
        stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime() || 0,
        isPremium,
    };
}
