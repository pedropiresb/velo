import { db } from './database'
import { Insertable } from 'kysely'
import { OrderTable } from './schema'
import { OrderDetails } from '../actions/orderLookupActions'
import crypto from 'crypto'

export function normalizeValue(text: string) {
  if (!text) return '';
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '');
}

//export type NewOrder = Insertable<OrderTable>

export async function insertOrder(order: OrderDetails) {
  const data: OrderTable = {

    id: crypto.randomUUID(),
    order_number: order.number,
    color: order.color.toLocaleLowerCase().replace(/\s+/g, '-'),
    wheel_type: order.wheels.toLocaleLowerCase().replace("wheels", "").trim(),
    customer_name: order.customer.name,
    customer_email: order.customer.email,
    customer_phone: order.customer.phone,
    customer_cpf: order.customer.document,
    payment_method: normalizeValue(order.payment),
    total_price: order.totalPrice,
    status: order.status,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    optionals: [],
  }

  await db.insertInto('orders').values(data).execute()
}

export async function deleteOrderByNumber(orderNumber: string) {
  await db.deleteFrom('orders').where('order_number', '=', orderNumber).execute()
}

export async function deleteOrderByEmail(email: string) {
  return db.deleteFrom('orders')
    .where('customer_email', '=', email)
    .execute()
}

export async function deleteOrdersByNumbers(orderNumbers: string[]) {
  return db.deleteFrom('orders')
    .where('order_number', 'in', orderNumbers)
    .execute()
}
