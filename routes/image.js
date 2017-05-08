'use strict'
var express = require('express')

var ImageController = require('../controllers/image')
var UserControl =  require('../controllers/auth')


var multipart = require('connect-multiparty');
const auth =  require('../middlewares/auth')
var multipartMiddleware = multipart({uploadDir: "./uploads"});
var createRoute = require('../services/folder')


var api = express.Router();


api.get('/prueba',ImageController.pruebas)
api.get('/image/:id',ImageController.getImage)
api.post('/image',ImageController.saveImage)
api.get('/images/:album?',ImageController.getImages)
api.put('/images/:id',ImageController.UpdateImage)
api.delete('/images/:id',ImageController.deleteImage)
api.post('/uploadimage/:id',multipartMiddleware,ImageController.UploadImage)
api.post('/UploadimageI',multipartMiddleware,ImageController.saveImage2)
api.get('/getImage/:imageFile',multipartMiddleware,ImageController.getImageFile)
api.post('/subirImagen',ImageController.uploadI)


api.post('/', multipartMiddleware, function(req, res) {
  console.log(req.body, req.files);
  var file = req.files.image;
  console.log(file.name);
  console.log(file.type);



  res.status(200).send('OK');
});


//-----------------------------------------------------------
api.post('/singUp',UserControl.singUp)
api.post('/singIn')

api.get('/private', function(req,res){

  


})

module.exports = api;
