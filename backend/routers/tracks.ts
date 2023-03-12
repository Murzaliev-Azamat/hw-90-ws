import express from "express";
import mongoose from "mongoose";
import {TrackMutation} from "../types";
import Track from "../models/Track";
import auth from "../middleware/auth";
import permit from "../middleware/permit";

const tracksRouter = express.Router();

tracksRouter.get('/', async (req, res, next) => {
  let album_id = req.query.album
  try {
    if (album_id) {
      const tracks = await Track.find({album: album_id}).populate({path: 'album', populate: {path: 'artist'}}).sort({trackNumber: 1});
      return res.send(tracks);
    }

    const tracks = await Track.find();
    return res.send(tracks);
  } catch (e) {
    return next(e);
  }
});


tracksRouter.post('/', auth, async (req, res, next) => {
  const trackData: TrackMutation = {
    album: req.body.album,
    name: req.body.name,
    time: req.body.time,
    trackNumber: Number(req.body.trackNumber),
    linkToYoutube: req.body.linkToYoutube || undefined,
  };

  const track = new Track(trackData);

  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findOne({_id: req.params.id});
    if (track) {
      await Track.updateOne({_id: track._id}, {isPublished: !req.body.isPublished});
      const updatedTrack = await Track.findOne({_id: track._id});
      return res.send(updatedTrack);
    }
  } catch (e) {
    return next(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findOne({_id: req.params.id});
    if (track) {
      await Track.deleteOne({_id: track._id});
      return res.send("Track deleted");
    }
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;