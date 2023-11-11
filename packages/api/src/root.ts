// prettier-ignore
import { createRouter } from "./trpc";

import { stripeRouter } from "./routers/stripe";
import { taskRouter } from "./routers/task";
import { userRouter } from "./routers/user";

const appRouter = createRouter({
    stripe: stripeRouter,
    user: userRouter,
    task: taskRouter,
});
export type AppRouter = typeof appRouter;
export { appRouter };
