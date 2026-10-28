import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  //Checkpoint 1: Verificar se o hero section está visível
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible();
  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  //Checkpoint 2: Verificar se a página de consulta de pedido está visível
  await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

  await page.getByTestId('search-order-id').fill('VLO-LXCG92');
  await page.getByTestId('search-order-button').click();

  await expect(page.getByTestId('order-result-id')).toBeVisible();
  await expect(page.getByTestId('order-result-id')).toContainText('VLO-LXCG92');
  await expect(page.getByTestId('order-result-status')).toBeVisible();
  await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
});