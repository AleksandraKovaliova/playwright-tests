import { test, expect, Page, Locator } from '@playwright/test';
import { text } from 'stream/consumers';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements [] = [
  {
    locator : (page: Page) : Locator => 
      page.getByRole('link', { name: 'Playwright logo Playwright' }), 
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator : (page: Page) : Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs', 
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator : (page: Page) : Locator => page.getByRole('link', { name: 'API', exact: true }),
    name: 'API link', 
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator : (page: Page) : Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator : (page: Page) : Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    }, 
  },
  {
    locator : (page: Page) : Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository link',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
  },
  },
  {
    locator : (page: Page) : Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server link',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator : (page: Page) : Locator => page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Theme switch button', 
  },
  {
    locator : (page: Page) : Locator => page.getByRole('button', { name: 'Search (Command+K)' }),
    name: 'Search input',
  },
];

test.describe('Тесты для главной страницы playwright.dev', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
test('Проверка отображения элементов навигации хедера', async ({ page }) => {
  elements.forEach(({locator, name}) => {
    test.step(`Проверка отображения элемента ${name}`, async () => {
  await expect.soft(locator(page)).toBeVisible();
  });
  })
});
test('Проверка названия элементов навигации хедера', async ({ page }) => {
  elements.forEach(({locator, name, text}) => {
    if (text) {
      test.step(`Проверка названия элемента ${name}`, async () => {
      await expect.soft(locator(page)).toContainText(text);
    });
    }
  }); 
});


test('Проверка атрибутов href элементов навигации хедера', async ({ page }) => {
  elements.forEach(({locator, name, attribute}) => {
    if (attribute) {
      test.step(`Проверка аттрибутов href элемента ${name}`, async () => {
      await expect.soft(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
    });
    }
  });
});

test('Проверка переключения лайт мода', async ({ page }) => {
  await page.getByRole('button', { name: 'Switch between dark and light' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});

test('Проверка заголовка страницы', async ({ page }) => {
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
  await expect.soft(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
    'Playwright enables reliable end-to-end testing for modern web apps.');
});


test('Проверка кнопки Get started', async ({ page }) => {
await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
await expect.soft(page.getByRole('link', { name: 'Get started' })).toHaveAttribute('href', '/docs/intro');
});

});
