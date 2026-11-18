import { test } from '../support/fixtures'

test.describe('Checkout', () => {
  test.beforeEach(async ({ app }) => {
    await app.checkout.open()
  })

  test('CT08 - Checkout: Mandatory Fields Empty Validation', async ({ app, page }) => {
    await app.checkout.submitOrder()

    await app.checkout.validateErrorMessage('Nome deve ter pelo menos 2 caracteres')
    await app.checkout.validateErrorMessage('Sobrenome deve ter pelo menos 2 caracteres')
    await app.checkout.validateErrorMessage('Email inválido')
    await app.checkout.validateErrorMessage('Telefone inválido')
    await app.checkout.validateErrorMessage('CPF inválido')
    await app.checkout.validateErrorMessage('Selecione uma loja')
    await app.checkout.validateErrorMessage('Aceite os termos')
  })

  test('CT09 - Checkout: Invalid Email Format Validation', async ({ app }) => {
    await app.checkout.fillEmailField('pedro')
    await app.checkout.submitOrder()

    await app.checkout.validateErrorMessage('Email inválido')
  })

  test('CT09 - Checkout: Incomplete CPF Validation', async ({ app }) => {
    await app.checkout.fillCpfField('1234')
    await app.checkout.submitOrder()

    await app.checkout.validateErrorMessage('CPF inválido')
  })

  test('CT09 - Checkout: Terms Acceptance Required Validation', async ({ app }) => {
    await app.checkout.fillPersonalData({
      name: 'pedro',
      surname: 'pires',
      email: 'pedro@email.com',
      phone: '81123456789',
      cpf: '12380629420'
    })
    await app.checkout.fillStoreField('Velô Paulista - Av. Paulista')
    await app.checkout.submitOrder()

    await app.checkout.validateErrorMessage('Aceite os termos')
  })
})

