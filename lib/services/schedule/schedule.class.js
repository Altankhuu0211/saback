"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOptions = exports.ScheduleService = void 0;
const knex_1 = require("@feathersjs/knex");
// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
class ScheduleService extends knex_1.KnexService {
}
exports.ScheduleService = ScheduleService;
const getOptions = (app) => {
    return {
        paginate: app.get('paginate'),
        Model: app.get('postgresqlClient'),
        name: 'schedule'
    };
};
exports.getOptions = getOptions;
//# sourceMappingURL=schedule.class.js.map