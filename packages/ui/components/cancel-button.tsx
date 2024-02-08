import { Button, ButtonProps } from "./button";

interface CancelButtonProps extends ButtonProps {
    close: () => void;
}

export function CancelButton({
    close,
    variant = "outline",
    size = "xs",
    ...props
}: CancelButtonProps) {
    return (
        <Button
            type="button"
            size={size}
            variant={variant}
            onClick={(e) => {
                e.preventDefault();
                close();
            }}
            {...props}
        >
            Cancel
        </Button>
    );
}
