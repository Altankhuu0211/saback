"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const login_class_1 = require("./login.class");
const login = (app) => {
    const path = '/login';
    app.use(path, new login_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
    // Implement your own hooks here
    });
};
exports.login = login;
//# sourceMappingURL=login.js.map