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
exports.attendance = exports.attendanceMethods = exports.attendancePath = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const authentication_1 = require("@feathersjs/authentication");
const schema_1 = require("@feathersjs/schema");
const attendance_schema_1 = require("./attendance.schema");
const attendance_class_1 = require("./attendance.class");
exports.attendancePath = 'attendance';
exports.attendanceMethods = ['find', 'get', 'create', 'patch', 'remove'];
__exportStar(require("./attendance.class"), exports);
__exportStar(require("./attendance.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const attendance = (app) => {
    // Register our service on the Feathers application
    app.use(exports.attendancePath, new attendance_class_1.AttendanceService((0, attendance_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: exports.attendanceMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(exports.attendancePath).hooks({
        around: {
            all: [
                (0, authentication_1.authenticate)('jwt'),
                schema_1.hooks.resolveExternal(attendance_schema_1.attendanceExternalResolver),
                schema_1.hooks.resolveResult(attendance_schema_1.attendanceResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(attendance_schema_1.attendanceQueryValidator),
                schema_1.hooks.resolveQuery(attendance_schema_1.attendanceQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(attendance_schema_1.attendanceDataValidator),
                schema_1.hooks.resolveData(attendance_schema_1.attendanceDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(attendance_schema_1.attendancePatchValidator),
                schema_1.hooks.resolveData(attendance_schema_1.attendancePatchResolver)
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
exports.attendance = attendance;
//# sourceMappingURL=attendance.js.map