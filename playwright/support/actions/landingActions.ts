import { Page, expect } from '@playwright/test'

export function createLandingActions(page: Page) {
  return {
    async goTo() {
      await page.goto('http://localhost:5173/')
      const heading = page.getByTestId('hero-section').getByRole('heading')
      await expect(heading).toContainText('Velô Sprint')
    },
  }
}
