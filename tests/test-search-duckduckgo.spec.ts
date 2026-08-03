import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://duckduckgo.com/');
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).click();
  await page.getByRole('combobox', { name: 'Search with DuckDuckGo' }).fill('Playwright existing ');
  await page.getByLabel('playwright connect to').locator('div').filter({ hasText: /^playwright connect to existing browser$/ }).click();
  await page.getByRole('link', { name: 'Automating Existing Browser' }).click();
});