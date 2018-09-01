"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var secrets = {
    dbUri: process.env.DB_URI
};

var getSecret = exports.getSecret = function getSecret(key) {
    return secrets[key];
};
//# sourceMappingURL=secrets.js.map