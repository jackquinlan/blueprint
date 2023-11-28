"use client";

import * as React from "react";

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
import { forgotPasswordSchema } from "@blueprint/utils";

import { Loader } from "@/components/loading-animation";
import { api } from "@/trpc/react";

export function ForgotPasswordForm() {
    const [success, setSuccess] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");
    const [isLoading, startTransition] = React.useTransition();
    const form = useZodForm({ schema: forgotPasswordSchema, defaultValues: { email: "" } });

    const sendForgotEmail = api.user.sendForgotPasswordEmail.useMutation({
        onSuccess: async () => setSuccess(true),
    });

    async function handleSubmit(data: z.infer<typeof forgotPasswordSchema>) {
        setSuccess(false);
        setError("");
        startTransition(async () => {
            try {
                await sendForgotEmail.mutateAsync(data);
            } catch (error) {
                if (error instanceof Error) {
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
                                    autoComplete="email"
                                    placeholder="you@email.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {error && <Alert variant="danger">{error}</Alert>}
                {success && (
                    <Alert variant="success">
                        An email has been sent to your inbox with instructions to reset your
                        password.
                    </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? <Loader size="sm" /> : "Reset password"}
                </Button>
            </form>
        </Form>
    );
}
