"use client";

import React from "react";

import { Shapes } from "lucide-react";
import { useSession } from "next-auth/react";

import { LoginButton } from "@/app/_components/login-button";
import { UserInfoDropdown } from "@/app/_components/user-info-dropdown";

export function Nav() {
    const { data: session } = useSession();

    return (
        <nav className="container flex items-center justify-between py-4">
            <Shapes className="h-5 w-5" />
            {session ? <UserInfoDropdown user={session.user} /> : <LoginButton />}
        </nav>
    );
}