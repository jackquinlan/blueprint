"use client";

import * as React from "react";

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
import { resetPasswordSchmea } from "@blueprint/lib/validators/user";

import { Loader } from "@/components/loading-animation";
import { api } from "@/trpc/react";

export function ResetPasswordForm({ token }: { token: string }) {
    const [success, setSuccess] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>("");
    const [isLoading, startTransition] = React.useTransition();
    const form = useZodForm({
        schema: resetPasswordSchmea,
        defaultValues: { password: "", confirmPassword: "", token: token },
    });

    const updatePassword = api.user.resetPassword.useMutation({
        onSuccess: () => {
            setSuccess(true);
            form.reset();
        },
    });

    async function handleSubmit(data: z.infer<typeof resetPasswordSchmea>) {
        setSuccess(false);
        setError("");
        startTransition(async () => {
            try {
                await updatePassword.mutateAsync(data);
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
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New password</FormLabel>
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm new password</FormLabel>
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
                {error && <Alert variant="danger">{error}</Alert>}
                {success && (
                    <Alert variant="success">Your password has been updated successfully.</Alert>
                )}
                <Button type="submit" className="w-full" disabled={success}>
                    {isLoading ? <Loader size="sm" /> : "Reset password"}
                </Button>
            </form>
        </Form>
    );
}
