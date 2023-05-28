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
    async find(params) {
        const weekday = ['1', '2', '3', '4', '5'];
        const part_time = ['1', '2', '3', '4', '5', '6', '7', '8'];
        const id = params.query.teacher_id;
        const user = await db('users').where({ id }).first();
        if (!user) {
            return { data: [] };
        }
        const lessons = await db('lessons').where({ teacher_id: id });
        if (!lessons || lessons.length === 0) {
            return { data: [] };
        }
        const promises = lessons.map((les) => {
            return db
                .select('*')
                .from('schedule')
                .where({ lesson_id: les.id })
                .rightJoin('lessons', 'schedule.lesson_id', 'lessons.id')
                .rightJoin('subject', 'lessons.subject_id', 'subject.id')
                .then((res) => {
                return res;
            });
        });
        const data = await Promise.all(promises);
        // Flatten the array of arrays
        const flatData = data.flat();
        const result = await Promise.all(part_time.map((part) => {
            return Promise.all(weekday.map((day) => {
                const filteredData = flatData.filter((data) => {
                    return data.weekday === day && data.part_time === part;
                });
                if (!filteredData)
                    return null;
                return filteredData[0];
            }));
        }));
        return { data: result };
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
//# sourceMappingURL=teacher-schedule.class.js.map