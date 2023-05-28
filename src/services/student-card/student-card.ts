// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './student-card.class'
import { authenticate } from '@feathersjs/authentication'

export const studentCard = (app: Application) => {
  const path: any = '/student-card'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
