'use strict';

var MIME, path;

path = require('path');

MIME = {
  '.css' : 'text/css',
  '.js' : 'application/javascript'
};

module.exports = parseUrl;

function parseUrl(root, identifier){

  return function *(){
    var base, pathnames, parts, url;

    url = decodeURIComponent(this.url);

    if(url.indexOf(identifier) === -1){
      url = url.replace('/', '/' + identifier);
    }

    parts = url.split(identifier);
    base = parts[0];
    pathnames = parts[1].split(',').map(function(value){
      var index = value.indexOf('?');

      if(index !== -1){
        value = value.substring(0, index);
      }

      return path.join(root, base, value);
    });

    return {
      mime : MIME[path.extname(pathnames[0])] || 'text/plain',
      pathnames : pathnames
    };
  };
};