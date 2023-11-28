"use client";

import React, { useState, useTransition } from "react";

import { AlertTriangle } from "lucide-react";
import type { User } from "next-auth";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    getButtonClasses,
    Input,
    Label,
} from "@blueprint/ui";

import { Loader } from "@/components/loading-animation";
import { Shell } from "@/components/shell";
import { api } from "@/trpc/react";

interface Props {
    user: User;
}

export function DeleteAccount({ user }: Props) {
    const [isLoading, startTransition] = useTransition();
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
    const [confirmName, setConfirmName] = useState<string>("");

    const deleteUser = api.user.deleteUser.useMutation({
        onSuccess: () => signOut({ callbackUrl: "/" }),
        onError: (error) => toast.error(error.message),
    });

    async function handleDelete() {
        startTransition(async () => {
            await deleteUser.mutateAsync({ id: user.id });
        });
    }

    return (
        <Shell className="flex flex-col space-y-2 border-[#FFA9A9] bg-[#FFF3F3] dark:border-[#7F1F1F] dark:bg-[#1F0E0E] sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-destructive flex items-center gap-1 text-lg font-medium">
                    <AlertTriangle className="h-4 w-4" /> Delete Account
                </h1>
                <h2 className="text-sm">
                    This action is irreversible. All your data will be deleted.
                </h2>
            </div>
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogTrigger className={getButtonClasses({ variant: "danger", size: "sm" })}>
                    Delete Account
                </AlertDialogTrigger>
                <AlertDialogContent className="top-[25%]">
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete account</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to delete your account? All data associated with
                            your account will deleted.{" "}
                            <span className="text-destructive font-medium">
                                This action cannot be undone.
                            </span>
                        </AlertDialogDescription>
                        <Label className="pt-2 text-sm font-normal">
                            Enter your name <span className="font-medium">{user.name}</span> to
                            confirm.
                        </Label>
                        <Input autoFocus onChange={(e) => setConfirmName(e.target.value)} />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            variant="danger"
                            disabled={isLoading || confirmName !== user.name}
                        >
                            {isLoading ? <Loader size="sm" /> : "Delete"}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Shell>
    );
}
