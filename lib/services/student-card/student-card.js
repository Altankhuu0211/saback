"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentCard = void 0;
const student_card_class_1 = require("./student-card.class");
const authentication_1 = require("@feathersjs/authentication");
const studentCard = (app) => {
    const path = '/student-card';
    app.use(path, new student_card_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.studentCard = studentCard;
//# sourceMappingURL=student-card.js.map