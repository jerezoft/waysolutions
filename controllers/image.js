'use strict'
var Image = require('../models/image')
var Album = require('../models/album')
var path = require('path')
var fs = require('fs')

function pruebas(req,res){
  res.status(200).send({message:'Pruebas'})
}


function getImage(req,res){
  var imageId = req.params.id;
  Image.findById(imageId,function(err,doc){
      if(err){
        res.status(500).send({message:'error en la peticion'})
      }else{
        if(!doc){
          res.status(404).send({message:'No existe la imagen'})
        }else{
          Album.populate(doc,{path: 'album'},function(err,doc){
            if(err){
                res.status(500).send({message:'error en la peticion'})
            }else{
              imgProc.convertImgs(req.files).then((imageStringArray)=>{

      //After all image processing finished, send the base64 image string to client
                   res.status(200).send({imageStringArray})

  })

            }

          })

        }

      }

  })
}
//----fn---------------------------------------------------------------------

function saveImage(req,res){
  var image = new Image();
  var params = req.body
  image.title = params.title
  image.picture =  null;
  image.album = params.album;
  image.order = params.order;
  image.save(function(err,doc){
    if(err){
        res.status(500).send({message:'error en la peticion'})
    }else{

      if(!doc){
        res.status(404).send({message:'No existe la imagen'})
      }else{

        res.status(200).send({doc})
      }

    }

  })
}
//------------------fn

//-----------------------------------------------------------------------------
function saveImage2(req,res,next){


  var params = req.body
  var image = new Image();
  var file_path = req.files.image.path;

  image.title = params.title

  image.album = params.album;
  image.order = params.order;
  image.user = params.user;
  var file_split = file_path.split('/')
  var file_name = file_split[1]
  console.log(file_name);
  image.picture =   file_name;
  var validator = file_name.split('.')[1]

var formatosValidos = ['png','jpg','gif','mp4']


for (let i = 0,len = formatosValidos.length; i < len; i++) {

      if(validator == formatosValidos[i]){
         validator = true
         break
      }else{
         validator = false
      }
}

  if(!validator){
    return  res.status(403).send({message:'No se puede guardar archivo'})
}
















  image.save(function(err,doc){

    if(err){
        console.log(err);
        res.status(500).send({message:'error en la peticion'})
    }else{

      if(!doc){
        res.status(404).send({message:'No existe la imagen'})
      }else{

        var file_path = req.files.image.path;
        var file_split = file_path.split('/')
        var file_name = file_split[1]
        var formato = file_name.split('.')[1]

        if(formato=='png'){
          fs.renameSync('/home/jeresoft/Documentos/node/nodejs/way/uploads/'+file_name,'/home/jeresoft/Documentos/node/nodejs/way/public/'+image.user+'/upload/images/'+file_name)

        }else{
          fs.renameSync('/home/jeresoft/Documentos/node/nodejs/way/uploads/'+file_name,'/home/jeresoft/Documentos/node/nodejs/way/public/'+image.user+'/upload/videos/'+file_name)

        }

        res.status(200).send({message:'Archivo guardado con exito'})



  }  }
})
  }
//------------------fn

function saveImage3(req,res,next){
  console.log("body "+req.body);
  var image = new Image();
  var file_path = req.files.image.path;
  console.log("ruta "+file_path);
  var file_split = file_path.split('/')
  var file_name = file_split[1]

  image.title = prBody.title
  image.album = prBody.album;

  image.order = prBody.order;
  image.picture =   file_name;


  image.save((err,doc)=>{
    if(err){
        res.status(500).send({message:'error en la peticion'})
    }else{

      if(!doc){
        res.status(404).send({message:'No existe la imagen'})
      }else{

        imgProc.convertImgs(req.files).then((imageStringArray)=>{

//After all image processing finished, send the base64 image string to client
            res.redirect('/cliente/'+file_name)
            res.status(200).send({imageStringArray})

})

    }

  }
})}

//-----------------------fn
function getImages(req,res){
  var albumId =req.params.album;
  if(!albumId){
    var accion = Image.find({}).sort('-title')
  }else{
  var accion=  Image.find({album:albumId}).sort('-title')

  }
  accion.exec(function(err,doc){
    if(err){
       res.status(500).send({message:'error en la peticion'})
    }else{
      if(!doc){
            res.status(404).send({message:'No existe la imagen en este album'})
      }else{
        Album.populate(doc,{path: 'album'},function(err,doc){
          if(err){
              res.status(500).send({message:'error en la peticion'})
          }else{
                res.status(200).send({doc})
          }

        })
      }
    }
  })
}
//------------------fn----------------------------------------------------------
function UpdateImage(req,res){
  var ImageId = req.params.id;
  var params = req.body

  Image.findByIdAndUpdate(ImageId,params,function(err,doc){
    if(err){
        res.status(500).send({message:'error en la peticion'})
    }else{

      if(!doc){
        res.status(404).send({message:'No se ha Actualizardo la imagen'})
      }else{

        res.status(200).send({doc})
      }

    }
  })


}
//----------Function Delete Image ---------------------------------------
function deleteImage(req,res){
  var imageID = req.params.id
  Image.findByIdAndRemove(imageID,function(err,doc){
    if(err){
        res.status(500).send({message:"Error  en la peticion"})
    }else{
      if(!doc){
        res.status(402).send({message:"No pudo ejecutar  peticion"})
      }else{
        res.status(200).send({message:doc})
      }
    }

  })
}

//-------------------__Fn---------------------------------
function UploadImage(req,res,next){

  var imageId = req.params.id;
  var FileName = 'No subido'
  if(req.files){

    var file_path = req.files.image.path;
    var file_split = file_path.split('/')
    var file_name = file_split[1]
    console.log(file_path);
    console.log(file_name);


    Image.findByIdAndUpdate(imageId,{picture:file_name},function(err,doc){
      if(err){
          res.status(500).send({message:'error en la peticion'})
      }else{

        if(!doc){
          res.status(404).send({message:'No se ha Actualizardo la imagen'})
        }else{

          res.status(200).send({doc})
        }

      }
    })
  }




}
//---------Fn------------------------------------------------------------------
var fs = require('fs')
function getImageFile(req,res){
  var imageFile = req.params.imageFile
  console.log('imageFile : '+imageFile);

  fs.exists('./uploads/'+imageFile,function(exist){
    if(exist){
      res.sendFile(path.resolve('./uploads/'+imageFile))

  }else{
    res.status(200).send({message:'No existe la imagen'})

}
})}


//----function

function uploadI(req,res){
  var image = new Image();
  var params = req.body


}


//-------------

module.exports = {
  UploadImage,
  pruebas,
  getImage,
  saveImage,
  getImages,
  UpdateImage,
  deleteImage,
  saveImage2,
  saveImage3,
  getImageFile,
  uploadI





}
