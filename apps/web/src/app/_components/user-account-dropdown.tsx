"use client";

import React from "react";
import Link from "next/link";

import { ExternalLinkIcon, GearIcon } from "@radix-ui/react-icons";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

import {
    Avatar,
    AvatarFallback,
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

export function UserAccountDropdown({ user }: Props) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none">
                <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src={user.image ?? undefined} alt="user" />
                    <AvatarFallback className="bg-gradient-to-r from-sky-400 to-cyan-300 text-white">
                        {user.name?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 px-0 py-1" align="end">
                <div className="flex items-center gap-2 p-2">
                    <div className="flex flex-col text-left text-xs">
                        <h2 className="text-[14px] font-medium">@{user.name}</h2>
                        <h1>{user.email}</h1>
                    </div>
                </div>
                <Separator />
                <div className="py-1">
                    <DropdownMenuItem>
                        <Link
                            className="flex w-full items-center justify-between gap-2"
                            href="/tasks"
                        >
                            <span>Dashboard</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Link
                            className="flex w-full items-center justify-between gap-2"
                            href="/settings"
                        >
                            <span>Settings</span>
                            <GearIcon className="h-4 w-4" />
                        </Link>
                    </DropdownMenuItem>
                </div>
                <Separator />
                <div className="py-1">
                    <DropdownMenuItem className="px-2">
                        <Link
                            className="flex w-full items-center justify-between gap-2"
                            href="/"
                            target="_blank"
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
