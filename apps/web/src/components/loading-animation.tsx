import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const loaderVariants = cva("animate-pulse rounded-full direction-alternate duration-700", {
    variants: {
        variant: {
            default: "bg-zinc-400",
            inverse: "bg-primary",
        },
        size: {
            sm: "h-1 w-1",
            lg: "h-[1.5rem] w-[1.5rem]",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "sm",
    },
});

interface Props extends React.ComponentProps<"div">, VariantProps<typeof loaderVariants> {}

export function Loader({ className, variant, size, ...props }: Props) {
    return (
        <div className={cn("flex items-center justify-center gap-1", className)} {...props}>
            <div className={cn(loaderVariants({ variant, size }))} />
            <div className={cn(loaderVariants({ variant, size }), "delay-150")} />
            <div className={cn(loaderVariants({ variant, size }), "delay-300")} />
        </div>
    );
}
