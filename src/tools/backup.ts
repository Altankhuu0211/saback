const feathers = require('@feathersjs/feathers')
const rest = require('@feathersjs/rest-client')
const axios = require('axios')
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: 'postgres://postgres:1234@localhost:5432/sabackend'
})

const myapp = feathers()

const restClient = rest('http://localhost:3030')

myapp.configure(restClient.axios(axios))

// async function setAttendance() {
//   const weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16']
//   const students = await db.select('*').from('students')

//   return students.map(async (stud) => {
//     return weeks.map(async (week) => {
//       const attendance = await db('attendance')
//         .insert({
//           student_sch_id: stud.id,
//           semester_week: week,
//           status: 0
//         })
//         .returning('id')
//       return attendance
//     })
//   })
// }

// setAttendance().then((data) => {
//   console.log(data)
// })

async function getData(skip: number) {
  const result = await myapp.service('/schedule').find({
    query: {
      $limit: 50,
      $skip: skip
    }
  })
  return result
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
})()
