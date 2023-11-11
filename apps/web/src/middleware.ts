import { NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";

export default withAuth(
    async function middleware(req) {
        const token = await getToken({ req });

        const isAuthPage =
            req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname === "/";

        if (isAuthPage) {
            return null;
        }

        if (!token) {
            let from = req.nextUrl.pathname;
            if (req.nextUrl.search) from += req.nextUrl.search;
            return NextResponse.redirect(new URL(`/?from=${encodeURIComponent(from)}`, req.url));
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    },
);

export const config = {
    matcher: ["/tasks", "/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
