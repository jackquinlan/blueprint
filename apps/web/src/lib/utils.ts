import type { Metadata } from "next";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function constructMetadata({
    title = "Blueprint - A Next.js Starter Kit",
    description = "",
    icons = "/favicon.ico",
}: {
    title?: string;
    description?: string;
    icons?: string;
} = {}): Metadata {
    return {
        title,
        description,
        icons,
    };
}

export function getBaseUrl() {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export async function getGithubStars() {
    const githubResponse = await fetch("https://api.github.com/repos/jackquinlan/blueprint");
    const json = await githubResponse.json();
    const githubStars = z.object({ stargazers_count: z.number() }).safeParse(json);
    return githubStars.success ? githubStars.data.stargazers_count : "100+";
}
