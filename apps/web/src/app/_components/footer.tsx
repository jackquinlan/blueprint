import React from "react";
import Link from "next/link";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Shapes } from "lucide-react";

import { Separator } from "@blueprint/ui";

import { ThemeToggle } from "@/app/_components/theme-toggle";

export function Footer() {
    return (
        <footer className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex items-center gap-4 px-8 md:gap-2 md:px-0">
                <Shapes className="h-5 w-5" />
                <p className="text-center text-sm leading-loose md:text-left">
                    Built by{" "}
                    <a
                        target="_blank"
                        href="https://twitter.com/abinaryorbit"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        jackquinlan
                    </a>
                    .
                </p>
            </div>
            <div className="flex items-center justify-between sm:gap-4">
                <Link
                    href="https://github.com/jackquinlan/blueprint"
                    target="_blank"
                    className="hover:bg-muted rounded-md p-2"
                >
                    <GitHubLogoIcon className="h-4 w-4" />
                </Link>
                <Separator orientation="vertical" />
                <ThemeToggle />
            </div>
        </footer>
    );
}
