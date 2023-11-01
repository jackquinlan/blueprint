"use client";

import React, { useState } from "react";

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

import { api } from "@/trpc/client";
import { Loader } from "@/components/loading-animation";

interface Props {}

const updateProfileSchema = z.object({
    name: z.string().min(3).max(32),
});

export function ProfileSettings({}: Props) {
    const [saving, setSaving] = useState<boolean>(false);
    const form = useZodForm({ schema: updateProfileSchema });
    async function handleSubmit(data: z.infer<typeof updateProfileSchema>) {
        setSaving(true);
        toast.success("Profile updated successfully");
        console.log(data);
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
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
                                This is the name that will be displayed on your
                                profile. Must be between 3 and 32 characters.
                            </FormDescription>
                        </FormItem>
                    )}
                />
                <Button size="sm" type="submit" disabled={saving}>
                    {saving ? <Loader size="sm" /> : "Save"}
                </Button>
            </form>
        </Form>
    );
}
