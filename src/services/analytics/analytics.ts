// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './analytics.class'
import { authenticate } from '@feathersjs/authentication'

export const analytics = (app: Application) => {
  const path: any = '/analytics'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
