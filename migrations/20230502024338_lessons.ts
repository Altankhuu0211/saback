// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('lessons', (table) => {
    table.increments('id').primary(), table.string('teacher_id')
    table.foreign('teacher_id').references('users.id')
    table.string('subject_id')
    table.foreign('subject_id').references('subject.id')
    table.string('year')
    table.string('semester')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('lessons')
}
