'use strict';

var koa = require('koa');
var combo = require('./index');
var serve = require('koa-static');

var app = koa();

app.use(combo('.'));
app.use(serve('.'));

app.listen(88);