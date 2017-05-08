'use strict'
var mkdirp = require('mkdirp');

function createRoute(client){

  mkdirp('public/'+client+'/upload/images', function(err) {
  });
  mkdirp('public/'+client+'/upload/videos', function(err) {
  });
}



 module.exports = {
   createRoute
 }
