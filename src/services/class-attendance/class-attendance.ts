// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './class-attendance.class'
import { authenticate } from '@feathersjs/authentication'

export const classAttendance = (app: Application) => {
  const path: any = '/class-attendance'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
