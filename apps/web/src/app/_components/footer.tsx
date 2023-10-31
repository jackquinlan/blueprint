import React from "react";

import { Shapes } from "lucide-react";

import { ThemeToggle } from "@/app/_components/theme-toggle";

export function Footer() {
    return (
        <footer className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
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
                    . The source code is available on{" "}
                    <a
                        target="_blank"
                        href="https://github.com/jackquinlan/blueprint"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4"
                    >
                        Github
                    </a>
                </p>
            </div>
            <ThemeToggle />
        </footer>
    );
}