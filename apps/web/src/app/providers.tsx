"use client";

import React from "react";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextThemeProvider attribute="class" enableSystem disableTransitionOnChange>
            <SessionProvider>{children}</SessionProvider>
        </NextThemeProvider>
    );
}
