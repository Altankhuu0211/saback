// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './backup.class'
import { authenticate } from '@feathersjs/authentication'

export const backup = (app: Application) => {
  const path: any = '/backup'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
    }
  })
}
