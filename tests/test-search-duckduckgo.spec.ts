import { test, expect, chromium } from '@playwright/test';

test('search-duckduckgo', async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');
  const page = await browser.newPage();

  try {
    await page.goto('https://duckduckgo.com/');
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).click();
    await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Playwright existing ');
    await page.getByLabel('playwright connect to').locator('div').filter({ hasText: /^playwright connect to existing browser$/ }).click();
    await page.getByRole('link', { name: 'Automating Existing Browser' }).click();
    await expect(page).toHaveURL(/playwright/i);
  } finally {
    // Keep the debug browser alive between runs.
    // await browser.close();
  }
});