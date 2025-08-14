import { expect, test, type Locator, type Page } from '@playwright/test';
/**
 * Gotchas with testing web components in Playwright
 * @link https://playwright.dev/docs/test-components#test-stories
 */

test.describe.configure({ mode: 'serial' });

test.describe('basic counter', () => {
  let page: Page;
  let counter: Locator;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
  });


  test.afterAll(async () => {
    await page.close();
  });


  test.beforeEach('navigate to the test page', async ({ page }) => {
    await page.goto('/test.html');
  });

  test('renders and upgrades <hit-counter>', async ({ page }) => {
    await page.waitForFunction(() => !!customElements.get('hit-counter'));
    counter = page.locator('hit-counter#playwright-component');
    await expect(counter).toBeVisible();
});

test('should say \'no visitors yet\' when no value is set', async ({ page }) => {
  counter = page.locator('hit-counter#playwright-component');
  await expect(counter).toContainText('No visitors yet 🍃');
});

test('renders the value when set', async ({ page }) => {
  counter = page.locator('hit-counter#playwright-component');
  await counter.evaluate(async (el: HTMLElement) => await el.setAttribute('value', '1234'));
  await expect(counter).toContainText('1234');
});


test('should display a minus sign to the hit counter when is-negative is supplied', async ({ page }) => {
  counter = page.locator('hit-counter#playwright-component');

  await counter.evaluate(async (el: HTMLElement) => {
    await el.toggleAttribute('is-negative');
  });
  await expect(counter.locator('slot[name="start"]')).toHaveText('-');
});

test('renders the hit counter when visitor attribute exists with a value ', async ({page}) => {
  counter = page.locator('hit-counter#playwright-component');
  await counter.evaluate(async (el: HTMLElement) => {
    await el.setAttribute('value', '100');
    await el.toggleAttribute('visitors');
  });
  await expect(counter.locator('slot[name="end"]')).toHaveText('visitors');
});

test('renders the hit counter when is-retro is supplied', async () => {
  counter = page.locator('hit-counter#playwright-component');
  await counter.evaluate(async (el: HTMLElement) => await el.toggleAttribute('is-retro'));
  await expect(counter).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});
});