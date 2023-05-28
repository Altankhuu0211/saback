"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterWeek = void 0;
const semester_week_class_1 = require("./semester-week.class");
const authentication_1 = require("@feathersjs/authentication");
const semesterWeek = (app) => {
    const path = '/semester-week';
    app.use(path, new semester_week_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.semesterWeek = semesterWeek;
//# sourceMappingURL=semester-week.js.map