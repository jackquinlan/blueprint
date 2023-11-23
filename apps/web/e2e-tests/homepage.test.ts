import { test } from "@playwright/test";

test.describe("Homepage", () => {
    test("should display the homepage title", async ({ page }) => {
        await page.goto("/");
        await page.waitForSelector("text=Your Application Blueprint");
    });
});
