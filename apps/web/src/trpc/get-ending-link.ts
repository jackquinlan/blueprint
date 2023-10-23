import type { HTTPBatchLinkOptions, HTTPHeaders, TRPCLink } from "@trpc/client";
import { httpBatchLink } from "@trpc/client";

import type { AppRouter } from "@blueprint/api";

import { getBaseUrl } from "@/lib/utils";

export const endingLink = (opts?: { headers?: HTTPHeaders }) =>
    ((runtime) => {
        const sharedOpts = {
            headers: opts?.headers,
        } satisfies Partial<HTTPBatchLinkOptions>;

        const trpcLink = httpBatchLink({
            ...sharedOpts,
            url: `${getBaseUrl()}/api/trpc`,
        })(runtime);

        return (ctx) => {
            const path = ctx.op.path.split(".") as [string, ...string[]];

            const newCtx = {
                ...ctx,
                op: { ...ctx.op, path: path.join(".") },
            };
            return trpcLink(newCtx);
        };
    }) satisfies TRPCLink<AppRouter>;
