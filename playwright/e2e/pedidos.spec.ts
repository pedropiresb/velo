import { test } from '../support/fixtures'

import { generateOrderCode } from '../support/helpers'

import { OrderDetails } from '../support/actions/orderLookupActions'

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    // Arrange
    //await app.landing.goTo()
    //await app.navbar.goToOrderLookupPage()
    await app.orderLookup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-LXCG92',
      status: 'APROVADO',
      color: 'Glacier Blue',
      wheels: 'sport Wheels',
      customer: {
        name: 'Pedro Barreto',
        email: 'pedro@velo.dev'
      },
      payment: 'À Vista'
    }

    // Act
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-PSVJPK',
      status: 'REPROVADO',
      color: 'Midnight Black',
      wheels: 'sport Wheels',
      customer: {
        name: 'Pedro Pires',
        email: 'pedropiresb@email.com'
      },
      payment: 'À Vista'
    }

    // Act
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

    // Test Data
    const order: OrderDetails = {
      number: 'VLO-R4PQOJ',
      status: 'EM_ANALISE',
      color: 'Lunar White',
      wheels: 'aero Wheels',
      customer: {
        name: 'Jose Ricardo',
        email: 'jose@email.com'
      },
      payment: 'À Vista'
    }

    // Act
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve exibir mensagem quando o pedido não é encontrado', async ({ app }) => {

    const order = generateOrderCode()

    await app.orderLookup.searchOrder(order)

    await app.orderLookup.validateOrderNotFound()
  })

  test('deve manter botao desabilitado se campo tiver vazio', async ({ app }) => {



    await app.orderLookup.validateBtnDisabled()

    await app.orderLookup.validateBtnDisabledWithSpace
  })
})
