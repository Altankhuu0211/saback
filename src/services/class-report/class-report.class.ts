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
    const teacher_id = params.query.teacher_id
    const subject_id = params.query.subject_id
    const weekday = params.query.week_day
    const part_time = params.query.part_time
    // const user = await db('users').where({ id })

    // if (!user) {
    //   return { data: [] }
    // }
    const lesson = await db
      .select('id')
      .from('lessons')
      .where({ teacher_id, subject_id })
      .then((res) => {
        return res
      })
    if (!lesson) {
      return { data: [] }
    }

    const schedule = await db
      .select('id')
      .from('schedule')
      .where({ lesson_id: lesson[0].id, part_time, weekday })
      .then((res) => {
        return res
      })
    if (!schedule) {
      return { data: [] }
    }

    const students = await db
      .select('students.id', 'student_id', 'fullname')
      .from('students')
      .where({ schedule_id: schedule[0].id })
      .rightJoin('users', 'users.id', 'students.student_id')
      .orderBy('users.id', 'asc')
      .then((res) => {
        return res
      })

    const promises = students.map((stud) => {
      var obj = {
        student_id: stud.student_id,
        fullname: stud.fullname
      }
      return db
        .select('*')
        .from('attendance')
        .where({ student_sch_id: stud.id })
        .orderByRaw('CAST(semester_week AS integer)')
        .then((res) => {
          var count = 0
          res.map((val) => {
            if (val.status == '1') count++
            else if (val.status == '2' || val.status == '3') count = count + 0.5
          })
          return { ...stud, attendance: res, total_attendance: count }
        })
    })
    const attendance = await Promise.all(promises)

    return {
      data: attendance
    }
  }

  async get(id: any, params?: any) {
    // Implement your own get method here
    return { message: `This is a custom get method for id ${id}` }
  }

  async create(data: any, params?: any) {
    // Implement your own create method here
    return { message: 'This is a custom create method' }
  }

  async update(id: any, data: any, params?: any) {
    // Implement your own update method here
    return { message: `This is a custom update method for id ${id}` }
  }

  async patch(id: any, data: any, params?: any) {
    // Implement your own patch method here
    return { message: `This is a custom patch method for id ${id}` }
  }

  async remove(id: any, params?: any) {
    // Implement your own remove method here
    return { message: `This is a custom remove method for id ${id}` }
  }
}
