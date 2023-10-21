import * as React from "react";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";

import "@/globals.css";

import { cn, constructMetadata } from "@/lib/utils";

const int = Inter({ subsets: ["latin"], variable: "--inter" });

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn(int.className)} suppressHydrationWarning={true}>
                {children}
                <Toaster position="bottom-right" visibleToasts={6} richColors />
            </body>
        </html>
    );
}
