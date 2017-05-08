'use strict'
var express = require('express')
var bodyParser = require('body-parser')
var path =require('path')
var app = express()
var  album_routes = require('./routes/album')
var images_routes = require('./routes/image')
const auth =  require('./middlewares/auth')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/static',express.static(path.join(__dirname, 'public')))



app.use(function(req,res,next){              //* cualquiera puede hacer peticiones a nuestra api rest
  res.header('Access-Control-Allow-Origin','*')
  res.header('Access-Control-Allow-Headers','X-API-kEY, Origin, X-Requested-With,Content-Type,Accept,Access--Control-Request-Method')
  res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
  res.header('Allow','GET,POST,PUT,DELETE,OPTIONS')

  next()
})


app.use('/api',album_routes)
app.use('/api',images_routes)


module.exports = app
