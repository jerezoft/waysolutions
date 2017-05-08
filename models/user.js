'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema


var UserSchema = Schema({
  dispositivo:{type:String,unique:false,lowercase:true},
  password:{type:String, select: false},
  signupDate:{type:Date, default:Date.now()},
  displayName:String,
  token:String
})

module.exports = mongoose.model('User',UserSchema)
