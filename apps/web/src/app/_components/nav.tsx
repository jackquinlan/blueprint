import React, { Suspense } from "react";
import Link from "next/link";

import { Shapes } from "lucide-react";

import { getServerAuthSession } from "@blueprint/auth";

import { LoginButton } from "@/app/_components/login-button";
import { UserAccountDropdown } from "@/app/_components/user-account-dropdown";

export async function Nav() {
    const session = await getServerAuthSession();
    console.log(session);

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
