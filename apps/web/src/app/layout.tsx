import * as React from "react";
import { headers } from "next/headers";
import { Inter as FontSans } from "next/font/google";

import { Toaster } from "sonner";

import "@/globals.css";

import { cn, constructMetadata } from "@/lib/utils";
import { TRPCProvider } from "@/app/_trpc/react";

const int = FontSans({ subsets: ["latin"], variable: "--inter" });

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn(int.className)} suppressHydrationWarning={true}>
                <TRPCProvider headers={headers()}>
                    {children}
                </TRPCProvider>
                <Toaster position="bottom-right" visibleToasts={6} richColors />
            </body>
        </html>
    );
}
