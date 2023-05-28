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
  getWeeksDiff(endDate: any) {
    var startDate: any = new Date('2023-1-30')
    const msInWeek = 1000 * 60 * 60 * 24 * 7

    return Math.round(Math.abs(endDate - startDate) / msInWeek)
  }

  async find(params: any) {
    var semester_week = this.getWeeksDiff(new Date())
    if (semester_week > 16) semester_week = 16

    return { success: true, data: semester_week }
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
