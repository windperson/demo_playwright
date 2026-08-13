import { test, expect, chromium } from '@playwright/test';

test('connect to existing Chrome via CDP', async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();

  try {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
  } finally {
    // Keep the browser alive for the current debug session.
    // If you want to close the attached browser, uncomment the next line.
    // await browser.close();
  }
});
