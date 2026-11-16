var express = require('express');
var app = express();
var expressWs = require('express-ws')(app);

module.exports = {
    express,
    app,
    expressWs
}