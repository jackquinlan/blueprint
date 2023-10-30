// prettier-ignore
import { createRouter } from "./trpc";

import { postRouter } from "./routers/post";
import { userRouter } from "./routers/user";

const appRouter = createRouter({
    post: postRouter,
    user: userRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
