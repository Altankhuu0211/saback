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
        return { message: `This is a custom get method` };
    }
    async get(id, params) {
        // Implement your own get method here
        return { message: `This is a custom get method for id ${id}` };
    }
    async create(data) {
        // Implement your own create method here
        const teacher_id = data.teacher_id;
        const weekday = data.weekday;
        const part_time = data.part_time;
        const semester_week = data.semester_week;
        // const class_id = data.rfid_no
        const attendance = data.attendance;
        const time = data.time;
        var result = 'success';
        const schedule = await db.select('id').from('schedule').where({ weekday, part_time });
        if (!schedule)
            return { data: {} };
        attendance.map(async (att) => {
            const students = await db.select('id').from('users').where({ card_number: att.chip_number });
            const studs = await db
                .select('id')
                .from('students')
                .where({ schedule_id: schedule[0].id, student_id: students[0].id });
            if (studs) {
                result = await db('attendance').where({ student_sch_id: studs[0].id, semester_week }).update({
                    status: '1',
                    arrival_time: time
                });
            }
        });
        return { data: result };
    }
    async update(id, data, params) {
        // Implement your own update method here
        return { message: `This is a custom update method for id ${id}` };
    }
    async patch(params) {
        return { message: `This is a custom patch method` };
    }
    async remove(id, params) {
        // Implement your own remove method here
        return { message: `This is a custom remove method for id ${id}` };
    }
}
exports.CustomService = CustomService;
//# sourceMappingURL=record-attendance.class.js.map