import { test } from '../support/fixtures/fixtures'
import { changeScoreMocked } from '../support/fixtures/mock.api'

import { deleteOrderByEmail } from '../support/database/orderRepository'

test.describe('Checkout', () => {
  test.beforeEach(async ({ app }) => {
    await app.checkout.open()
  })

  test('CT07 - Checkout: Successful Cash Order Submission (Happy Path)', async ({ app }) => {
    //test.slow()



    const customer = {
      name: 'Carlos',
      lastname: 'Silva',
      email: 'customer_CT07@example.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      store: 'Velô Paulista - Av. Paulista, 1000',
      paymentMethod: 'avista' as const,
    }
    await deleteOrderByEmail(customer.email)
    await app.checkout.fillPersonalData(customer)
    await app.checkout.fillStoreField(customer.store)
    await app.checkout.selectPaymentMethod(customer.paymentMethod)
    await app.checkout.acceptTerms()
    await app.checkout.submitOrder()

    await app.checkout.validateOrderResult('Pedido Aprovado!')
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

  test('CT12 - Financing: Credit Score > 700 Yields Immediate Approval ', async ({ app, page }) => {
    const customer = {
      name: 'Carlos',
      lastname: 'Augusto',
      email: 'customer_CT12@ample.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-00',
      store: 'Velô Paulista - Av. Paulista, 1000',
      paymentMethod: 'financiamento' as const,
      score: 701
    }
    await deleteOrderByEmail(customer.email)

    await app.mock.creditAnalysis(customer.score)
    await app.checkout.fillPersonalData(customer)
    await app.checkout.fillStoreField(customer.store)
    await app.checkout.selectPaymentMethod(customer.paymentMethod)
    await app.checkout.acceptTerms()
    await app.checkout.submitOrder()

    await app.checkout.validateOrderResult('Pedido Aprovado!')
  })

  test('CT13 - Financing: Credit Score Between 501 and 700 Sets Status to Under Analysis', async ({ app, page }) => {
    test.slow()
    const customer = {
      name: 'Carlos',
      lastname: 'Patricio',
      email: 'customer_CT13@ample.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-01',
      store: 'Velô Paulista - Av. Paulista, 1000',
      paymentMethod: 'financiamento' as const,
      score: 699
    }
    await deleteOrderByEmail(customer.email)

    await app.mock.creditAnalysis(customer.score)
    await app.checkout.fillPersonalData(customer)
    await app.checkout.fillStoreField(customer.store)
    await app.checkout.selectPaymentMethod(customer.paymentMethod)
    await app.checkout.acceptTerms()
    await app.checkout.submitOrder()

    await app.checkout.validateOrderResult('Pedido em Análise!')
  })

  test('CT14 - Financing: Credit Score <= 500 Yields Order Rejection', async ({ app, page }) => {
    test.slow()
    const customer = {
      name: 'Carlos',
      lastname: 'Miguel',
      email: 'customer_CT14@ample.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-02',
      store: 'Velô Paulista - Av. Paulista, 1000',
      paymentMethod: 'financiamento' as const,
    }
    await deleteOrderByEmail(customer.email)

    await app.mock.creditAnalysis(350)
    await app.checkout.fillPersonalData(customer)
    await app.checkout.fillStoreField(customer.store)
    await app.checkout.selectPaymentMethod(customer.paymentMethod)
    await app.checkout.acceptTerms()
    await app.checkout.submitOrder()

    await app.checkout.validateOrderResult('Crédito Reprovado')


  })

  test('CT14 - Financing: Credit Score <= 500 Yields with entry Order Rejection', async ({ app, page }) => {
    test.slow()
    const customer = {
      name: 'Carlos',
      lastname: 'Miguel',
      email: 'customer_CT14@ample.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-02',
      store: 'Velô Paulista - Av. Paulista, 1000',
      paymentMethod: 'financiamento' as const,
      entry: '10000',
      score: 350
    }
    await deleteOrderByEmail(customer.email)

    await app.mock.creditAnalysis(customer.score)
    await app.checkout.fillPersonalData(customer)
    await app.checkout.fillStoreField(customer.store)
    await app.checkout.selectPaymentMethod(customer.paymentMethod)
    await app.checkout.fillEntry(customer.entry)
    await app.checkout.acceptTerms()
    await app.checkout.submitOrder()

    await app.checkout.validateOrderResult('Crédito Reprovado')
  })

  test('CT15 - Financing: Credit Score <= 500 Yields with entry equals to 50% approval', async ({ app, page }) => {
    test.slow()
    const customer = {
      name: 'Carlos',
      lastname: 'Miguel',
      email: 'customer_CT14@ample.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-02',
      store: 'Velô Paulista - Av. Paulista, 1000',
      paymentMethod: 'financiamento' as const,
      entry: '20000',
      score: 350
    }
    await deleteOrderByEmail(customer.email)

    await app.mock.creditAnalysis(customer.score)
    await app.checkout.fillPersonalData(customer)
    await app.checkout.fillStoreField(customer.store)
    await app.checkout.selectPaymentMethod(customer.paymentMethod)
    await app.checkout.fillEntry(customer.entry)
    await app.checkout.acceptTerms()
    await app.checkout.submitOrder()

    await app.checkout.validateOrderResult('Pedido Aprovado!')
  })

  test('CT15 - Financing: Credit Score <= 500 Yields with entry higher than 50% approval', async ({ app, page }) => {
    test.slow()
    const customer = {
      name: 'Carlos',
      lastname: 'Miguel',
      email: 'customer_CT14@ample.com',
      phone: '(11) 98765-4321',
      cpf: '123.456.789-02',
      store: 'Velô Paulista - Av. Paulista, 1000',
      paymentMethod: 'financiamento' as const,
      entry: '30000',
      score: 350
    }
    await deleteOrderByEmail(customer.email)

    await app.mock.creditAnalysis(customer.score)
    await app.checkout.fillPersonalData(customer)
    await app.checkout.fillStoreField(customer.store)
    await app.checkout.selectPaymentMethod(customer.paymentMethod)
    await app.checkout.fillEntry(customer.entry)
    await app.checkout.acceptTerms()
    await app.checkout.submitOrder()

    await app.checkout.validateOrderResult('Pedido Aprovado!')
  })
})

