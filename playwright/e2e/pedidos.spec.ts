import { test } from '../support/fixtures/fixtures'

import { generateOrderCode } from '../support/helpers'

import { OrderDetails } from '../support/actions/orderLookupActions'

import { insertOrder, deleteOrderByNumber } from '../support/database/orderRepository'

import orders from '../support/fixtures/orders.json' with { type: 'json' }

/// AAA - Arrange, Act, Assert

test.describe('Consulta de Pedido', () => {

  test.beforeEach(async ({ app }) => {
    // Arrange
    //await app.landing.goTo()
    //await app.navbar.goToOrderLookupPage()
    await app.orderLookup.open()
  })

  test('deve consultar um pedido aprovado', async ({ app }) => {

    const order: OrderDetails = orders.aprovado as OrderDetails

    await deleteOrderByNumber(order.number)

    await insertOrder(order)

    // Act
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido reprovado', async ({ app }) => {

    const order: OrderDetails = orders.reprovado as OrderDetails

    await deleteOrderByNumber(order.number)

    await insertOrder(order)

    // Act
    await app.orderLookup.searchOrder(order.number)

    // Assert
    await app.orderLookup.validateOrderDetails(order)
    await app.orderLookup.validateStatusBadge(order.status)
  })

  test('deve consultar um pedido em analise', async ({ app }) => {

    const order: OrderDetails = orders.emAnalise as OrderDetails

    await deleteOrderByNumber(order.number)

    await insertOrder(order)
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

    await app.orderLookup.validateBtnDisabledWithSpace()
  })
})
