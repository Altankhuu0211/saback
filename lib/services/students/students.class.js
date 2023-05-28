"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.StudentsService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class StudentsService extends knex_1.KnexService {
}
exports.StudentsService = StudentsService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'students'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=students.class.js.map