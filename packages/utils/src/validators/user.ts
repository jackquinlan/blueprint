import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    })
    .refine(
        (data) => {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
                data.password,
            );
        },
        {
            path: ["password"],
            message:
                "Password must contain at least one uppercase letter, one number, and one special character.",
        },
    );

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export const resetPasswordSchmea = z
    .object({
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string(),
        token: z.string().uuid(),
    })
    .refine(
        (data) => {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
                data.password,
            );
        },
        {
            path: ["password"],
            message:
                "Password must contain at least one uppercase letter, one number, and one special character.",
        },
    )
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords must match.",
    });
