// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import fs from 'fs'
import { DB } from '@/root/prisma/kysely/types'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

if(!process || !process.env || !process.env.DATABASE_URL) {
  throw new Error("Kysely setup error");
}

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString : process.env.DATABASE_URL.replace('sslmode=require&', ''),
    ssl : process.env.DATABASE_CERT ? {
      require : true,
      ca : process.env.DATABASE_CERT
    } : false
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})
