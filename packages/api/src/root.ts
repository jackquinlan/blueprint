// prettier-ignore
import { createRouter } from "./trpc";

import { postRouter } from "./routers/post";

const appRouter = createRouter({
    post: postRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
