"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classAttendance = void 0;
const class_attendance_class_1 = require("./class-attendance.class");
const authentication_1 = require("@feathersjs/authentication");
const classAttendance = (app) => {
    const path = '/class-attendance';
    app.use(path, new class_attendance_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.classAttendance = classAttendance;
//# sourceMappingURL=class-attendance.js.map