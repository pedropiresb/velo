import 'dotenv/config'
import pg from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { Database } from './schema'

const { Pool } = pg

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  }),
})

export const db = new Kysely<Database>({
  dialect,
})

export async function closeDatabase() {
  await db.destroy()
}
