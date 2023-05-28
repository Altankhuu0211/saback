// custom-service.class.ts
import { ServiceMethods } from '@feathersjs/feathers'
import jwt from 'jsonwebtoken'
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
    return { message: `This is a custom get method.` }
  }

  async get(id: any, params?: any) {
    // Implement your own get method here
    return { message: `This is a custom get method for id ${id}` }
  }

  async create(data: any) {
    // Implement your own create method here
    // const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
    const key = 'RfwxPHa5XSBiz8UcFGPkT64g+8HSkjRv'
    const id = data.username
    const password = data.password
    const user = await db('users').select('id', 'fullname', 'permission').where({ id, password })
    if (!user) return { error: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!' }
    const token = jwt.sign({ id: user[0].id, permission: user[0].permission }, key, { expiresIn: '30d' })

    return { result: user[0], token: token, success: true }
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
