"use client";

import React, { useState } from "react";

import { Check } from "lucide-react";
import { toast } from "sonner";

import { Badge, Button, Separator } from "@blueprint/ui";
import type { SubscriptionPlan, UserSubscriptionPlan } from "@blueprint/utils";
import { FREE_PLAN, PREMIUM_PLAN } from "@blueprint/utils";

import { Shell } from "@/components/shell";
import { api } from "@/trpc/react";

interface Props {
    isCanceled: boolean;
    subscription: UserSubscriptionPlan;
}

export function BillingInfo({ isCanceled, subscription }: Props) {
    // prettier-ignore
    const endingDate = new Date(subscription.stripeCurrentPeriodEnd).toLocaleString("en-US", {
        month: "long", day: "numeric", year: "numeric",
    });
    const createStripeCheckoutSession = api.stripe.getCheckoutSession.useMutation({
        onError: () => toast.error("An error occurred while creating your checkout session."),
        onSuccess: (data) => (window.location.href = data.url!),
    });
    const createStripeUserPortal = api.stripe.getUserPortal.useMutation({
        onError: () => toast.error("An error occurred while creating your user portal."),
        onSuccess: (data) => (window.location.href = data!),
    });

    async function handleCheckout() {
        // if the user has a premium plan, we want to show the "Manage Plan" button that creates a user portal
        if (subscription.isPremium) {
            await createStripeUserPortal.mutateAsync();
            return;
        }
        // otherwise, create a checkout session for the user to upgrade to premium
        await createStripeCheckoutSession.mutateAsync();
    }

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[FREE_PLAN, PREMIUM_PLAN].map((plan) => (
                <Plan
                    key={plan.name}
                    action={handleCheckout}
                    actionText={
                        subscription.isPremium && plan.name === "Premium"
                            ? "Manage Plan"
                            : "Change Plan"
                    }
                    plan={plan}
                    cancelText={
                        !subscription.isPremium || plan.name === "Basic"
                            ? ""
                            : isCanceled
                            ? `Your plan will be canceled on ${endingDate}.`
                            : `Your plan renews on ${endingDate}.`
                    }
                    current={subscription.name == plan.name}
                    disabled={plan.name === "Basic"}
                />
            ))}
        </div>
    );
}

export function Plan({
    action,
    actionText,
    plan,
    cancelText,
    current,
    disabled,
}: {
    action: () => void;
    actionText: string;
    plan: SubscriptionPlan;
    cancelText?: string;
    current: boolean;
    disabled?: boolean;
}) {
    const [loading, setLoading] = useState<boolean>(false);
    function handleClick() {
        setLoading(true);
        action();
        setLoading(false);
    }
    return (
        <Shell className="flex flex-col justify-between">
            <div>
                <div className="inline-flex w-full items-center justify-between">
                    <h1 className="text-xl font-bold">{plan.name}</h1>
                    {current && <Badge className="rounded-md p-1 font-normal">Current Plan</Badge>}
                </div>
                <p className="text-sm">{plan.description}</p>
                <p className="my-1.5 text-xl font-medium">{plan.price}</p>
                <Separator />
                <div className="py-2">
                    {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-500" />
                            <p>{feature}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-2 flex flex-col space-y-2">
                <p className="text-sm">{cancelText}</p>
                <Button onClick={() => handleClick()} disabled={loading || disabled}>
                    {actionText}
                </Button>
            </div>
        </Shell>
    );
}
