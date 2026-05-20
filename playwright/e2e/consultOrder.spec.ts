import { test, expect } from '@playwright/test'
import { generateOrderNumber } from '../support/helpers'

test('Search order', async ({ page }) => {
  //test date

  const order = 'VLO-PSVJPK';
  const orderStatus = 'Aprovado';

  //arrange
  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();
  
  //act

  await expect(page.getByText('Digite o número do seu pedido')).toBeVisible();
  await expect(page.getByTestId('search-order-id')).toBeEmpty();
 
  await page.getByTestId('search-order-id').fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //assert

  const orderCode = page.locator('xpath=//p[text()="Pedido"]/..//p[text()="VLO-PSVJPK"]')
  await expect(orderCode).toBeVisible({timeout: 10000});
  await expect(orderCode).toContainText(order);
  await expect(page.getByText(orderStatus)).toBeVisible();
  
});

test('Order not found', async ({ page }) => {

  const order = generateOrderNumber();

  await page.goto('http://localhost:5173/')
  await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible()
  await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

  await page.getByRole('link', { name: 'Consultar Pedido' }).click();
  await expect(page.getByRole('heading', { name: 'Consultar Pedido' })).toBeVisible();

  await expect(page.getByText('Digite o número do seu pedido')).toBeVisible();
  await expect(page.getByTestId('search-order-id')).toBeEmpty();
 
  await page.getByTestId('search-order-id').fill(order);
  await page.getByRole('button', { name: 'Buscar Pedido' }).click();

  //assert

  const notFound = page.getByRole('heading', { name: 'Pedido não encontrado' })
  await expect(notFound).toBeVisible({timeout: 10000});
  const message = page.locator('p', { hasText: 'Verifique o número do pedido e tente novamente' })
  await expect(message).toBeVisible({timeout: 10000}); 

})
