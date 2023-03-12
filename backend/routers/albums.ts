import express from "express";
import mongoose from "mongoose";
import {imagesUpload} from "../multer";
import Album from "../models/Album";
import {AlbumMutation} from "../types";
import auth from "../middleware/auth";
import Track from "../models/Track";
import permit from "../middleware/permit";

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res, next) => {
  let artist_id = req.query.artist
  try {
    if (artist_id) {
      const albums = await Album.find({artist: artist_id}).populate('artist').sort({year: -1});
      return res.send(albums);
    }

    const albums = await Album.find();
    return res.send(albums);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const albums = await Album.findById(req.params.id).populate('artist');
    return res.send(albums);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res, next) => {
  const albumData: AlbumMutation = {
    artist: req.body.artist,
    name: req.body.name,
    image: req.file ? req.file.filename : null,
    year: Number(req.body.year),
  };

  const album = new Album(albumData);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findOne({_id: req.params.id});
    if (album) {
      await Album.updateOne({_id: album._id}, {isPublished: !req.body.isPublished});
      const updatedAlbum = await Album.findOne({_id: album._id});
      return res.send(updatedAlbum);
    }
  } catch (e) {
    return next(e);
  }
});

albumsRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = await Album.findOne({_id: req.params.id});
    if (album) {
      await Album.deleteOne({_id: album._id});
      await Track.deleteMany({album: album._id});
      return res.send("Album deleted");
    }
  } catch (e) {
    return next(e);
  }
});

export default albumsRouter;