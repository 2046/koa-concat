'use strict';

var fs = require('fs');

module.exports = send;

function send(pathnames, mime){

  return function *(){
    var index, len;

    this.body = '';
    this.status = 200;
    this.set('Content-Type', mime);

    index = 0;
    len = pathnames.length;

    for(; index < len; index++){
      this.body += yield readFile(pathnames[index]);
    }
  };
};

function readFile(pathname){
  return function(done){
    fs.readFile.apply(this, [pathname, function(){
      done.apply(null, arguments);
    }]);
  };
};