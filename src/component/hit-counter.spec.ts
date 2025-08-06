import { expect, test } from '@playwright/test';

import { type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto('http://localhost:8080/index.html');
});

test.afterAll(async () => {
  await page.close();
});

test('renders the hit counter', async () => {
  await page.waitForSelector('hit-counter', { state: 'visible' });
  await expect(page.locator('hit-counter')).toBeVisible();
});

test('renders the hit counter with a value', async () => {
  await expect(page.locator('hit-counter')).toHaveText('0');
});
