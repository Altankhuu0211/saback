"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attendanceQueryResolver = exports.attendanceQueryValidator = exports.attendanceQuerySchema = exports.attendanceQueryProperties = exports.attendancePatchResolver = exports.attendancePatchValidator = exports.attendancePatchSchema = exports.attendanceDataResolver = exports.attendanceDataValidator = exports.attendanceDataSchema = exports.attendanceExternalResolver = exports.attendanceResolver = exports.attendanceValidator = exports.attendanceSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.attendanceSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    student_sch_id: typebox_1.Type.Number(),
    semester_week: typebox_1.Type.String(),
    status: typebox_1.Type.String(),
    arrival_time: typebox_1.Type.String()
}, { $id: 'Attendance', additionalProperties: false });
exports.attendanceValidator = (0, typebox_1.getValidator)(exports.attendanceSchema, validators_1.dataValidator);
exports.attendanceResolver = (0, schema_1.resolve)({});
exports.attendanceExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.attendanceDataSchema = typebox_1.Type.Pick(exports.attendanceSchema, ['student_sch_id', 'semester_week', 'status', 'arrival_time'], {
    $id: 'AttendanceData'
});
exports.attendanceDataValidator = (0, typebox_1.getValidator)(exports.attendanceDataSchema, validators_1.dataValidator);
exports.attendanceDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.attendancePatchSchema = typebox_1.Type.Partial(exports.attendanceSchema, {
    $id: 'AttendancePatch'
});
exports.attendancePatchValidator = (0, typebox_1.getValidator)(exports.attendancePatchSchema, validators_1.dataValidator);
exports.attendancePatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.attendanceQueryProperties = typebox_1.Type.Pick(exports.attendanceSchema, [
    'id',
    'student_sch_id',
    'semester_week',
    'status',
    'arrival_time'
]);
exports.attendanceQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.attendanceQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.attendanceQueryValidator = (0, typebox_1.getValidator)(exports.attendanceQuerySchema, validators_1.queryValidator);
exports.attendanceQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=attendance.schema.js.map