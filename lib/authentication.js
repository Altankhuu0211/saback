"use strict";
// // For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
// import { AuthenticationService, JWTStrategy } from '@feathersjs/authentication'
// import { LocalStrategy } from '@feathersjs/authentication-local'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
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
const authentication_1 = require("@feathersjs/authentication");
const lib_1 = require("@feathersjs/errors/lib");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authentication = (app) => {
    const authentication = new authentication_1.AuthenticationService(app);
    class AbleJWTStrategy extends authentication_1.JWTStrategy {
        async getEntity(id, params) {
            if (this.entityService === null) {
                throw new lib_1.NotAuthenticated('Could not find entity service');
            }
        }
        async authenticate(authentication, params) {
            let { accessToken } = authentication;
            if (!accessToken && params.headers)
                accessToken = params.headers.authorization.split(' ')[1];
            if (!accessToken)
                throw new lib_1.NotAuthenticated('No access token');
            const aload = jsonwebtoken_1.default.decode(accessToken);
            if (!aload.id)
                throw new lib_1.NotAuthenticated('Invalid token');
            const result = { accessToken, authentication: { strategy: 'jwt', accessToken, payload: [] } };
            const value = await app
                .get('postgresqlClient')('users')
                .select('id', 'password')
                .where('id', aload.id);
            return Object.assign(Object.assign({}, result), { entity: value[0] });
        }
    }
    authentication.register('jwt', new AbleJWTStrategy());
    app.use('authentication', authentication);
};
exports.authentication = authentication;
//# sourceMappingURL=authentication.js.map