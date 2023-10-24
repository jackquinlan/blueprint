import { createRouter, protectedProcedure } from "../trpc";

export const userRouter = createRouter({
    me: protectedProcedure.query(async (opts) => {
        return opts.ctx.session.user;
    }),
});
