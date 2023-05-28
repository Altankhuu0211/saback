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
exports.subject = exports.subjectMethods = exports.subjectPath = void 0;
// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
const authentication_1 = require("@feathersjs/authentication");
const schema_1 = require("@feathersjs/schema");
const subject_schema_1 = require("./subject.schema");
const subject_class_1 = require("./subject.class");
exports.subjectPath = 'subject';
exports.subjectMethods = ['find', 'get', 'create', 'patch', 'remove'];
__exportStar(require("./subject.class"), exports);
__exportStar(require("./subject.schema"), exports);
// A configure function that registers the service and its hooks via `app.configure`
const subject = (app) => {
    // Register our service on the Feathers application
    app.use(exports.subjectPath, new subject_class_1.SubjectService((0, subject_class_1.getOptions)(app)), {
        // A list of all methods this service exposes externally
        methods: exports.subjectMethods,
        // You can add additional custom events to be sent to clients here
        events: []
    });
    // Initialize hooks
    app.service(exports.subjectPath).hooks({
        around: {
            all: [
                (0, authentication_1.authenticate)('jwt'),
                schema_1.hooks.resolveExternal(subject_schema_1.subjectExternalResolver),
                schema_1.hooks.resolveResult(subject_schema_1.subjectResolver)
            ]
        },
        before: {
            all: [schema_1.hooks.validateQuery(subject_schema_1.subjectQueryValidator), schema_1.hooks.resolveQuery(subject_schema_1.subjectQueryResolver)],
            find: [],
            get: [],
            create: [schema_1.hooks.validateData(subject_schema_1.subjectDataValidator), schema_1.hooks.resolveData(subject_schema_1.subjectDataResolver)],
            patch: [schema_1.hooks.validateData(subject_schema_1.subjectPatchValidator), schema_1.hooks.resolveData(subject_schema_1.subjectPatchResolver)],
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
exports.subject = subject;
//# sourceMappingURL=subject.js.map