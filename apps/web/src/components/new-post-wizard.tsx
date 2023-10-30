"use client";

import React from "react";

import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { Button, Card, CardHeader } from "@blueprint/ui";

import { LoginButton } from "@/app/_components/login-button";

export function NewPostWizard({ session }: { session?: Session }) {
    return (
        <Card>
            <CardHeader>
                {!session ? (
                    <LoginButton />
                ) : (
                    <Button
                        className="rounded-full"
                        size="sm"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        Logout
                    </Button>
                )}
            </CardHeader>
        </Card>
    );
}
