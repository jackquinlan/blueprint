import { PrismaClient } from "@prisma/client";

// Make sure that there is only one instance of Prisma Client at any one time.
declare global {
    var __globalPrisma__: PrismaClient;
}

export let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
    db = new PrismaClient({
        log: ["error", "warn"],
    });
} else {
    if (!global.__globalPrisma__) {
        global.__globalPrisma__ = new PrismaClient({
            log: ["error", "warn"],
        });
    }

    db = global.__globalPrisma__;
}
