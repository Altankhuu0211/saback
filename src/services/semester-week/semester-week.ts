// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './semester-week.class'
import { authenticate } from '@feathersjs/authentication'

export const semesterWeek = (app: Application) => {
  const path: any = '/semester-week'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
