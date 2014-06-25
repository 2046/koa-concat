'use strict';

var fs = require('fs');

module.exports = validate;

function validate(pathnames){
  return function *(){
    for(var index = 0; index < pathnames.length; index++){
      try{
        yield stat(pathnames[index]);
      }catch(err){
        pathnames.splice(index, 1);
        index--;
      }
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