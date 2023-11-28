"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { signIn } from "next-auth/react";
import { z } from "zod";

import {
    Alert,
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useZodForm,
} from "@blueprint/ui";
import { loginSchema } from "@blueprint/utils";

import { Loader } from "@/components/loading-animation";

export function LoginForm() {
    const [error, setError] = React.useState<string>("");
    const [isLoading, startTransition] = React.useTransition();
    const form = useZodForm({ schema: loginSchema, defaultValues: { email: "", password: "" } });

    const router = useRouter();
    async function loginWithCredentials(data: z.infer<typeof loginSchema>) {
        setError("");
        startTransition(async () => {
            const res = await signIn<"credentials">("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
                callbackUrl: "/",
            });
            if (res?.error) {
                setError(res.error);
                return;
            }
            // refreshing router will auto redirect to home page (w/ middleware)
            router.refresh();
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(loginWithCredentials)} className="space-y-3 py-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete="email"
                                    placeholder="you@email.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete="off"
                                    placeholder="••••••••••"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Link
                    href="/forgot-password"
                    className="flex w-full text-sm underline underline-offset-2"
                >
                    Forgot your password?
                </Link>
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader size="sm" /> : "Log In"}
                </Button>
            </form>
        </Form>
    );
}
