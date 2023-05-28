"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherSchedule = void 0;
const teacher_schedule_class_1 = require("./teacher-schedule.class");
const authentication_1 = require("@feathersjs/authentication");
const teacherSchedule = (app) => {
    const path = '/teacher-schedule';
    app.use(path, new teacher_schedule_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.teacherSchedule = teacherSchedule;
//# sourceMappingURL=teacher-schedule.js.map