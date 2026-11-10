import { Page, expect } from '@playwright/test';

export function createCheckoutActions(page: Page) {
  // Locators
  const heading = page.getByRole('heading', { name: 'Finalizar Pedido' });
  const summaryTotalPrice = page.getByTestId('summary-total-price');
  const submitButton = page.getByTestId('checkout-submit');

  return {
    async validatePageLoad() {
      await expect(page).toHaveURL(/.*\/order/);
      await expect(heading).toBeVisible();
    },

    async validateSummaryPrice(price: string) {
      await expect(summaryTotalPrice).toBeVisible();
      await expect(summaryTotalPrice).toHaveText(price);
    },
  };
}

