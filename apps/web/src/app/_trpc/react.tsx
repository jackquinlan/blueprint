"use client";

import React, { useState } from "react";
import { createTRPCReact } from "@trpc/react-query";
import { loggerLink, unstable_httpBatchStreamLink as httpBatchStreamLink } from "@trpc/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import superjson from "superjson";

import type { AppRouter } from "@blueprint/api";
import { getTrpcUrl } from "@/lib/utils";

export const api = createTRPCReact<AppRouter>();

export function TRPCProvider(props: {
    children: React.ReactNode; headers: Headers;
}) {
    const [queryClient] = useState(() => new QueryClient());
    // tRPC client for client-side queries/mutations
    const [trpcClient] = useState(() => api.createClient({
        transformer: superjson,
        links: [
            loggerLink(), 
            httpBatchStreamLink({ 
                url: getTrpcUrl(),
                headers() {
                    const heads = new Map(props.headers);
                    heads.set("x-trpc-source", "react");
                    return Object.fromEntries(heads);
                }, 
            }),
        ],
    }));
    return (
        <QueryClientProvider client={queryClient}>
            <api.Provider client={trpcClient} queryClient={queryClient}>
                {props.children}
            </api.Provider>
        </QueryClientProvider>
    );
}

export { type RouterInputs, type RouterOutputs } from "@blueprint/api";
