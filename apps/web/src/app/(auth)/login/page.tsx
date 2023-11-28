import * as React from "react";
import Link from "next/link";

import { Separator } from "@blueprint/ui";

import { GithubButton } from "@/app/(auth)/_components/github-button";
import { LoginForm } from "@/app/(auth)/_components/login-form";
import { Shell } from "@/components/shell";

export default function Login() {
    return (
        <div className="container mt-16 flex w-full flex-col items-center space-y-4">
            <Shell className="w-full p-4 px-6 pb-4 md:w-1/2 xl:w-1/3">
                <div className="py-2">
                    <h1 className="text-xl font-medium">Welcome back</h1>
                    <h2 className="text-sm text-zinc-500">
                        Enter your email and password to continue to Blueprint
                    </h2>
                </div>
                <Separator />
                <LoginForm />
                <p className="pb-2 text-center text-sm">Or continue with</p>
                <GithubButton />
            </Shell>
            <Link href="/signup" className="hover:underline hover:underline-offset-4">
                Don&apos;t have an account? Create one now
            </Link>
        </div>
    );
}
