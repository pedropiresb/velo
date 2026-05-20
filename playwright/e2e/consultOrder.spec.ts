import { test, expect } from '@playwright/test'

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();
  await expect(page.getByText('Digite o número do seu pedido')).toBeVisible();
  await expect(page.getByTestId('search-order-id')).toBeEmpty();
 
  await page.getByTestId('search-order-id').fill('VLO-PSVJPK');
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();
  await expect(page.locator('xpath=//p[text()="VLO-PSVJPK"]')).toBeVisible();
  await expect(page.getByText('Aprovado')).toBeVisible();
  
  //await expect(page.getByTestId('order-result-id')).toBeVisible();
  //await page.getByTestId('order-result-status').toBeVisible();
  //await expect(page.getByTestId('order-result-id')).toContainText('VLO-PSVJPK');
  //await page.getByTestId('order-result-status').toContainText('Aprovado');

});