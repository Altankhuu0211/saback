// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('classroom', (table) => {
    table.string('id').primary()
    table.string('rfid')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('classroom')
}
