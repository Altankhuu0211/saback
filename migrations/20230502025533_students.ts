// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('students', (table) => {
    table.increments('id').primary()
    table.string('student_id')
    table.foreign('student_id').references('users.id')
    table.integer('schedule_id')
    table.foreign('schedule_id').references('schedule.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('students')
}
