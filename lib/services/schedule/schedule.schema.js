"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleQueryResolver = exports.scheduleQueryValidator = exports.scheduleQuerySchema = exports.scheduleQueryProperties = exports.schedulePatchResolver = exports.schedulePatchValidator = exports.schedulePatchSchema = exports.scheduleDataResolver = exports.scheduleDataValidator = exports.scheduleDataSchema = exports.scheduleExternalResolver = exports.scheduleResolver = exports.scheduleValidator = exports.scheduleSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.scheduleSchema = typebox_1.Type.Object({
    id: typebox_1.Type.Number(),
    lesson_id: typebox_1.Type.String(),
    class_id: typebox_1.Type.String(),
    class_type: typebox_1.Type.String(),
    weekday: typebox_1.Type.String(),
    part_time: typebox_1.Type.String()
}, { $id: 'Schedule', additionalProperties: false });
exports.scheduleValidator = (0, typebox_1.getValidator)(exports.scheduleSchema, validators_1.dataValidator);
exports.scheduleResolver = (0, schema_1.resolve)({});
exports.scheduleExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.scheduleDataSchema = typebox_1.Type.Pick(exports.scheduleSchema, ['lesson_id', 'class_id', 'class_type', 'weekday', 'part_time'], {
    $id: 'ScheduleData'
});
exports.scheduleDataValidator = (0, typebox_1.getValidator)(exports.scheduleDataSchema, validators_1.dataValidator);
exports.scheduleDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.schedulePatchSchema = typebox_1.Type.Partial(exports.scheduleSchema, {
    $id: 'SchedulePatch'
});
exports.schedulePatchValidator = (0, typebox_1.getValidator)(exports.schedulePatchSchema, validators_1.dataValidator);
exports.schedulePatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.scheduleQueryProperties = typebox_1.Type.Pick(exports.scheduleSchema, [
    'id',
    'lesson_id',
    'class_id',
    'class_type',
    'weekday',
    'part_time'
]);
exports.scheduleQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.scheduleQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.scheduleQueryValidator = (0, typebox_1.getValidator)(exports.scheduleQuerySchema, validators_1.queryValidator);
exports.scheduleQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=schedule.schema.js.map