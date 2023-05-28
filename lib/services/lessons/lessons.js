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
exports.lessons = exports.lessonsMethods = exports.lessonsPath = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const authentication_1 = require("@feathersjs/authentication");
const schema_1 = require("@feathersjs/schema");
const lessons_schema_1 = require("./lessons.schema");
const lessons_class_1 = require("./lessons.class");
exports.lessonsPath = 'lessons';
exports.lessonsMethods = ['find', 'get', 'create', 'patch', 'remove'];
__exportStar(require("./lessons.class"), exports);
__exportStar(require("./lessons.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const lessons = (app) => {
    // Register our service on the Feathers application
    app.use(exports.lessonsPath, new lessons_class_1.LessonsService((0, lessons_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: exports.lessonsMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(exports.lessonsPath).hooks({
        around: {
            all: [
                (0, authentication_1.authenticate)('jwt'),
                schema_1.hooks.resolveExternal(lessons_schema_1.lessonsExternalResolver),
                schema_1.hooks.resolveResult(lessons_schema_1.lessonsResolver)
            ]
        },
        before: {
            all: [schema_1.hooks.validateQuery(lessons_schema_1.lessonsQueryValidator), schema_1.hooks.resolveQuery(lessons_schema_1.lessonsQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(lessons_schema_1.lessonsDataValidator), schema_1.hooks.resolveData(lessons_schema_1.lessonsDataResolver)],
            patch: [schema_1.hooks.validateData(lessons_schema_1.lessonsPatchValidator), schema_1.hooks.resolveData(lessons_schema_1.lessonsPatchResolver)],
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
exports.lessons = lessons;
//# sourceMappingURL=lessons.js.map