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
exports.schedule = exports.scheduleMethods = exports.schedulePath = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const authentication_1 = require("@feathersjs/authentication");
const schema_1 = require("@feathersjs/schema");
const schedule_schema_1 = require("./schedule.schema");
const schedule_class_1 = require("./schedule.class");
exports.schedulePath = 'schedule';
exports.scheduleMethods = ['find', 'get', 'create', 'patch', 'remove'];
__exportStar(require("./schedule.class"), exports);
__exportStar(require("./schedule.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const schedule = (app) => {
    // Register our service on the Feathers application
    app.use(exports.schedulePath, new schedule_class_1.ScheduleService((0, schedule_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: exports.scheduleMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(exports.schedulePath).hooks({
        around: {
            all: [
                (0, authentication_1.authenticate)('jwt'),
                schema_1.hooks.resolveExternal(schedule_schema_1.scheduleExternalResolver),
                schema_1.hooks.resolveResult(schedule_schema_1.scheduleResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(schedule_schema_1.scheduleQueryValidator),
                schema_1.hooks.resolveQuery(schedule_schema_1.scheduleQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(schedule_schema_1.scheduleDataValidator),
                schema_1.hooks.resolveData(schedule_schema_1.scheduleDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(schedule_schema_1.schedulePatchValidator),
                schema_1.hooks.resolveData(schedule_schema_1.schedulePatchResolver)
            ],
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
exports.schedule = schedule;
//# sourceMappingURL=schedule.js.map