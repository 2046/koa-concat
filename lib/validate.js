'use strict';

var fs = require('fs');

module.exports = validate;

function validate(pathnames){
  var index, len;

  index = 0;
  len = pathnames.length;

  return function *(){
    for(;index < len; index++){
      yield stat(pathnames[index]);
    }

    return true;
  };
};

function stat(pathname){
  return function(done){
    fs.stat.apply(this, [pathname, function(){
      done.apply(null, arguments);
    }]);
  };
};