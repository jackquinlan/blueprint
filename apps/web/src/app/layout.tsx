import * as React from "react";
import { Inter as FontSans } from "next/font/google";
import { headers } from "next/headers";

import { GeistSans } from "geist/font";
import { Toaster } from "sonner";

import { getServerAuthSession } from "@blueprint/auth";
import "@/globals.css";

import { Background } from "@/app/_components/background";
import { Footer } from "@/app/_components/footer";
import { Nav } from "@/app/_components/nav";
import { cn, constructMetadata, getGithubStars } from "@/lib/utils";
import { TRPCReactProvider } from "@/trpc/react";
import { Providers } from "./providers";
import { VerifyEmailBanner } from "@/components/verify-email-banner";

const int = FontSans({ subsets: ["latin"], variable: "--inter" });

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export const dynamic = "force-dynamic";

export default async function RootLayout({ children }: Props) {
    const session = await getServerAuthSession();
    const githubStars = await getGithubStars();
    return (
        <html lang="en">
            <head />
            <body className={cn(int.variable, GeistSans.className, GeistSans.variable)}>
                <TRPCReactProvider headers={headers()}>
                    <Providers>
                        <div
                            className={cn(
                                session && 
                                !session.user.emailVerified ? "flex flex-col h-[calc(100vh-40px)]" : "flex flex-col h-screen",
                            )}
                        >
                            {session && 
                            !session.user.emailVerified && <VerifyEmailBanner email={session.user.email} />}
                            <Nav stars={githubStars} />
                            <main className="flex-1">{children}</main>
                            <Footer />
                        </div>
                    </Providers>
                </TRPCReactProvider>
                <Toaster position="bottom-right" visibleToasts={6} />
                <div className="absolute -inset-40 left-0 top-0 -z-30 h-screen w-screen">
                    <Background />
                </div>
            </body>
        </html>
    );
}
