'use strict'
var express = require('express')
var AlbumController = require('../controllers/album')

var api = express.Router();

api.get('/album/:id',AlbumController.getAlbum)
api.get('/albums',AlbumController.getAlbums)
api.post('/save',AlbumController.SaveAlbum)
api.put('/update/:id',AlbumController.UpdateAlbum)
api.delete ('/delete/:id',AlbumController.DeleteAlbum)
module.exports = api;
