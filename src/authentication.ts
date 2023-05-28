// // For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
// import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
// import { LocalStrategy } from '@feathersjs/authentication-local'

// import type { Application } from './declarations'

// declare module './declarations' {
//   interface ServiceTypes {
//     authentication: AuthenticationService
//   }
// }

// export const authentication = (app: Application) => {
//   const authentication = new AuthenticationService(app)

//   authentication.register('jwt', new JWTStrategy())
//   authentication.register('local', new LocalStrategy())

//   app.use('authentication', authentication)
// }

// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import { AuthenticationRequest, AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
// import { LocalStrategy } from '@feathersjs/authentication-local'

import type { Application } from './declarations'
import { NotAuthenticated } from '@feathersjs/errors/lib'
import { Params, Service } from '@feathersjs/feathers'
import jsonwebtoken, { Secret } from 'jsonwebtoken'
import { postgres } from './constants'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}
interface VerificationResult {
  accessToken: any
  authentication: {
    strategy: string
    accessToken: any
    payload: any
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)
  class AbleJWTStrategy extends JWTStrategy {
    async getEntity(id: string, params: Params): Promise<any> {
      if (this.entityService === null) {
        throw new NotAuthenticated('Could not find entity service')
      }
    }

    async authenticate(authentication: AuthenticationRequest, params: Params): Promise<VerificationResult> {
      let { accessToken } = authentication
      if (!accessToken && params.headers) accessToken = params.headers.authorization.split(' ')[1]

      if (!accessToken) throw new NotAuthenticated('No access token')
      const aload: any = jsonwebtoken.decode(accessToken)

      if (!aload.id) throw new NotAuthenticated('Invalid token')
      const result = { accessToken, authentication: { strategy: 'jwt', accessToken, payload: [] } }
      const value: any = await app
        .get('postgresqlClient')('users')
        .select('id', 'password')
        .where('id', aload.id)
      return Object.assign(Object.assign({}, result), { entity: value[0] })
    }
  }
  authentication.register('jwt', new AbleJWTStrategy())

  app.use('authentication', authentication)
}
