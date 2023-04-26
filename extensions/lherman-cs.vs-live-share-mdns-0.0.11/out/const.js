"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extNamespace = "extension.liveShareMdns";
const os_1 = require("os");
exports.userName = os_1.userInfo().username;
exports.serviceName = "liveShare";
exports.publishTimeout = 30; // in seconds
exports.discoveryTimeout = 10; // in seconds
//# sourceMappingURL=const.js.map