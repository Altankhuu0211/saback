"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backup = void 0;
const backup_class_1 = require("./backup.class");
const backup = (app) => {
    const path = '/backup';
    app.use(path, new backup_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {}
    });
};
exports.backup = backup;
//# sourceMappingURL=backup.js.map