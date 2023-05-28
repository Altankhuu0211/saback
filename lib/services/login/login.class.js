"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const knex_1 = __importDefault(require("knex"));
const constants_1 = require("../../constants");
const db = (0, knex_1.default)(constants_1.postgres);
class CustomService {
    constructor(options = {}) {
        this.options = options;
    }
    async find(params) {
        return { message: `This is a custom get method.` };
    }
    async get(id, params) {
        // Implement your own get method here
        return { message: `This is a custom get method for id ${id}` };
    }
    async create(data) {
        // Implement your own create method here
        // const key = `mq0)l2t[8G}(=gvpOP$&oc'O,i_E^<`
        const key = 'RfwxPHa5XSBiz8UcFGPkT64g+8HSkjRv';
        const id = data.username;
        const password = data.password;
        const user = await db('users').select('id', 'fullname', 'permission').where({ id, password });
        if (!user)
            return { error: 'Хэрэглэгчийн нэр эсвэл нууц үг буруу байна!' };
        const token = jsonwebtoken_1.default.sign({ id: user[0].id, permission: user[0].permission }, key, { expiresIn: '30d' });
        return { result: user[0], token: token, success: true };
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
//# sourceMappingURL=login.class.js.map