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
    const weekday = ['1', '2', '3', '4', '5']
    const part_time = ['1', '2', '3', '4', '5', '6', '7', '8']
    const id = params.query.teacher_id
    const user = await db('users').where({ id }).first()
    if (!user) {
      return { data: [] }
    }
    const lessons = await db('lessons').where({ teacher_id: id })
    if (!lessons || lessons.length === 0) {
      return { data: [] }
    }
    const promises = lessons.map((les) => {
      return db
        .select('*')
        .from('schedule')
        .where({ lesson_id: les.id })
        .rightJoin('lessons', 'schedule.lesson_id', 'lessons.id')
        .rightJoin('subject', 'lessons.subject_id', 'subject.id')
        .then((res) => {
          return res
        })
    })
    const data = await Promise.all(promises)
    // Flatten the array of arrays
    const flatData = data.flat()

    const result = await Promise.all(
      part_time.map((part) => {
        return Promise.all(
          weekday.map((day) => {
            const filteredData = flatData.filter((data) => {
              return data.weekday === day && data.part_time === part
            })
            if (!filteredData) return null
            return filteredData[0]
          })
        )
      })
    )
    return { data: result }
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
