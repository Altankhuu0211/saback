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
exports.students = exports.studentsMethods = exports.studentsPath = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const authentication_1 = require("@feathersjs/authentication");
const schema_1 = require("@feathersjs/schema");
const students_schema_1 = require("./students.schema");
const students_class_1 = require("./students.class");
exports.studentsPath = 'students';
exports.studentsMethods = ['find', 'get', 'create', 'patch', 'remove'];
__exportStar(require("./students.class"), exports);
__exportStar(require("./students.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const students = (app) => {
    // Register our service on the Feathers application
    app.use(exports.studentsPath, new students_class_1.StudentsService((0, students_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: exports.studentsMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(exports.studentsPath).hooks({
        around: {
            all: [
                (0, authentication_1.authenticate)('jwt'),
                schema_1.hooks.resolveExternal(students_schema_1.studentsExternalResolver),
                schema_1.hooks.resolveResult(students_schema_1.studentsResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(students_schema_1.studentsQueryValidator),
                schema_1.hooks.resolveQuery(students_schema_1.studentsQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(students_schema_1.studentsDataValidator),
                schema_1.hooks.resolveData(students_schema_1.studentsDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(students_schema_1.studentsPatchValidator),
                schema_1.hooks.resolveData(students_schema_1.studentsPatchResolver)
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
exports.students = students;
//# sourceMappingURL=students.js.map