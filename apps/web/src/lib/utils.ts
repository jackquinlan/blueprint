import type { Metadata } from "next";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

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
        themeColor: "#FFF",
    };
}
