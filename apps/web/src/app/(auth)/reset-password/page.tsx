import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { db } from "@blueprint/db";
import { Alert, Separator } from "@blueprint/ui";

import { ResetPasswordForm } from "@/app/(auth)/_components/reset-password-form";
import { Shell } from "@/components/shell";

export default async function ResetPassword({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    // if token not in query params, redirect to home page
    if (searchParams.token === undefined || !(typeof searchParams.token === "string")) {
        return redirect("/");
    }
    const token = await db.resetPasswordToken.findFirst({
        where: { id: searchParams.token as string },
    });
    if (!token) {
        return redirect("/");
    }
    return (
        <div className="container mt-16 flex w-full flex-col items-center space-y-4">
            <Shell className="w-full p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                <div className="py-2">
                    <h1 className="text-xl font-medium">Reset Password</h1>
                    <h2 className="text-sm text-zinc-500">Enter a new password for your account</h2>
                </div>
                <Separator />
                {token.expiresAt < new Date() || token.used ? (
                    <Alert variant="danger">
                        This token has expired, please request another one to reset your password.
                    </Alert>
                ) : (
                    <ResetPasswordForm token={token.id} />
                )}
            </Shell>
            <Link href="/login" className="hover:underline hover:underline-offset-4">
                Don&apos;t need to reset password? Back to login
            </Link>
        </div>
    );
}
