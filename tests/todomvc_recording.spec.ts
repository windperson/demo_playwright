import { test, expect, chromium } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Read from rootfolder .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

test('creates todos, completes one, and filters active items', async () => {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9222');

  const page = await browser.newPage();

  try {

    await page.goto(`${process.env.EXAMPLE_TODO_URL}`);

    const newTodo = page.getByRole('textbox', { name: 'What needs to be done?' });
    const todos = ['Buy eggs', 'Got goods', 'Pickup boys', 'Take a walk'];

    for (const todo of todos) {
      await newTodo.fill(todo);
      await newTodo.press('Enter');
    }

    await expect(page.getByText('4 items left')).toBeVisible();

    const todoItems = page.locator('.todo-list li');
    const pickupBoys = todoItems.filter({ hasText: 'Pickup boys' });
    await pickupBoys.getByRole('checkbox').check();
    await expect(pickupBoys).toHaveClass(/completed/);
    await expect(page.getByText('3 items left')).toBeVisible();

    await page.getByRole('link', { name: 'Active' }).click();

    await expect(page).toHaveURL(/#\/active$/);
    await expect(todoItems).toHaveText(['Buy eggs', 'Got goods', 'Take a walk']);
    await expect(page.getByText('Pickup boys')).toHaveCount(0);
  } finally {
    // Keep the existing browser session alive for the current debug session.
    // If you want to close it after the test, uncomment the next line.
    // await browser.close();
  }

});
