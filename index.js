'use strict'

  //- Thanks:
  //- http://nqdeng.github.io/7-days-nodejs

var path, send, parseUrl, validate;

path = require('path');
send = require('./lib/send');
parseUrl = require('./lib/parseUrl');
validate = require('./lib/validate');

module.exports = combo;

function combo(root){

  return function *(next){
    var urlInfo = null;

    if(this.idempotent && ['.css', '.js'].indexOf(path.extname(this.url)) !== -1){
      urlInfo = yield parseUrl(root || '');
      yield validate(urlInfo.pathnames);
      yield send(urlInfo.pathnames, urlInfo.mime);
    }else{
      yield next;
    }
  };
};