"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = exports.usersMethods = exports.usersPath = void 0;
const schema_1 = require("@feathersjs/schema");
const users_schema_1 = require("./users.schema");
const users_class_1 = require("./users.class");
exports.usersPath = 'users';
exports.usersMethods = ['find', 'get', 'create', 'patch', 'remove'];
__exportStar(require("./users.class"), exports);
__exportStar(require("./users.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const users = (app) => {
    // Register our service on the Feathers application
    app.use(exports.usersPath, new users_class_1.UsersService((0, users_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: exports.usersMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(exports.usersPath).hooks({
        around: {
            all: [
                // authenticate('jwt'),
                schema_1.hooks.resolveExternal(users_schema_1.usersExternalResolver),
                schema_1.hooks.resolveResult(users_schema_1.usersResolver)
            ]
        },
        before: {
            all: [schema_1.hooks.validateQuery(users_schema_1.usersQueryValidator), schema_1.hooks.resolveQuery(users_schema_1.usersQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(users_schema_1.usersDataValidator), schema_1.hooks.resolveData(users_schema_1.usersDataResolver)],
            patch: [schema_1.hooks.validateData(users_schema_1.usersPatchValidator), schema_1.hooks.resolveData(users_schema_1.usersPatchResolver)],
            remove: []
        },
        after: {
            all: []
        },
        error: {
            all: []
        }
    });
};
exports.users = users;
//# sourceMappingURL=users.js.map