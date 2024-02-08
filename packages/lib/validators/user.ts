import * as z from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, { message: "Invalid password" }),
});

// prettier-ignore
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
        }, { path: ["password"], message: "Password must have one uppercase letter, one number, and one special character." },
    );

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

// prettier-ignore
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
        }, { path: ["password"], message: "Password must have one uppercase letter, one number, and one special character." },
    )
    .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords must match." });

export const verifyEmailSchema = z.object({
    email: z.string().email(),
});

// prettier-ignore
export const addPasswordSchema = z
    .object({
        password: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string(),
    })
    .refine(
        (data) => {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
                data.password,
            );
        }, { path: ["password"], message: "Password must have one uppercase letter, one number, and one special character." },
    )
    .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords must match." });

// prettier-ignore
export const updatePasswordSchema = z
    .object({
        currentPassword: z.string(),
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine(
        (data) => {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(
                data.password,
            );
        }, { path: ["password"], message: "Invalid password." },
    )
    .refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Passwords must match." });
