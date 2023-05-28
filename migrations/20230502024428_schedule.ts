// For more information about this file see https://dove.feathersjs.com/guides/cli/knexfile.html
import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('schedule', (table) => {
    table.increments('id').primary()
    table.integer('lesson_id')
    table.foreign('lesson_id').references('lessons.id')
    table.string('class_id')
    table.foreign('class_id').references('classroom.id')
    table.string('class_type')
    table.string('weekday')
    table.string('part_time')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('schedule')
}
