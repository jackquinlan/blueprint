"use client";

import React from "react";

import { signOut } from "next-auth/react";

import { Button } from "@blueprint/ui";

export default function Dashboard() {
    return (
        <div className="flex justify-center mt-5 w-full text-center">
            <div className="flex flex-col space-y-4 w-1/3">
                <Button onClick={() => signOut({ callbackUrl: "/"})}>Sign Out</Button>
            </div>
        </div>
    );
}
