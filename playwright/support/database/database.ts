import 'dotenv/config'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

const { Pool } = pg

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  })
})

export const db = new Kysely<Database>({
  dialect,
})




// ---------- Helper functions for tests ----------

export type NewOrder = {
  order_number: string
  color: string
  wheel_type: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_cpf: string
  payment_method: string
  total_price: number
  status: string
  optionals?: string[]
}

export async function insertOrder(order: NewOrder) {
  return db.insertInto('orders')
    .values({
      ...order,
      optionals: order.optionals ?? [],
    })
    .returningAll()
    .executeTakeFirstOrThrow()
}

export async function deleteOrderByNumber(orderNumber: string) {
  return db.deleteFrom('orders')
    .where('order_number', '=', orderNumber)
    .execute()
}

export async function deleteOrdersByNumbers(orderNumbers: string[]) {
  return db.deleteFrom('orders')
    .where('order_number', 'in', orderNumbers)
    .execute()
}

export async function closeDatabase() {
  await db.destroy()
}