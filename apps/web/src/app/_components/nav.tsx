"use client";

import React, { Suspense } from "react";
import Link from "next/link";

import { Shapes } from "lucide-react";
import { useSession } from "next-auth/react";

import { LoginButton } from "@/app/_components/login-button";
import { UserAccountDropdown } from "@/app/_components/user-account-dropdown";

export function Nav() {
    const { data: session } = useSession();

    return (
        <nav className="container flex items-center justify-between py-4">
            <Link href="/">
                <Shapes className="h-6 w-6" />
            </Link>
            <Suspense fallback="">
                {session ? <UserAccountDropdown user={session.user} /> : <LoginButton />}
            </Suspense>
        </nav>
    );
}
