'use strict';

var MIME, path;

path = require('path');

MIME = {
  '.css' : 'text/css',
  '.js' : 'application/javascript'
};

module.exports = parseUrl;

function parseUrl(root){

  return function *(){
    var base, pathnames, parts, url;

    url = this.url;

    if(url.indexOf('??') === -1){
      url = url.replace('/', '/??');
    }

    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map(function(value){
      return path.join(root, base, value);
    });

    return {
      mime : MIME[path.extname(pathnames[0])] || 'text/plain',
      pathnames : pathnames
    };
  };
};