import { withAuth } from "next-auth/middleware";

export default withAuth({
    callbacks: {
        async authorized() {
            return true;
        },
    },
});

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)"],
};
