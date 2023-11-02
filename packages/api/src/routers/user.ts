import { TRPCError } from "@trpc/server";
import * as z from "zod";

import { createRouter, protectedProcedure } from "../trpc";

export const userRouter = createRouter({
    me: protectedProcedure.query(async (opts) => {
        return opts.ctx.session.user;
    }),
    updateUser: protectedProcedure
        .input(z.object({ id: z.string().cuid(), name: z.string() }))
        .mutation(async (opts) => {
            // check that user is allowed to update this user
            if (opts.ctx.session.user.id !== opts.input.id) {
                throw new TRPCError({ code: "UNAUTHORIZED" });
            }
            return await opts.ctx.db.user.update({
                where: { id: opts.input.id },
                data: {
                    name: opts.input.name,
                },
            });
        }),
});
