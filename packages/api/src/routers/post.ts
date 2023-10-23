import { createRouter, publicProcedure } from "../trpc";

export const postRouter = createRouter({
    getPosts: publicProcedure.query(async (opts) => {
        return opts.ctx.db.post.findMany();
    }),
});
