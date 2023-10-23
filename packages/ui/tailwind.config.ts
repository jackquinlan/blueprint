import type { Config } from "tailwindcss";

import base from "@blueprint/tailwind/tailwind.config.ts";

const config: Pick<Config, "presets"> = {
    presets: [base],
};

export default config;
