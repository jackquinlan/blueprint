import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Mail } from "lucide-react";

import { getServerAuthSession } from "@blueprint/auth";
import { verifyEmail } from "@blueprint/lib/auth/verify-email";
import { Alert } from "@blueprint/ui";

import { Shell } from "@/components/shell";

export default async function VerifyEmail({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getServerAuthSession();
    if (!session) {
        return redirect("/login");
    }
    // if token not in query params, redirect to home page
    if (searchParams.token === undefined || !(typeof searchParams.token === "string")) {
        return redirect("/");
    }
    const verified = await verifyEmail(searchParams.token);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center space-y-4">
            <Shell className="-mt-[30%] w-full space-y-4 p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                <div className="pt-2">
                    <h1 className="flex items-center text-xl font-medium">
                        <Mail className="mr-1 h-5 w-5" />
                        Verify your email
                    </h1>
                </div>
                <div className="pb-2">
                    {verified ? (
                        <Alert variant="success">
                            Your account has been verified successfully!
                        </Alert>
                    ) : (
                        <Alert variant="danger">
                            Your verification has expired or is invalid. Please request a new
                            verification token.
                        </Alert>
                    )}
                </div>
            </Shell>
            <div className="w-full text-center">
                <Link href="/" className="hover:underline hover:underline-offset-4">
                    Go back to home
                </Link>
            </div>
        </div>
    );
}
