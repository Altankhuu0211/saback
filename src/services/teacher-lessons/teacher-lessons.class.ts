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
    const user = await db('users').where({ id })

    if (!user) {
      return { data: [] }
    }
    const lessons = await db
      .select('subject_id', 'name')
      .from('lessons')
      .where({ teacher_id: id })
      .rightJoin('subject', 'lessons.subject_id', 'subject.id')
      .then((res) => {
        return res
      })
    if (!lessons) {
      return { data: [] }
    }
    const promises = lessons.map((les) => {
      return db
        .select('*')
        .from('schedule')
        .where({ teacher_id: id })
        .rightJoin('lessons', 'schedule.lesson_id', 'lessons.id')
        .rightJoin('subject', 'subject.id', 'lessons.subject_id')
        .where({ subject_id: les.subject_id })
        .then((res) => {
          return res
        })
    })
    const data = await Promise.all(promises)

    var unitData: any = []
    data.map((uni) => {
      var lec: any = []
      var lab: any = []
      var sem: any = []
      uni.map((obj: any) => {
        if (obj.class_type == 'Лекц') {
          lec = [...lec, `${obj.weekday}-${obj.part_time}`]
        } else if (obj.class_type == 'Лаборатор') {
          lab = [...lab, `${obj.weekday}-${obj.part_time}`]
        } else if (obj.class_type == 'Семинар') {
          sem = [...sem, `${obj.weekday}-${obj.part_time}`]
        }
      })
      unitData = [
        ...unitData,
        { id: uni[0].subject_id, name: uni[0].name, lecture: lec, laborator: lab, seminar: sem }
      ]
    })
    return { data: unitData }
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
