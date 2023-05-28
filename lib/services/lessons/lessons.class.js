"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.LessonsService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class LessonsService extends knex_1.KnexService {
}
exports.LessonsService = LessonsService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'lessons'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=lessons.class.js.map