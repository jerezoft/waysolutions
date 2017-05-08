'usen strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../services')
var createRoute = require('../services/folder')

//Autenticacion cuando el usuario una vez esta registrado
//Registre un usuario
function singUp(req,res){

  var user = new User();
  var params = req.body

  user.dispositivo = params.dispositivo
  user.displayName = params.displayName


   createRoute.createRoute(user._id)

  user.save(function(err){
      if(err){
         res.status(500).send({message:' Error al crear el usuario'})
      }else{
         res.status(200).send({token: service.createToken(user)})

      }
  })

}
function singIn(req,res){
  user.find({dispositivo: req.body.dispositivo},function(err,doc){
        if(err){
             res.status(500).send({message:' Error al crear el usuario'})
        }else{
          if(!res){
            res.status(404).send({message:' No existe el usuario'})
          }else{
              req.user = doc
              res.status(200).send({
              message: 'Te has logueado correctamente',
              token: service.createToken(user)
   })
          }
        }
  })
}

module.exports ={
  singUp,
  singIn
}
