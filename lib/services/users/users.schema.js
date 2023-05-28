"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersQueryResolver = exports.usersQueryValidator = exports.usersQuerySchema = exports.usersQueryProperties = exports.usersPatchResolver = exports.usersPatchValidator = exports.usersPatchSchema = exports.usersDataResolver = exports.usersDataValidator = exports.usersDataSchema = exports.usersExternalResolver = exports.usersResolver = exports.usersValidator = exports.usersSchema = void 0;
// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
const schema_1 = require("@feathersjs/schema");
const typebox_1 = require("@feathersjs/typebox");
const validators_1 = require("../../validators");
// Main data model schema
exports.usersSchema = typebox_1.Type.Object({
    id: typebox_1.Type.String(),
    fullname: typebox_1.Type.String(),
    password: typebox_1.Type.String(),
    permission: typebox_1.Type.String(),
    card_number: typebox_1.Type.Number()
}, { $id: 'Users', additionalProperties: false });
exports.usersValidator = (0, typebox_1.getValidator)(exports.usersSchema, validators_1.dataValidator);
exports.usersResolver = (0, schema_1.resolve)({});
exports.usersExternalResolver = (0, schema_1.resolve)({});
// Schema for creating new entries
exports.usersDataSchema = typebox_1.Type.Pick(exports.usersSchema, ['fullname', 'card_number', 'password', 'permission'], {
    $id: 'UsersData'
});
exports.usersDataValidator = (0, typebox_1.getValidator)(exports.usersDataSchema, validators_1.dataValidator);
exports.usersDataResolver = (0, schema_1.resolve)({});
// Schema for updating existing entries
exports.usersPatchSchema = typebox_1.Type.Partial(exports.usersSchema, {
    $id: 'UsersPatch'
});
exports.usersPatchValidator = (0, typebox_1.getValidator)(exports.usersPatchSchema, validators_1.dataValidator);
exports.usersPatchResolver = (0, schema_1.resolve)({});
// Schema for allowed query properties
exports.usersQueryProperties = typebox_1.Type.Pick(exports.usersSchema, [
    'id',
    'fullname',
    'card_number',
    'password',
    'permission'
]);
exports.usersQuerySchema = typebox_1.Type.Intersect([
    (0, typebox_1.querySyntax)(exports.usersQueryProperties),
    // Add additional query properties here
    typebox_1.Type.Object({}, { additionalProperties: false })
], { additionalProperties: false });
exports.usersQueryValidator = (0, typebox_1.getValidator)(exports.usersQuerySchema, validators_1.queryValidator);
exports.usersQueryResolver = (0, schema_1.resolve)({});
//# sourceMappingURL=users.schema.js.map