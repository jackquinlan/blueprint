import React from "react";

import { cn } from "@/lib/utils";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {}

function Shell({ className = "", children, ...props }: ShellProps) {
    return (
        <div className={cn("border-border rounded-lg border p-4", className)} {...props}>
            {children}
        </div>
    );
}
export { Shell, type ShellProps };
