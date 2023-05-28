"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentsQueryResolver = exports.studentsQueryValidator = exports.studentsQuerySchema = exports.studentsQueryProperties = exports.studentsPatchResolver = exports.studentsPatchValidator = exports.studentsPatchSchema = exports.studentsDataResolver = exports.studentsDataValidator = exports.studentsDataSchema = exports.studentsExternalResolver = exports.studentsResolver = exports.studentsValidator = exports.studentsSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.studentsSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    student_id: typebox_1.Type.String(),
    schedule_id: typebox_1.Type.String()
}, { $id: 'Students', additionalProperties: false });
exports.studentsValidator = (0, typebox_1.getValidator)(exports.studentsSchema, validators_1.dataValidator);
exports.studentsResolver = (0, schema_1.resolve)({});
exports.studentsExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.studentsDataSchema = typebox_1.Type.Pick(exports.studentsSchema, ['student_id', 'schedule_id'], {
    $id: 'StudentsData'
});
exports.studentsDataValidator = (0, typebox_1.getValidator)(exports.studentsDataSchema, validators_1.dataValidator);
exports.studentsDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.studentsPatchSchema = typebox_1.Type.Partial(exports.studentsSchema, {
    $id: 'StudentsPatch'
});
exports.studentsPatchValidator = (0, typebox_1.getValidator)(exports.studentsPatchSchema, validators_1.dataValidator);
exports.studentsPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.studentsQueryProperties = typebox_1.Type.Pick(exports.studentsSchema, ['id', 'student_id', 'schedule_id']);
exports.studentsQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.studentsQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.studentsQueryValidator = (0, typebox_1.getValidator)(exports.studentsQuerySchema, validators_1.queryValidator);
exports.studentsQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=students.schema.js.map