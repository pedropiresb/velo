import { test, expect } from '@playwright/test';

test('First Validation', async ({ page }) => {

    //Arrange
    await page.goto('http://localhost:5173/');
    //Checkpoint 1: Verificar se o hero section está visível
    await expect(page.getByTestId('hero-section').getByRole('heading', { name: 'Velô Sprint' })).toBeVisible();

    //Act
    await page.getByRole('link', { name: 'Consultar Pedido' }).click();


    //Checkpoint 2: Verificar se a página de consulta de pedido está visível
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido');

    await page.getByTestId('search-order-id').fill('VLO-LXCG92');
    await page.getByRole('button', { name: 'Buscar Pedido' }).click();
    //Assert
    //await expect(page.getByTestId('order-result-id')).toBeVisible({timeout: 10_000});
    //await expect(page.getByTestId('order-result-id')).toContainText('VLO-LXCG92');
    await expect(page.locator('xpath=//div/p[text()="VLO-LXCG92"]')).toBeVisible();
    //await expect(page.getByTestId('order-result-status')).toBeVisible();
    // await expect(page.getByTestId('order-result-status')).toContainText('APROVADO');
    await expect(page.getByText('APROVADO')).toBeVisible();
});