'use strict'
var Album = require('../models/album')

//-----Obtener un album
function getAlbum(req,res){
  var AlbumId = req.params.id
  Album.findById(AlbumId,function(err,doc){
    if(err){
        res.status(500).send("Error al consultar documento")
    }else{
        if(!doc){
            res.status(404).send("No se encontro nada")
        }else{
            res.status(200).send({doc})
        }

    }

})}
//-------------Fn

//-----Obtener un album
function getAlbums(req,res){


  Album.find({},function(err,doc){
              if(err){
                  res.status(500).send("Error al consultar documento")
              }else{
                  if(!doc){
                      res.status(404).send  ("No se encontro nada")
                  }else{
                      res.status(200).send({doc})
                  }

              }



})}
//-------------Fn
//-------------Guardar Albums
function SaveAlbum(req,res){
  var album = new Album()
  var params = req.body
  album.title = params.title
  album.description = params.description
  album.save(function(err,doc){
    if(err){
      res.status(500).send({message:"Error al guardar Album"})
    }else{
      if(!doc){
        res.status(404).send({message:"No hay Album"})
      }else{
        res.status(200).send({message:doc})
      }
    }
  })


}

//-------------Fn

//------------Actualizar Album
function UpdateAlbum(req,res){
  var albumId = req.params.id;
  var params = req.body;
  Album.findByIdAndUpdate(albumId,params,function(err,doc){
    if(err){
          res.status(500).send({message:"Error  en la peticion"})
    }else{
      if(!doc){
        res.status(402).send({message:"No seencontro  peticion"})
      }else{
        res.status(200).send({message:doc})
      }
    }

  })
}

//------------Fn
//-----------Eliminar Album
function DeleteAlbum(req,res){
  var albumId = req.params.id
  Album.findByIdAndRemove(albumId,function(err,doc){
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

//-----------Fn


module.exports = {
  getAlbum,
  getAlbums,
  SaveAlbum,
  UpdateAlbum,
  DeleteAlbum
}
