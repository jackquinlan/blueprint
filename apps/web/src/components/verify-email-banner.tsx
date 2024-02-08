"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { AlertTriangle, Mail } from "lucide-react";
import { toast } from "sonner";

import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from "@blueprint/ui";

import { api } from "@/trpc/react";
import { Loader } from "@/components/loading-animation";

interface Props {
    email: string;
}

export function VerifyEmailBanner({ email }: Props) {
    const [isLoading, startTransition] = useTransition();
    const [open, setOpen] = useState<boolean>(false);

    const router = useRouter();
    const sendVerificationEmail = api.user.sendVerificationEmail.useMutation({
        onSuccess: () => router.refresh(),
    });

    async function handleResendEmail() {
        startTransition(async () => {
            try {
                await sendVerificationEmail.mutateAsync({ email });
                toast.success(`Verification email has been sent to ${email}.`);
                setOpen(false);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message);
                }
            }
        });
    }

    return (
        <React.Fragment>
            <div className="bg-warning">
                <div className="mx-auto flex h-10 max-w-screen-xl items-center justify-center gap-x-3 px-4 py-2 text-sm font-medium">
                    <div className="flex items-center gap-x-2 text-yellow-900">
                        <AlertTriangle className="h-4 w-4" />
                        Verify your email address to gain access to all features.
                    </div>
                    <Button size="xs" variant="outline" onClick={() => setOpen(true)}>
                        Verify Email
                    </Button>
                </div>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="h-5 w-5" />
                        Verify Your Email
                    </DialogTitle>
                    <DialogDescription>
                        We&apos;ve sent an email to <strong>{email}</strong>. Please check your
                        inbox and click the link in the email to verify your account.
                    </DialogDescription>
                    <DialogFooter>
                        <Button disabled={isLoading} size="sm" onClick={handleResendEmail}>
                            {isLoading ? <Loader size="sm" /> : "Resend Verification Email"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
