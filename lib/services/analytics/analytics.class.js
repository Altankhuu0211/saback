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
        const id = params.query.teacher_id;
        const weekday = params.query.week_day;
        const part_time = params.query.part_time;
        const weeks = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
        // const user = await db('users').where({ id })
        // if (!user) {
        //   return { data: [] }
        // }
        const schedule = await db
            .select('schedule.id')
            .from('schedule')
            .where({ part_time, weekday })
            .rightJoin('lessons', 'lessons.id', 'schedule.lesson_id')
            .where({ teacher_id: id })
            .then((res) => {
            return res;
        });
        if (!schedule) {
            return { data: [] };
        }
        var data = [];
        weeks.map(async (val) => {
            const attendance = await db
                .select('student_id', 'fullname', 'semester_week', 'status', 'arrival_time')
                .from('students')
                .where({ schedule_id: schedule[0].id })
                .innerJoin('attendance', 'students.id', 'attendance.student_sch_id')
                .where({ semester_week: val })
                .rightJoin('users', 'users.id', 'students.student_id')
                .orderBy('users.id', 'asc')
                .then((res) => {
                return res;
            });
            var total_absent = 0;
            var total_free = 0;
            var total_present = 0;
            var total_sick = 0;
            attendance.map((att) => {
                if (att.status == 1) {
                    total_present++;
                }
                if (att.status == 2) {
                    total_free++;
                }
                if (att.status == 3) {
                    total_sick++;
                }
            });
            total_absent = attendance.length - total_free - total_sick - total_present;
            var row = {
                semester_week: val,
                total_absent,
                total_free,
                total_present,
                total_sick,
                total_students: attendance.length
            };
            data.push(row);
        });
        // const data = await Promise.all(promises)
        return {
            data: data
        };
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
//# sourceMappingURL=analytics.class.js.map