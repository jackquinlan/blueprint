import base from "@blueprint/tailwind/tailwind.config.ts";
import type { Config } from "tailwindcss";

const config: Pick<Config, "presets"> = {
    presets: [base],
};

export default config;
