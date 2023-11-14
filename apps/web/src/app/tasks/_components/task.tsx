"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { CheckIcon, DotsHorizontalIcon, Pencil1Icon, TrashIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { z } from "zod";

import type { Task } from "@blueprint/db";
import {
    Button,
    Dialog,
    DialogContent,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Textarea,
    useZodForm,
} from "@blueprint/ui";

import { Shell } from "@/components/shell";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

export function Task({ task }: { task: Task }) {
    return (
        <Shell
            className={cn(
                "flex h-fit items-center justify-between",
                task.completed && "border-green-600 bg-green-100 dark:bg-[#041200]",
            )}
        >
            <div className="flex items-center gap-2">
                <TaskCheckbox task={task} />
                <p>{task.text}</p>
            </div>
            <TaskActions task={task} />
        </Shell>
    );
}

export function TaskCheckbox({ task }: { task: Task }) {
    const [hover, setHover] = useState<boolean>(false);
    const router = useRouter();
    const updateStatus = api.task.updateTask.useMutation({
        onError: (error) => toast.error(error.message),
        onSuccess: () => router.refresh(),
    });

    async function handleUpdate() {
        await updateStatus.mutateAsync({
            id: task.id,
            completed: !task.completed,
            text: task.text,
        });
    }
    return (
        <div
            className="flex items-center justify-center leading-4"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            <span
                className={cn(
                    "text-primary/30 border-border flex h-[22px] w-[22px] cursor-pointer items-center justify-center rounded-2xl border",
                    task.completed && "border-green-600",
                )}
                onClick={() => handleUpdate()}
            >
                {(hover || task.completed) && <CheckIcon className="h-3 w-3" />}
            </span>
        </div>
    );
}

const updateTaskSchema = z.object({
    text: z.string().min(1, { message: "You cannot leave this field empty" }),
});

export function TaskActions({ task }: { task: Task }) {
    const [isLoading, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const form = useZodForm({
        schema: updateTaskSchema,
        defaultValues: {
            text: task.text,
        },
    });
    const deleteTask = api.task.deleteTask.useMutation({
        onError: (error) => toast.error(error.message),
        onSuccess: () => router.refresh(),
    });
    const updateTask = api.task.updateTask.useMutation({
        onError: (error) => toast.error(error.message),
        onSuccess: () => {
            toast.success("Task updated!");
            router.refresh();
        },
    });
    async function handleDelete() {
        await deleteTask.mutateAsync({ id: task.id });
    }
    async function handleUpdate(data: z.infer<typeof updateTaskSchema>) {
        startTransition(async () => {
            await updateTask.mutateAsync({
                id: task.id,
                completed: task.completed,
                text: data.text,
            });
            setOpen(false);
        });
    }
    return (
        <React.Fragment>
            <DropdownMenu>
                <DropdownMenuTrigger className="px-2 outline-none">
                    <DotsHorizontalIcon className="h-4 w-4 cursor-pointer" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="bottom" className="w-10">
                    <DropdownMenuItem
                        className="flex items-center gap-1 text-xs"
                        onClick={() => setOpen(!open)}
                    >
                        <Pencil1Icon className="h-4 w-4" />
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className="hover:text-destructive focus:bg-destructive/10 flex items-center gap-1 text-xs"
                        onClick={() => handleDelete()}
                    >
                        <TrashIcon className="h-4 w-4" />
                        Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="top-[30%]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="text"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Task</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="resize-none shadow-none outline-none"
                                                ring={false}
                                                autoComplete="off"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full items-center justify-end">
                                <Button size="sm" type="submit" disabled={isLoading}>
                                    Update
                                </Button>
                            </div>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
