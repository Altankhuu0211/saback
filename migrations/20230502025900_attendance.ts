// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('attendance', (table) => {
    table.increments('id').primary()
    table.integer('student_sch_id')
    table.foreign('student_sch_id').references('students.id')
    table.string('semester_week')
    table.string('status')
    table.string('arrival_time')
    // table.timestamp('updated_at')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('attendance')
}
