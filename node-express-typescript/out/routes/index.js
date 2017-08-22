"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var pg_1 = require("pg");
var client = new pg_1.Client({
    host: 'localhost',
    database: 'app',
    port: 5433
});
var index = express_1.Router();
/* GET home page. */
index.get('/', function (request, response, next) {
    // res.render('index', { title: 'Visual Studio Code!' });
    client.connect();
    client.query('SELECT $1::text as message', ['Hello world Postgres!'], function (err, res) {
        console.log("---->", res);
        response.render('index', { title: res.rows[0].message });
        // client.end();
    });
    client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)').then(function (value) {
        console.log("value", value);
    });
});
index.get('/create', function (request, response, next) {
    client.connect();
    client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)').then(function (value) {
        console.log("value", value);
        response.render('index', { title: 'created' });
    });
});
index.get('/create_3_items', function (request, response, next) {
    client.connect();
    client.query("INSERT INTO items (id, text, complete) VALUES (1, 'Telefono', true), (2, 'Computer', true), (3, 'Airplane', false)").then(function (value) {
        console.log("value", value);
        response.render('index', { title: '3 items created' });
    });
});
exports.default = index;
//# sourceMappingURL=index.js.map