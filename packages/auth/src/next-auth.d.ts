import type { DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: User;
    }
    interface User extends Omit<DefaultUser, "id"> {
        id: string;
        email: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
    }
}
