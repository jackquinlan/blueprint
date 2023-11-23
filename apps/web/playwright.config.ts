import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "e2e-tests",
    reporter: "html",
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
