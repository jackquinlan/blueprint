import { headers } from "next/headers";

import {
    createTRPCProxyClient,
    loggerLink,
    unstable_httpBatchStreamLink as httpBatchStreamLink,
} from "@trpc/client";
import superjson from "superjson";

import type { AppRouter } from "@blueprint/api";
import { getTrpcUrl } from "@/lib/utils";

export const api = createTRPCProxyClient<AppRouter>({
    transformer: superjson,
    links: [
        loggerLink({
            enabled: (op) =>
            process.env.NODE_ENV === "development" ||
            (op.direction === "down" && op.result instanceof Error),
        }),
        httpBatchStreamLink({
            url: getTrpcUrl(),
            headers() {
                const heads = new Map(headers());
                heads.set("x-trpc-source", "rsc");
                return Object.fromEntries(heads);
            },
        }),
    ],
});
  
