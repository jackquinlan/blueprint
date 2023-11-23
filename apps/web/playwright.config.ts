import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "e2e-tests",
    reporter: "html",
    webServer: {
        command: "pnpm dev",
        port: 3000,
    },
    use: {
        baseURL: "http://localhost:3000",
    },
    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],
});
