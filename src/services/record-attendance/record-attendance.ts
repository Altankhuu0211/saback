// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './record-attendance.class'
import { authenticate } from '@feathersjs/authentication'

export const recordAttendance = (app: Application) => {
  const path: any = '/record-attendance'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
