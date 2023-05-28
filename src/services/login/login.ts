// custom-service.service.ts
import { Application } from '../../declarations'
import { CustomService } from './login.class'

export const login = (app: Application) => {
  const path: any = '/login'
  app.use(path, new CustomService())
  const service = app.service(path)

  service.hooks({
    // Implement your own hooks here
  })
}
