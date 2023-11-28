import * as React from "react";
import Link from "next/link";

import { Separator } from "@blueprint/ui";

import { ForgotPasswordForm } from "@/app/(auth)/_components/forgot-password-form";
import { Shell } from "@/components/shell";

export default function ForgotPassword() {
    return (
        <div className="container mt-16 flex w-full flex-col items-center space-y-4">
            <Shell className="w-full p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                <div className="py-2">
                    <h1 className="text-xl font-medium">Forgot password</h1>
                    <h2 className="text-sm text-zinc-500">
                        Enter your email below to reset your password
                    </h2>
                </div>
                <Separator />
                <ForgotPasswordForm />
            </Shell>
            <Link href="/login" className="hover:underline hover:underline-offset-4">
                Remeber your password? Back to login
            </Link>
        </div>
    );
}
