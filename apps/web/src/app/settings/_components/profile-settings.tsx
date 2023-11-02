"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import type { User } from "next-auth";
import { toast } from "sonner";
import { z } from "zod";

import {
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

import { Loader } from "@/components/loading-animation";
import { Shell } from "@/components/shell";
import { api } from "@/trpc/react";

interface Props {
    user: User;
}

const updateProfileSchema = z.object({
    name: z.string().min(3).max(32),
});

export function ProfileSettings({ user }: Props) {
    const router = useRouter();
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: updateProfileSchema,
        defaultValues: {
            name: user.name ?? "",
        },
    });
    const updateUser = api.user.updateUser.useMutation({
        onSuccess: () => router.refresh(),
    });
    async function handleSubmit(data: z.infer<typeof updateProfileSchema>) {
        startTransition(async () => {
            try {
                updateUser.mutate({ id: user.id, name: data.name });
                toast.success("Profile updated successfully!");
            } catch (err) {
                toast.error("An error occurred while updating your profile.");
            }
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <Shell className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="johndoe" autoComplete="off" {...field} />
                                </FormControl>
                                <FormMessage />
                                <FormDescription>
                                    This is the name that will be displayed on your profile. Must be
                                    between 3 and 32 characters.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <div>
                        <Button size="sm" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader size="sm" /> : "Save"}
                        </Button>
                    </div>
                </Shell>
            </form>
        </Form>
    );
}
