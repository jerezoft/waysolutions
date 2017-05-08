'use strict'

const services =require('../services')

function isAuth(req,res,next){
  if(!req.headers.authorization){
    return res.status(403).send({message:'prohibido el acceso'})
  }
  //token que nos envia el cliente en la cabezera
  const token = req.headers.authorization.split(' ')[1]
    services.decodeToken(token)
    .then(function(response){
        req.user = response
        next()
    })
    .catch(function(response){
        res.status(response.status).send({message:response.message})

    })


}
module.exports = isAuth
