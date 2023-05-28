// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './teacher-lessons.class'
import { authenticate } from '@feathersjs/authentication'

export const teacherLessons = (app: Application) => {
  const path: any = '/teacher-lessons'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
    around: {
      all: [authenticate('jwt')]
    }
  })
}
