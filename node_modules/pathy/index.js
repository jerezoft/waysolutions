#!/usr/bin/env node
'use strict'

var fs = require('fs')
var path = require('path')
var os = require('os')

var IS_WIN = os.platform() == 'win32'

module.exports = Pathy

var U_PERM = parseInt('500', 8)
var G_PERM = parseInt('50', 8)
var O_PERM = parseInt('5', 8)

function Pathy(_path, uid, gid){
  fn.path = _path || process.env.PATH
  fn.uid = typeof uid == 'undefined' ? process.getuid() : uid
  fn.gid = typeof gid == 'undefined' ? process.getgid() : gid
  fn.find = fn

  return fn

  function fn(scriptName, executable, cb){
    if(typeof executable == 'function'){
      cb = executable
      executable = true
    }
    var paths = fn.path.split(IS_WIN ? ";" : ':')

    check()
    
    function check(){
      if(paths.length){
        var _path = paths.shift()
        var scriptPath = path.join(_path, scriptName)

        fs.stat(scriptPath, function(err, stat){
          if(stat){
            if(!IS_WIN && executable){
              if(stat.isFile()){
                if(fn.uid == stat.uid){
                  if((stat.mode & U_PERM) == U_PERM)
                    return cb(null, scriptPath)
                } else if(fn.gid == stat.gid){
                  if((stat.mode & G_PERM) == G_PERM)
                    return cb(null, scriptPath)
                } else if((stat.mode & O_PERM) == O_PERM){
                  return cb(null, scriptPath)
                }
              }
              check()
            } else {
              cb(null, scriptPath)
            }
          } else {
            check()
          }
        })
      } else {
        cb(new Error('Script ' + scriptName + ' cannot be found'))
      }
    }
  }
}

if(require.main == module){
  var scriptName = process.argv[2]

  Pathy().find(scriptName, true, function(err, path){
    if(err) process.stderr.write(err.message + '\n')
    else process.stdout.write(path + '\n')
  })
}
