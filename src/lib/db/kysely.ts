import { DB } from '@/root/prisma/kysely/types'
import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'

const dialect = new PostgresDialect({
  pool: new Pool({
    database: 'postgres',
    host: 'aws-0-us-west-1.pooler.supabase.com',
    user: 'postgres.pwyuqqwvcpqieizmchxa',
    password: 'VerNlAa9IburR1Ag',
    port: 6543,
    max: 10,
  })
})

// Database interface is passed to Kysely's constructor, and from now on, Kysely
// knows your database structure.
// Dialect is passed to Kysely's constructor, and from now on, Kysely knows how
// to communicate with your database.
export const db = new Kysely<DB>({
  dialect,
})
