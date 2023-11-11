"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { signIn } from "next-auth/react";

import { Button } from "@blueprint/ui";

import { Loader } from "@/components/loading-animation";

interface Props {}

export function LoginButton({}: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const params = useSearchParams();
    const callbackUrl = params.get("from") ?? "/";
    return (
        <Button
            disabled={loading}
            size="sm"
            onClick={() => {
                setLoading(true);
                signIn("github", { callbackUrl: callbackUrl, redirect: false });
            }}
            variant="outline"
        >
            {loading ? (
                <Loader />
            ) : (
                <div className="flex items-center gap-2">
                    <GitHubLogoIcon className="h-4 w-4" />
                    Log In with Github
                </div>
            )}
        </Button>
    );
}
