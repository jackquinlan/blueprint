"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Lock } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { addPasswordSchema, updatePasswordSchema } from "@blueprint/lib/validators/user";
import {
    Alert,
    Button,
    CancelButton,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Input,
    Label,
    Switch,
    useZodForm,
} from "@blueprint/ui";

import { api } from "@/trpc/react";
import { Loader } from "@/components/loading-animation";

interface Props {
    hasPassword: boolean;
}

export function AddOrUpdatePasswordModal({ hasPassword }: Props) {
    const [openUpdate, setOpenUpdate] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    return (
        <React.Fragment>
            <div className="flex items-center justify-between">
                <div className="flex flex-col space-y-1">
                    <Label>Password</Label>
                    <p className="text-xs leading-5">
                        Set a permanent password to login to your account
                    </p>
                </div>
                {!hasPassword ? (
                    <Switch checked={open} onCheckedChange={() => setOpen(!open)} />
                ) : (
                    <Button size="sm" variant="outline" onClick={() => setOpenUpdate(!openUpdate)}>
                        Update password
                    </Button>
                )}
            </div>
            {!hasPassword && (
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="top-[30%]">
                        <DialogTitle className="flex items-center gap-1">
                            <Lock className="h-4 w-4" />
                            Add a password to your account
                        </DialogTitle>
                        <DialogDescription>
                            Password must contain at least one uppercase letter, one number, and one
                            special character.
                        </DialogDescription>
                        <AddPasswordForm close={() => setOpen(!open)} />
                    </DialogContent>
                </Dialog>
            )}
            <Dialog open={openUpdate} onOpenChange={setOpenUpdate}>
                <DialogContent className="top-[30%]">
                    <DialogTitle className="flex items-center gap-1">
                        <Lock className="h-4 w-4" />
                        Update your password
                    </DialogTitle>
                    <DialogDescription>
                        New password must contain at least one uppercase letter, one number, and one
                        special character.
                    </DialogDescription>
                    <ChangePasswordForm close={() => setOpenUpdate(!openUpdate)} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}

export function AddPasswordForm({ close }: { close: () => void }) {
    const router = useRouter();
    const addPassword = api.user.addPassword.useMutation({
        onSuccess: () => router.refresh(),
    });
    const form = useZodForm({
        schema: addPasswordSchema,
        defaultValues: {
            confirmPassword: "",
            password: "",
        },
    });
    const [isLoading, startTransition] = useTransition();
    async function handleAddPassword(data: z.infer<typeof addPasswordSchema>) {
        startTransition(async () => {
            try {
                await addPassword.mutateAsync(data);
                toast.success("A password has been added to your account.");
                close();
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAddPassword)} className="space-y-2">
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm your new password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="pt-2">
                    <CancelButton close={close} size="sm" variant="outline">
                        Cancel
                    </CancelButton>
                    <Button type="submit" size="sm">
                        {isLoading ? <Loader size="sm" /> : "Add password"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}

export function ChangePasswordForm({ close }: { close: () => void }) {
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const updatePassword = api.user.updatePassword.useMutation({
        onSuccess: () => router.refresh(),
        onError: (error) => setError(error.message),
    });
    const [isLoading, startTransition] = useTransition();
    const form = useZodForm({
        schema: updatePasswordSchema,
        defaultValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
        },
    });
    async function handleUpdatePassword(data: z.infer<typeof updatePasswordSchema>) {
        startTransition(async () => {
            try {
                await updatePassword.mutateAsync(data);
                toast.success("Your password has been successfully updated.");
                close();
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        });
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleUpdatePassword)} className="space-y-2">
                {error && <Alert variant="danger">{error}</Alert>}
                <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Enter your current password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••••" type="password" {...field} />
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
                            <FormLabel>Enter new password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm your new password</FormLabel>
                            <FormControl>
                                <Input placeholder="••••••••••" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <DialogFooter className="pt-2">
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                            e.preventDefault();
                            close();
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" size="sm">
                        {isLoading ? <Loader size="sm" /> : "Change password"}
                    </Button>
                </DialogFooter>
            </form>
        </Form>
    );
}
