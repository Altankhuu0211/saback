// custom-service.class.ts
import { ServiceMethods } from '@feathersjs/feathers'
import { feathers } from '@feathersjs/feathers'
import rest from '@feathersjs/rest-client'
import axios from 'axios'

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
    const myapp = feathers()

    const restClient = rest('http://172.17.0.3:3030')

    myapp.configure(restClient.axios(axios))

    async function getData(skip: number) {
      const result = await myapp.service('/schedule').find({
        query: {
          $limit: 50,
          $skip: skip
        }
      })
      return result
    }

    async function setAttendance() {
      const weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
      const students = await db.select('*').from('students')

      const attendancePromises = students.map(async (stud) => {
        const attendancePromisesPerWeek = weeks.map(async (week) => {
          const [attendanceId] = await db('attendance')
            .insert({
              student_sch_id: stud.id,
              semester_week: week,
              status: 0
            })
            .returning('id')
          return attendanceId
        })

        const attendanceIds = await Promise.all(attendancePromisesPerWeek)
        return attendanceIds
      })

      return Promise.all(attendancePromises)
    }

    ;(async () => {
      var skip = 0
      while (skip < 450) {
        try {
          const result = await getData(skip)
          for (const obj of result.data) {
            var scheduleId = 0
            var lesId = 0
            const student = await db('users').where({ id: obj.StudentCode })
            const subject = await db('subject').where({ id: obj.LessonCode })
            const classroom = await db('classroom').where({ id: obj.LessonRoom })
            const lessons = await db('lessons').where({
              teacher_id: obj.TeacherCode,
              subject_id: obj.LessonCode,
              year: obj.YearCode,
              semester: obj.SemisterName
            })
            if (student.length === 0) {
              await db('users').insert({
                id: obj.StudentCode,
                fullname: obj.StudentFullName,
                permission: 'student'
              })
            }
            if (subject.length === 0) {
              await db('subject').insert({
                id: obj.LessonCode,
                name: obj.LessonName
              })
            }
            if (classroom.length === 0) {
              await db('classroom').insert({
                id: obj.LessonRoom
              })
            }
            if (lessons.length === 0) {
              const [lesIds] = await db('lessons')
                .insert({
                  teacher_id: obj.TeacherCode,
                  subject_id: obj.LessonCode,
                  year: obj.YearCode,
                  semester: obj.SemisterName
                })
                .returning('id')
              lesId = lesIds.id
              const [scheduleIds] = await db('schedule')
                .insert({
                  lesson_id: lesId,
                  class_id: obj.LessonRoom,
                  class_type: obj.LessonType,
                  weekday: obj.LessonDay,
                  part_time: obj.LessonTime
                })
                .returning('id')
              scheduleId = scheduleIds.id
            } else {
              lesId = lessons[0].id
              const schedule = await db('schedule').where({
                lesson_id: lesId,
                class_id: obj.LessonRoom,
                class_type: obj.LessonType,
                weekday: obj.LessonDay,
                part_time: obj.LessonTime
              })
              if (schedule.length == 0) {
                const [scheduleIds] = await db('schedule')
                  .insert({
                    lesson_id: lesId,
                    class_id: obj.LessonRoom,
                    class_type: obj.LessonType,
                    weekday: obj.LessonDay,
                    part_time: obj.LessonTime
                  })
                  .returning('id')
                scheduleId = scheduleIds.id
              } else {
                scheduleId = schedule[0].id
              }
            }

            await db('students').insert({
              schedule_id: scheduleId,
              student_id: obj.StudentCode
            })
          }
          skip += 50
        } catch (error) {
          console.error(error)
          break // Exit the loop on error
        }
      }
      setAttendance().then((data) => {
        console.log(data)
      })
    })()

    return { data: 'success' }
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
