"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.ClassroomService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class ClassroomService extends knex_1.KnexService {
}
exports.ClassroomService = ClassroomService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'classroom'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=classroom.class.js.map