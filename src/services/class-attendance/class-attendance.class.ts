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
    const id = params.query.teacher_id
    const weekday = params.query.week_day
    const part_time = params.query.part_time
    const semester_week = params.query.semester_week
    // const user = await db('users').where({ id })

    // if (!user) {
    //   return { data: [] }
    // }
    const schedule = await db
      .select('schedule.id')
      .from('schedule')
      .where({ part_time, weekday })
      .rightJoin('lessons', 'lessons.id', 'schedule.lesson_id')
      .where({ teacher_id: id })
      .then((res) => {
        return res
      })
    if (!schedule) {
      return { data: [] }
    }

    const attendance = await db
      .select('student_id', 'fullname', 'semester_week', 'status', 'arrival_time')
      .from('students')
      .where({ schedule_id: schedule[0].id })
      .innerJoin('attendance', 'students.id', 'attendance.student_sch_id')
      .where({ semester_week: semester_week })
      .rightJoin('users', 'users.id', 'students.student_id')
      .orderBy('users.id', 'asc')
      .then((res) => {
        return res
      })

    var total_absent = 0
    var total_free = 0
    var total_present = 0
    var total_sick = 0

    attendance.map((att) => {
      if (att.status == 1) {
        total_present++
      }
      if (att.status == 2) {
        total_free++
      }
      if (att.status == 3) {
        total_sick++
      }
    })
    total_absent = attendance.length - total_free - total_sick - total_present
    // const data = await Promise.all(promises)

    return {
      data: {
        attendance,
        total_absent,
        total_free,
        total_present,
        total_sick,
        total_students: attendance.length
      }
    }
  }

  async get(id: any, params?: any) {
    // Implement your own get method here
    return { message: `This is a custom get method for id ${id}` }
  }

  async create(data: any) {
    // Implement your own create method here
    const teacher_id = data.teacher_id
    const subject_id = data.subject_id
    const weekday = data.week_day
    const part_time = data.part_time
    const student_id = data.student_id
    const semester_week = data.semester_week
    const status = data.status_updated

    const lessons = await db.select('id').from('lessons').where({ teacher_id, subject_id })

    const schedule = await db
      .select('id')
      .from('schedule')
      .where({ lesson_id: lessons[0].id, weekday, part_time })

    const student = await db
      .select('id')
      .from('students')
      .where({ schedule_id: schedule[0].id, student_id: student_id })

    const attendance = await db('attendance').where({ student_sch_id: student[0].id, semester_week }).update({
      status
    })
    return { data: attendance }
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
