"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classroomQueryResolver = exports.classroomQueryValidator = exports.classroomQuerySchema = exports.classroomQueryProperties = exports.classroomPatchResolver = exports.classroomPatchValidator = exports.classroomPatchSchema = exports.classroomDataResolver = exports.classroomDataValidator = exports.classroomDataSchema = exports.classroomExternalResolver = exports.classroomResolver = exports.classroomValidator = exports.classroomSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.classroomSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    rfid: typebox_1.Type.String()
}, { $id: 'Classroom', additionalProperties: false });
exports.classroomValidator = (0, typebox_1.getValidator)(exports.classroomSchema, validators_1.dataValidator);
exports.classroomResolver = (0, schema_1.resolve)({});
exports.classroomExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.classroomDataSchema = typebox_1.Type.Pick(exports.classroomSchema, ['rfid'], {
    $id: 'ClassroomData'
});
exports.classroomDataValidator = (0, typebox_1.getValidator)(exports.classroomDataSchema, validators_1.dataValidator);
exports.classroomDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.classroomPatchSchema = typebox_1.Type.Partial(exports.classroomSchema, {
    $id: 'ClassroomPatch'
});
exports.classroomPatchValidator = (0, typebox_1.getValidator)(exports.classroomPatchSchema, validators_1.dataValidator);
exports.classroomPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.classroomQueryProperties = typebox_1.Type.Pick(exports.classroomSchema, ['id', 'rfid']);
exports.classroomQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.classroomQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.classroomQueryValidator = (0, typebox_1.getValidator)(exports.classroomQuerySchema, validators_1.queryValidator);
exports.classroomQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=classroom.schema.js.map