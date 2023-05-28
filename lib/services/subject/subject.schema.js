"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subjectQueryResolver = exports.subjectQueryValidator = exports.subjectQuerySchema = exports.subjectQueryProperties = exports.subjectPatchResolver = exports.subjectPatchValidator = exports.subjectPatchSchema = exports.subjectDataResolver = exports.subjectDataValidator = exports.subjectDataSchema = exports.subjectExternalResolver = exports.subjectResolver = exports.subjectValidator = exports.subjectSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.subjectSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    name: typebox_1.Type.String()
}, { $id: 'Subject', additionalProperties: false });
exports.subjectValidator = (0, typebox_1.getValidator)(exports.subjectSchema, validators_1.dataValidator);
exports.subjectResolver = (0, schema_1.resolve)({});
exports.subjectExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.subjectDataSchema = typebox_1.Type.Pick(exports.subjectSchema, ['name'], {
    $id: 'SubjectData'
});
exports.subjectDataValidator = (0, typebox_1.getValidator)(exports.subjectDataSchema, validators_1.dataValidator);
exports.subjectDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.subjectPatchSchema = typebox_1.Type.Partial(exports.subjectSchema, {
    $id: 'SubjectPatch'
});
exports.subjectPatchValidator = (0, typebox_1.getValidator)(exports.subjectPatchSchema, validators_1.dataValidator);
exports.subjectPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.subjectQueryProperties = typebox_1.Type.Pick(exports.subjectSchema, ['id', 'name']);
exports.subjectQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.subjectQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.subjectQueryValidator = (0, typebox_1.getValidator)(exports.subjectQuerySchema, validators_1.queryValidator);
exports.subjectQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=subject.schema.js.map