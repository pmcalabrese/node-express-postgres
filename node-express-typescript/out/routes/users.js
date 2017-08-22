"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var users = express_1.Router();
/* GET users listing. */
users.get('/', function (req, res, next) {
    res.send('respond with Marco');
});
exports.default = users;
//# sourceMappingURL=users.js.map