import { users } from './users/users'
import { lessons } from './lessons/lessons'
import { attendance } from './attendance/attendance'
import { students } from './students/students'
import { schedule } from './schedule/schedule'
import { subject } from './subject/subject'
import { classroom } from './classroom/classroom'
import { teacherSchedule } from './teacher-schedule/teacher-schedule'
import { teacherLessons } from './teacher-lessons/teacher-lessons'
import { classAttendance } from './class-attendance/class-attendance'
import { classReport } from './class-report/class-report'
import { studentCard } from './student-card/student-card'
import { semesterWeek } from './semester-week/semester-week'
import { recordAttendance } from './record-attendance/record-attendance'
import { login } from './login/login'
import { backup } from './backup/backup'
import { analytics } from './analytics/analytics'

// For more information about this file see https://dove.feathersjs.com/guides/cli/application.html#configure-functions
import type { Application } from '../declarations'

export const services = (app: Application) => {
  app.configure(users)
  app.configure(login)
  app.configure(lessons)
  app.configure(attendance)
  app.configure(students)
  app.configure(schedule)
  app.configure(subject)
  app.configure(classroom)
  app.configure(teacherSchedule)
  app.configure(teacherLessons)
  app.configure(classAttendance)
  app.configure(classReport)
  app.configure(studentCard)
  app.configure(semesterWeek)
  app.configure(recordAttendance)
  app.configure(backup)
  app.configure(analytics)
  // All services will be registered here
}
