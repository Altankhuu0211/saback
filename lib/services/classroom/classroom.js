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
exports.classroom = exports.classroomMethods = exports.classroomPath = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const authentication_1 = require("@feathersjs/authentication");
const schema_1 = require("@feathersjs/schema");
const classroom_schema_1 = require("./classroom.schema");
const classroom_class_1 = require("./classroom.class");
exports.classroomPath = 'classroom';
exports.classroomMethods = ['find', 'get', 'create', 'patch', 'remove'];
__exportStar(require("./classroom.class"), exports);
__exportStar(require("./classroom.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const classroom = (app) => {
    // Register our service on the Feathers application
    app.use(exports.classroomPath, new classroom_class_1.ClassroomService((0, classroom_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: exports.classroomMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(exports.classroomPath).hooks({
        around: {
            all: [
                (0, authentication_1.authenticate)('jwt'),
                schema_1.hooks.resolveExternal(classroom_schema_1.classroomExternalResolver),
                schema_1.hooks.resolveResult(classroom_schema_1.classroomResolver)
            ]
        },
        before: {
            all: [
                schema_1.hooks.validateQuery(classroom_schema_1.classroomQueryValidator),
                schema_1.hooks.resolveQuery(classroom_schema_1.classroomQueryResolver)
            ],
            find: [],
            get: [],
            create: [
                schema_1.hooks.validateData(classroom_schema_1.classroomDataValidator),
                schema_1.hooks.resolveData(classroom_schema_1.classroomDataResolver)
            ],
            patch: [
                schema_1.hooks.validateData(classroom_schema_1.classroomPatchValidator),
                schema_1.hooks.resolveData(classroom_schema_1.classroomPatchResolver)
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
exports.classroom = classroom;
//# sourceMappingURL=classroom.js.map