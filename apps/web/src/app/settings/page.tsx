import React from "react";
import { redirect } from "next/navigation";

import { stripe } from "@blueprint/api/src/routers/stripe";
import { getServerAuthSession } from "@blueprint/auth";
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@blueprint/ui";
import { getUserPlan } from "@blueprint/utils";

import { BillingInfo } from "./_components/billing";
import { ProfileSettings } from "./_components/profile-settings";

export default async function Settings() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/");
    }
    const subscription = await getUserPlan(session.user.id);
    let isCanceled = false;
    if (subscription.isPremium && subscription.stripeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);
        isCanceled = stripePlan.cancel_at_period_end;
    }
    return (
        <Tabs className="container" defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="w-full md:w-2/3">
                <h1 className="py-4 text-3xl font-medium">Profile Settings</h1>
                <ProfileSettings user={session.user} />
            </TabsContent>
            <TabsContent value="billing">
                <h1 className="py-4 text-3xl font-medium">Billing Settings</h1>
                <Alert className="mb-2" variant="info">
                    <AlertTitle>Blueprint billing is in test-mode</AlertTitle>
                    <AlertDescription>
                        You will not be charged. Please use one of the Stripe test cards to test the
                        billing system.
                    </AlertDescription>
                </Alert>
                <BillingInfo isCanceled={isCanceled} subscription={subscription} />
            </TabsContent>
        </Tabs>
    );
}
