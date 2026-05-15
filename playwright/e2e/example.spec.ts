import { test, expect } from '@playwright/test'

test('web application is online', async ({ page }) => {
  await page.goto('http://localhost:5173')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Velô by Papito/)
})

