"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analytics = void 0;
const analytics_class_1 = require("./analytics.class");
const authentication_1 = require("@feathersjs/authentication");
const analytics = (app) => {
    const path = '/analytics';
    app.use(path, new analytics_class_1.CustomService());
    const service = app.service(path);
    service.hooks({
        // Implement your own hooks here
        around: {
            all: [(0, authentication_1.authenticate)('jwt')]
        }
    });
};
exports.analytics = analytics;
//# sourceMappingURL=analytics.js.map