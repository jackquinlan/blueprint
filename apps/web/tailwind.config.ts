import type { Config } from "tailwindcss";

import base from "@blueprint/tailwind/tailwind.config.ts";

const config: Pick<Config, "presets"> = {
    presets: [
        {
            ...base,
            content: [
                "./src/**/*.{js,ts,jsx,tsx,mdx}",
                "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}",
            ],
        },
    ],
};

export default config;
