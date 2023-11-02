import React from "react";
import { redirect } from "next/navigation";

import { getServerAuthSession } from "@blueprint/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@blueprint/ui";

import { ProfileSettings } from "./_components/profile-settings";

export default async function Settings() {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/");
    }
    return (
        <Tabs className="container" defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="w-1/2">
                <h1 className="py-4 text-3xl font-medium">Profile Settings</h1>
                <ProfileSettings user={session.user} />
            </TabsContent>
            <TabsContent value="billing">
                <h1 className="py-4 text-3xl font-medium">Billing Settings</h1>
            </TabsContent>
        </Tabs>
    );
}
