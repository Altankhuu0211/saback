// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './class-report.class'
import { authenticate } from '@feathersjs/authentication'

export const classReport = (app: Application) => {
  const path: any = '/class-report'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
