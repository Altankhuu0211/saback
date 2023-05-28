"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recordAttendance = void 0;
const record_attendance_class_1 = require("./record-attendance.class");
const authentication_1 = require("@feathersjs/authentication");
const recordAttendance = (app) => {
    const path = '/record-attendance';
    app.use(path, new record_attendance_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.recordAttendance = recordAttendance;
//# sourceMappingURL=record-attendance.js.map