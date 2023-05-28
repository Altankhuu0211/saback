"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomService = void 0;
const knex_1 = __importDefault(require("knex"));
const constants_1 = require("../../constants");
const db = (0, knex_1.default)(constants_1.postgres);
class CustomService {
    constructor(options = {}) {
        this.options = options;
    }
    getWeeksDiff(endDate) {
        var startDate = new Date('2023-1-30');
        const msInWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.round(Math.abs(endDate - startDate) / msInWeek);
    }
    async find(params) {
        var semester_week = this.getWeeksDiff(new Date());
        if (semester_week > 16)
            semester_week = 16;
        return { success: true, data: semester_week };
    }
    async get(id, params) {
        // Implement your own get method here
        return { message: `This is a custom get method for id ${id}` };
    }
    async create(data, params) {
        // Implement your own create method here
        return { message: 'This is a custom create method' };
    }
    async update(id, data, params) {
        // Implement your own update method here
        return { message: `This is a custom update method for id ${id}` };
    }
    async patch(id, data, params) {
        // Implement your own patch method here
        return { message: `This is a custom patch method for id ${id}` };
    }
    async remove(id, params) {
        // Implement your own remove method here
        return { message: `This is a custom remove method for id ${id}` };
    }
}
exports.CustomService = CustomService;
//# sourceMappingURL=semester-week.class.js.map