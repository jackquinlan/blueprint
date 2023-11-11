import { NextRequest } from "next/server";

import { initTRPC, TRPCError } from "@trpc/server";
import { type Session } from "next-auth";
import superjson from "superjson";

import { getServerAuthSession } from "@blueprint/auth";
import { db } from "@blueprint/db";

type CreateContextOptions = {
    session: Session | null;
};

/**
 * This helper generates the "internals" for a tRPC context. If you need to use
 * it, you can export it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
export const createInnerTRPCContext = (opts: CreateContextOptions) => {
    return {
        session: opts.session,
        db,
    };
};

/**
 * This is the actual context you'll use in your router. It will be used to
 * process every request that goes through your tRPC endpoint
 * @link https://trpc.io/docs/context
 */
export const createTRPCContext = async (opts: { req: NextRequest }) => {
    // get session info on the server
    const session = await getServerAuthSession();
    return createInnerTRPCContext({
        session,
    });
};

export const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter({ shape }) {
        return shape;
    },
});

/**
 * This is how you create new routers and subrouters in your tRPC API
 * @see https://trpc.io/docs/router
 */
export const createRouter = t.router;
export const mergeRouters = t.mergeRouters;

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 */
export const publicProcedure = t.procedure;

/**
 * Reusable middleware that enforces users are logged in before running the
 * procedure
 */
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
    if (!ctx.session?.user) {
        throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "You must be logged in to do this action",
        });
    }
    return next({
        ctx: {
            // infers the `session` as non-nullable
            session: { ...ctx.session, user: ctx.session.user },
        },
    });
});

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
