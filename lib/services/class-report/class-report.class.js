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
        const teacher_id = params.query.teacher_id;
        const subject_id = params.query.subject_id;
        const weekday = params.query.week_day;
        const part_time = params.query.part_time;
        // const user = await db('users').where({ id })
        // if (!user) {
        //   return { data: [] }
        // }
        const lesson = await db
            .select('id')
            .from('lessons')
            .where({ teacher_id, subject_id })
            .then((res) => {
            return res;
        });
        if (!lesson) {
            return { data: [] };
        }
        const schedule = await db
            .select('id')
            .from('schedule')
            .where({ lesson_id: lesson[0].id, part_time, weekday })
            .then((res) => {
            return res;
        });
        if (!schedule) {
            return { data: [] };
        }
        const students = await db
            .select('students.id', 'student_id', 'fullname')
            .from('students')
            .where({ schedule_id: schedule[0].id })
            .rightJoin('users', 'users.id', 'students.student_id')
            .orderBy('users.id', 'asc')
            .then((res) => {
            return res;
        });
        const promises = students.map((stud) => {
            var obj = {
                student_id: stud.student_id,
                fullname: stud.fullname
            };
            return db
                .select('*')
                .from('attendance')
                .where({ student_sch_id: stud.id })
                .orderByRaw('CAST(semester_week AS integer)')
                .then((res) => {
                var count = 0;
                res.map((val) => {
                    if (val.status == '1')
                        count++;
                    else if (val.status == '2' || val.status == '3')
                        count = count + 0.5;
                });
                return { ...stud, attendance: res, total_attendance: count };
            });
        });
        const attendance = await Promise.all(promises);
        return {
            data: attendance
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
//# sourceMappingURL=class-report.class.js.map