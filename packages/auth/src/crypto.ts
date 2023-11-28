import crypto from "crypto";

import { bcrypt, bcryptVerify } from "hash-wasm";

const COST_FACTOR = 11;

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.randomBytes(16);

    const hash = await bcrypt({
        password,
        salt,
        costFactor: COST_FACTOR,
        outputType: "encoded",
    });

    return hash;
}

export function verifyPassword(hashedPassword: string, password: string): Promise<boolean> {
    return bcryptVerify({
        password,
        hash: hashedPassword,
    });
}
