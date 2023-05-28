// custom-service.class.ts
import { ServiceMethods } from '@feathersjs/feathers'

interface Data {}

interface ServiceOptions {}

import knex from 'knex'
import { postgres } from '../../constants'

const db = knex(postgres)

export class CustomService implements ServiceMethods<Data> {
  //   app: Application
  options: ServiceOptions

  constructor(options: ServiceOptions = {}) {
    this.options = options
  }

  async find(params: any) {
    return { message: `This is a custom get method` }
  }

  async get(id: any, params?: any) {
    // Implement your own get method here
    return { message: `This is a custom get method for id ${id}` }
  }

  async create(data: any) {
    // Implement your own create method here
    const teacher_id = data.teacher_id
    const weekday = data.weekday
    const part_time = data.part_time
    const semester_week = data.semester_week
    // const class_id = data.rfid_no
    const attendance = data.attendance
    const time = data.time
    var result = 'success'
    const schedule = await db.select('id').from('schedule').where({ weekday, part_time })

    if (!schedule) return { data: {} }

    attendance.map(async (att: any) => {
      const students = await db.select('id').from('users').where({ card_number: att.chip_number })

      const studs = await db
        .select('id')
        .from('students')
        .where({ schedule_id: schedule[0].id, student_id: students[0].id })
      if (studs) {
        result = await db('attendance').where({ student_sch_id: studs[0].id, semester_week }).update({
          status: '1',
          arrival_time: time
        })
      }
    })

    return { data: result }
  }

  async update(id: any, data: any, params?: any) {
    // Implement your own update method here
    return { message: `This is a custom update method for id ${id}` }
  }

  async patch(params: any) {
    return { message: `This is a custom patch method` }
  }

  async remove(id: any, params?: any) {
    // Implement your own remove method here
    return { message: `This is a custom remove method for id ${id}` }
  }
}
