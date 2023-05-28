"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classReport = void 0;
const class_report_class_1 = require("./class-report.class");
const authentication_1 = require("@feathersjs/authentication");
const classReport = (app) => {
    const path = '/class-report';
    app.use(path, new class_report_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.classReport = classReport;
//# sourceMappingURL=class-report.js.map