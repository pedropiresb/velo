import { Page, expect } from '@playwright/test'

export function createCheckoutActions(page: Page) {
  // Locators
  const heading = page.getByRole('heading', { name: 'Finalizar Pedido' })
  const summaryTotalPrice = page.getByTestId('summary-total-price')
  const submitButton = page.getByTestId('checkout-submit')
  const successStatus = page.getByTestId('success-status')
  const orderId = page.getByTestId('order-id')

  return {

    async open() {
      await page.goto('http://localhost:5173/order')
      await expect(heading).toBeVisible()
    },

    async validatePageLoad() {
      await expect(page).toHaveURL(/.*\/order/)
      await expect(heading).toBeVisible()
    },

    async validateSummaryPrice(price: string) {
      await expect(summaryTotalPrice).toBeVisible()
      await expect(summaryTotalPrice).toHaveText(price)
    },

    async validateErrorMessage(message: string) {
      await expect(page.locator('p.text-destructive').getByText(message, { exact: true })).toBeVisible()
    },

    async fillPersonalData(data: {
      name: string
      surname?: string
      lastname?: string
      email: string
      phone: string
      cpf: string
    }) {
      await page.getByTestId('checkout-name').fill(data.name)
      const lastNameLocator = page.locator('[data-testid="checkout-lastname"], [data-testid="checkout-surname"]')
      await lastNameLocator.fill(data.lastname || data.surname || '')
      await page.getByTestId('checkout-email').fill(data.email)
      await page.getByTestId('checkout-phone').fill(data.phone)
      await page.getByTestId('checkout-cpf').fill(data.cpf)
    },

    async fillEmailField(email: string) {
      await page.locator('[data-testid="checkout-email"]').fill(email)
    },

    async fillCpfField(cpf: string) {
      await page.locator('[data-testid="checkout-cpf"]').fill(cpf)
    },

    async fillNameField(name: string) {
      await page.locator('[data-testid="checkout-name"]').fill(name)
    },
    async fillSecondNameField(secondName: string) {
      await page.locator('[id="lastname"], [id="surname"]').fill(secondName)
    },
    async fillLastNameField(lastName: string) {
      await page.locator('[data-testid="checkout-lastname"]').fill(lastName)
    },
    async fillPhoneField(phone: string) {
      await page.locator('[data-testid="checkout-phone"]').fill(phone)
    },
    async fillStoreField(store: string) {
      // await page.locator('#store').selectOption({ label: store })
      await page.locator('#store').click()
      await page.getByRole('option', { name: store }).click()
    },

    async acceptTerms() {
      await page.getByTestId('checkout-terms').check()
    },

    async selectPaymentMethod(method: 'avista' | 'financiamento') {
      await page.getByTestId(`payment-${method}`).click()
    },

    async submitOrder() {
      await submitButton.click()
    },

    async validateOrderResult(text: string) {
      await expect(page).toHaveURL(/.*\/success/)
      await expect(successStatus).toHaveText(text)
      await expect(orderId).toHaveText(/^VLO-[A-Z0-9]{6}$/)
    },

    async fillEntry(entry: string) {
      await page.getByTestId('input-entry-value').fill(entry)
    },





  }
}

