'use strict';

var fs = require('fs');

module.exports = send;

function send(pathnames, mime){

  return function *(){
    var index, len;

    index = 0;
    len = pathnames.length;

    this.body = '';
    this.status = 200;
    this.set('Content-Type', mime);

    if(len){
      for(; index < len; index++){
        var result = yield readFile(pathnames[index]);
        this.body += result + '\n';
      }
    }else{
      this.status = 404;
      this.set('Content-Type', 'text/plain');
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
