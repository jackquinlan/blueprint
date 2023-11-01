import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@blueprint/ui";

import { ProfileSettings } from "./_components/profile-settings";

export default function Settings() {
    return (
        <Tabs className="container" defaultValue="general">
            <TabsList>
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            <TabsContent value="general">
                <ProfileSettings />
            </TabsContent>
            <TabsContent value="billing"></TabsContent>
        </Tabs>
    );
}
