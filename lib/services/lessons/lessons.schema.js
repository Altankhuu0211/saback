"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lessonsQueryResolver = exports.lessonsQueryValidator = exports.lessonsQuerySchema = exports.lessonsQueryProperties = exports.lessonsPatchResolver = exports.lessonsPatchValidator = exports.lessonsPatchSchema = exports.lessonsDataResolver = exports.lessonsDataValidator = exports.lessonsDataSchema = exports.lessonsExternalResolver = exports.lessonsResolver = exports.lessonsValidator = exports.lessonsSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.lessonsSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    teacher_id: typebox_1.Type.String(),
    subject_id: typebox_1.Type.String(),
    year: typebox_1.Type.String(),
    semester: typebox_1.Type.String()
}, { $id: 'Lessons', additionalProperties: false });
exports.lessonsValidator = (0, typebox_1.getValidator)(exports.lessonsSchema, validators_1.dataValidator);
exports.lessonsResolver = (0, schema_1.resolve)({});
exports.lessonsExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.lessonsDataSchema = typebox_1.Type.Pick(exports.lessonsSchema, ['teacher_id', 'subject_id', 'year', 'semester'], {
    $id: 'LessonsData'
});
exports.lessonsDataValidator = (0, typebox_1.getValidator)(exports.lessonsDataSchema, validators_1.dataValidator);
exports.lessonsDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.lessonsPatchSchema = typebox_1.Type.Partial(exports.lessonsSchema, {
    $id: 'LessonsPatch'
});
exports.lessonsPatchValidator = (0, typebox_1.getValidator)(exports.lessonsPatchSchema, validators_1.dataValidator);
exports.lessonsPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.lessonsQueryProperties = typebox_1.Type.Pick(exports.lessonsSchema, [
    'id',
    'teacher_id',
    'subject_id',
    'year',
    'semester'
]);
exports.lessonsQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.lessonsQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.lessonsQueryValidator = (0, typebox_1.getValidator)(exports.lessonsQuerySchema, validators_1.queryValidator);
exports.lessonsQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=lessons.schema.js.map