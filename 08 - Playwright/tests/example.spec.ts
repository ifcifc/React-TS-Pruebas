import { test, expect } from '@playwright/test';

//Comprueba que exista el elemento root
test('has root', async ({ page }) => {
  await page.goto('http://localhost:5555/');

  await expect(page.locator("#root")).toBeVisible();
});

//Comprueba que haya el numero correcto de elementos
test('has Tests elements', async ({ page }) => {
  await page.goto('http://localhost:5555/');

  await expect((await page.$$(".ts-container")).length).toBe(100);
});

//Comprueba que ningun elemento tenga el color por defecto tando de fondo como en texto
test('has Test element color', async ({ page }) => {
  await page.goto('http://localhost:5555/');

  const elements = await page.$$('.ts-container');
  for (const element of elements) {
    const backgroundColor = await element.evaluate(el => getComputedStyle(el).backgroundColor);
    const color = await element.evaluate(el => getComputedStyle(el).color);

    expect(backgroundColor).not.toBe('rgb(48, 153, 209)');
    expect(color).not.toBe('rgb(48, 153, 209)');
  }
});

//Comprueba que los elemento tengan el texto que corresponde
test('has Test text', async ({ page }) => {
  await page.goto('http://localhost:5555/');

  const elements = await page.$$('.ts-container');
  for (const element of elements) {
    const text = await element.textContent();
    expect(text).toMatch(/test_\d+/);
  }
});