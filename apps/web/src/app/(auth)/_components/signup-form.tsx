"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { TRPCError } from "@trpc/server";
import { signIn } from "next-auth/react";
import { z } from "zod";

import {
    Alert,
    Button,
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    useZodForm,
} from "@blueprint/ui";
import { signupSchema } from "@blueprint/lib/validators/user";

import { Loader } from "@/components/loading-animation";
import { api } from "@/trpc/react";

export function SignupForm() {
    const [error, setError] = React.useState<string>("");
    const [isLoading, startTransition] = React.useTransition();
    const form = useZodForm({ schema: signupSchema, defaultValues: { email: "", password: "" } });

    const router = useRouter();
    const createUser = api.user.createUser.useMutation({
        onSuccess: async () => {
            const res = await signIn("credentials", {
                email: form.getValues("email"),
                password: form.getValues("password"),
                redirect: false,
            });
            if (res?.error) {
                setError(res.error);
                return;
            }
            // force a refresh to redirect to home page (w/ middleware)
            router.refresh();
        },
    });
    async function handleSubmit(data: z.infer<typeof signupSchema>) {
        setError("");
        startTransition(async () => {
            try {
                await createUser.mutateAsync(data);
            } catch (error) {
                if (error instanceof Error || error instanceof TRPCError) {
                    setError(error.message);
                }
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3 py-2">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="you@email.com"
                                    autoComplete="email"
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
                            <FormDescription>
                                Password must contain at least one uppercase letter, one number, and
                                one special character.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <Alert variant="danger">{error}</Alert>}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader size="sm" /> : "Create your account"}
                </Button>
            </form>
        </Form>
    );
}
