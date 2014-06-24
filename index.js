'use strict'

  //- Thanks:
  //- http://nqdeng.github.io/7-days-nodejs

var path, send, parseUrl, validate;

path = require('path');
send = require('./lib/send');
parseUrl = require('./lib/parseUrl');
validate = require('./lib/validate');

module.exports = combo;

function combo(root, identifier){

  return function *(next){
    var urlInfo, extname, index;

    extname = path.extname(decodeURIComponent(this.url));
    index = extname.lastIndexOf('?');

    if(index !== -1){
      extname = extname.substring(0, index);
    }

    if(this.idempotent && ['.css', '.js'].indexOf(extname) !== -1){
      urlInfo = yield parseUrl(root || '', identifier || '??');
      yield validate(urlInfo.pathnames);
      yield send(urlInfo.pathnames, urlInfo.mime);
    }else{
      yield next;
    }
  };
};