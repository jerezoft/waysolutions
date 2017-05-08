'use strict'
var mongoose = require('mongoose')
var app = require('./app')


mongoose.connect('mongodb://localhost:27017/alb2',(err,res)=>{
      if(err){
        throw err
      }else{
app.listen(3002,()=>{
  console.log("Servidor correctamente instalado en el puerto : 3002");
})
console.log("conectado a mongoose correctamente");


      }


})
