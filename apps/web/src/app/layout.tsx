import * as React from "react";
import { Inter as FontSans } from "next/font/google";

import { GeistSans } from "geist/font";
import { Toaster } from "sonner";

import "@/globals.css";

import { cn, constructMetadata } from "@/lib/utils";
import { Footer } from "./_components/footer";
import { Nav } from "./_components/nav";
import { Providers } from "./providers";

const int = FontSans({ subsets: ["latin"], variable: "--inter" });

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn(int.variable, GeistSans.className, GeistSans.variable)}>
                <Providers>
                    <div className="flex min-h-screen flex-col">
                        <Nav />
                        <main className="flex-1">{children}</main>
                        <Footer />
                    </div>
                </Providers>
                <Toaster position="bottom-right" visibleToasts={6} richColors />
            </body>
        </html>
    );
}
