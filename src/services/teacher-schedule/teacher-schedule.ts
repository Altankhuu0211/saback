// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './teacher-schedule.class'
import { authenticate } from '@feathersjs/authentication'

export const teacherSchedule = (app: Application) => {
  const path: any = '/teacher-schedule'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
