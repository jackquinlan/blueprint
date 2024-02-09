import React, { Suspense } from "react";
import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { LogIn, Shapes } from "lucide-react";

import { getServerAuthSession } from "@blueprint/auth";
import { db } from "@blueprint/db";
import { Badge, getButtonClasses } from "@blueprint/ui";

import { UserAccountDropdown } from "@/app/_components/user-account-dropdown";
import { cn } from "@/lib/utils";

export async function Nav({ stars = 0 }: { stars?: number }) {
    const session = await getServerAuthSession();

    const tasks =
        session && session.user
            ? await db.task.findMany({
                  where: {
                      userId: session.user.id,
                  },
              })
            : undefined;

    return (
        <nav className="container flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
                <Link href="/" className="flex items-center text-xl gap-2">
                    <Shapes className="h-6 w-6" /> Blueprint
                </Link>
                {session && (
                    <Link href="/tasks" className={getButtonClasses({ variant: "ghost" })}>
                        Your Tasks
                        <Badge className="ml-2 rounded-full text-xs">{tasks?.length}</Badge>
                    </Link>
                )}
            </div>
            <Suspense>
                <div className="flex items-center gap-2">
                <Link
                    href="https://github.com/jackquinlan/blueprint"
                    target="_blank"
                    className={cn(
                        getButtonClasses({ variant: "outline" }),
                        "flex w-fit items-center gap-2",
                    )}
                >
                    <GitHubLogoIcon className="h-4 w-4" />
                    {stars}
                </Link>
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
                </div>
            </Suspense>
        </nav>
    );
}
