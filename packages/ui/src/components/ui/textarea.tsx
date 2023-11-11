import * as React from "react";

import { cn } from "../../lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    ring?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ring = true, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "border-input placeholder:text-muted-foreground flex min-h-[60px] w-full rounded-md border bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    ring && "focus-visible:ring-ring focus-visible:ring-1",
                    className,
                )}
                ref={ref}
                {...props}
            />
        );
    },
);
Textarea.displayName = "Textarea";

export { Textarea };
