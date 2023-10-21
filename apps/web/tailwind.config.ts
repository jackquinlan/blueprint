import base from "@blueprint/tailwind/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets"> = {
    presets: [
        {
            ...base,
            content: [
                "./src/**/*.{js,ts,jsx,tsx,mdx}", "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
            ],
        }
    ],
};

export default config;
