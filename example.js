'use strict';

var koa = require('koa');
var combo = require('./index');

var app = koa();

app.use(combo('.'));

app.listen(80);