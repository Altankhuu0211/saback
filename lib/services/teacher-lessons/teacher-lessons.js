"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.teacherLessons = void 0;
const teacher_lessons_class_1 = require("./teacher-lessons.class");
const authentication_1 = require("@feathersjs/authentication");
const teacherLessons = (app) => {
    const path = '/teacher-lessons';
    app.use(path, new teacher_lessons_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.teacherLessons = teacherLessons;
//# sourceMappingURL=teacher-lessons.js.map