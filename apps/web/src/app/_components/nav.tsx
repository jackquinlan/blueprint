import React, { Suspense } from "react";
import Link from "next/link";

import { LogIn, Shapes } from "lucide-react";

import { getServerAuthSession } from "@blueprint/auth";
import { Badge, getButtonClasses } from "@blueprint/ui";

import { UserAccountDropdown } from "@/app/_components/user-account-dropdown";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/server";

export async function Nav() {
    const session = await getServerAuthSession();

    const tasks = session ? await api.task.getUserTasks.query() : undefined;

    return (
        <nav className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Shapes className="h-6 w-6" />
                </Link>
                {session && (
                    <Link href="/tasks" className={getButtonClasses({ variant: "ghost" })}>
                        Your Tasks
                        <Badge className="ml-2 rounded-full text-xs">{tasks?.length}</Badge>
                    </Link>
                )}
            </div>
            <Suspense>
                {session ? (
                    <UserAccountDropdown user={session.user} />
                ) : (
                    <Link
                        href="/login"
                        className={cn(
                            "flex items-center gap-1",
                            getButtonClasses({ variant: "outline", size: "sm" }),
                        )}
                    >
                        Log In <LogIn className="h-4 w-4" />
                    </Link>
                )}
            </Suspense>
        </nav>
    );
}
