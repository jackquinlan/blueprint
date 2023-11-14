"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { z } from "zod";

import {
    Button,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    Textarea,
    useZodForm,
} from "@blueprint/ui";

import { Loader } from "@/components/loading-animation";
import { Shell } from "@/components/shell";
import { api } from "@/trpc/react";

const createTaskSchema = z.object({
    text: z.string().min(1, { message: "Task cannot be empty." }),
});

export function CreateTask() {
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: createTaskSchema,
        defaultValues: { text: "" },
    });
    const router = useRouter();
    const createTask = api.task.createTask.useMutation({
        onSuccess: () => router.refresh(),
    });
    async function handleCreate(data: z.infer<typeof createTaskSchema>) {
        startTransition(async () => {
            try {
                await createTask.mutateAsync({ text: data.text });
                toast.success("New task added successfully!");
                form.reset();
            } catch (err: any) {
                toast.error(err.message);
            }
        });
    }
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCreate)}>
                <Shell>
                    <FormField
                        control={form.control}
                        name="text"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                        className="h-16 resize-none border-none shadow-none"
                                        autoFocus
                                        autoComplete="off"
                                        placeholder="Add new task"
                                        ring={false}
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage className="px-3" />
                            </FormItem>
                        )}
                    />
                    <div className="flex w-full items-center justify-end p-1">
                        <Button size="xs" type="submit" disabled={isLoading}>
                            {isLoading ? <Loader size="sm" /> : "Add Task"}
                        </Button>
                    </div>
                </Shell>
            </form>
        </Form>
    );
}
