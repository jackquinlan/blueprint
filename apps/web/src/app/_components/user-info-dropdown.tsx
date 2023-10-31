"use client";

import React from "react";
import Link from "next/link";

import { ExternalLinkIcon, GearIcon } from "@radix-ui/react-icons";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
    Avatar,
    AvatarImage,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Separator,
} from "@blueprint/ui";

interface Props {
    user: User;
}

export function UserInfoDropdown({ user }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-7 w-7">
                    <AvatarImage src={user.image ?? undefined} alt="user" />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 px-0 py-1" align="end">
                <div className="flex items-center gap-2 p-2">
                    <div className="flex flex-col text-left text-xs">
                        <h1 className="font-medium">{user.email}</h1>
                        <h2>@{user.name}</h2>
                    </div>
                </div>
                <Separator />
                <DropdownMenuItem>
                    <Link
                        className="flex w-full items-center justify-between gap-2"
                        href="/settings"
                    >
                        <span>Settings</span>
                        <GearIcon className="h-4 w-4" />
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <div className="py-1">
                    <DropdownMenuItem className="px-2">
                        <Link
                            className="flex w-full items-center justify-between gap-2"
                            target="_blank"
                            href="/"
                        >
                            <span>Blueprint Homepage</span>
                            <ExternalLinkIcon className="h-4 w-4" />
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="px-2"
                        onClick={() => signOut({ callbackUrl: "/" })}
                    >
                        Log Out
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
