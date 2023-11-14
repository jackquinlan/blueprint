import * as z from "zod";

import { getUserPlan, RequiresPremiumError } from "@blueprint/utils";

import { createRouter, protectedProcedure } from "../trpc";

export const taskRouter = createRouter({
    getUserTasks: protectedProcedure.query(async (opts) => {
        return await opts.ctx.db.task.findMany({
            where: {
                userId: opts.ctx.session.user.id,
            },
        });
    }),
    createTask: protectedProcedure
        .input(
            z.object({
                text: z.string(),
            }),
        )
        .mutation(async (opts) => {
            // if user is not premium, check that they have less than 5 tasks (free plan limit)
            const plan = await getUserPlan(opts.ctx.session.user.id);
            if (!plan.isPremium) {
                const tasks = await opts.ctx.db.task.count({
                    where: {
                        userId: opts.ctx.session.user.id,
                    },
                });
                if (tasks >= 5) {
                    throw new RequiresPremiumError(
                        "You need to upgrade to premium to create more tasks.",
                    );
                }
            }
            return await opts.ctx.db.task.create({
                data: {
                    userId: opts.ctx.session.user.id,
                    text: opts.input.text,
                },
            });
        }),
    updateTask: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string().min(1),
                completed: z.boolean(),
            }),
        )
        .mutation(async (opts) => {
            const task = await opts.ctx.db.task.findFirst({
                where: {
                    id: opts.input.id,
                    userId: opts.ctx.session.user.id,
                },
            });
            if (!task) {
                throw new Error("Task not found");
            }
            return await opts.ctx.db.task.update({
                where: {
                    id: opts.input.id,
                },
                data: {
                    text: opts.input.text,
                    completed: opts.input.completed,
                },
            });
        }),
    deleteTask: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async (opts) => {
            const task = await opts.ctx.db.task.findFirst({
                where: {
                    id: opts.input.id,
                    userId: opts.ctx.session.user.id,
                },
            });
            if (!task) {
                throw new Error("Task not found");
            }
            return await opts.ctx.db.task.delete({
                where: {
                    id: opts.input.id,
                },
            });
        }),
});
