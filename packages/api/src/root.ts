// prettier-ignore
import { createRouter } from "./trpc";

import { postRouter } from "./routers/post";
import { stripeRouter } from "./routers/stripe";
import { userRouter } from "./routers/user";

const appRouter = createRouter({
    post: postRouter,
    user: userRouter,
    stripe: stripeRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
