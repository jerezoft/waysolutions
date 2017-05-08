'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var formato_match = [/(\.|\/)(gif|jpe?g|png|mp4)$/i,"formato invalido"];

var ImageSchema = Schema({
  title:String,
  picture:{type:String,match:formato_match},
  order:Number,
  user:{type:Schema.ObjectId,ref:'User',required:true}
})

module.exports = mongoose.model('Image',ImageSchema)
