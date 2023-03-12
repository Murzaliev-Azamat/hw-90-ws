import express from "express";
import Artist from "../models/Artist";
import mongoose from "mongoose";
import { imagesUpload } from "../multer";
import { ArtistWithoutId } from "../types";
import auth from "../middleware/auth";
import Album from "../models/Album";
import Track from "../models/Track";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res, next) => {
  try {
    const artists = await Artist.find();
    return res.send(artists);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.post(
  "/",
  auth,
  imagesUpload.single("image"),
  async (req, res, next) => {
    const artistData: ArtistWithoutId = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      info: req.body.info,
    };

    const artist = new Artist(artistData);

    try {
      await artist.save();
      return res.send(artist);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(400).send(e);
      } else {
        return next(e);
      }
    }
  }
);

artistsRouter.patch(
  "/:id/togglePublished",
  auth,
  permit("admin"),
  async (req, res, next) => {
    try {
      const artist = await Artist.findOne({ _id: req.params.id });
      if (artist) {
        await Artist.updateOne(
          { _id: artist._id },
          { isPublished: !req.body.isPublished }
        );
        const updatedArtist = await Artist.findOne({ _id: artist._id });
        return res.send(updatedArtist);
      }
    } catch (e) {
      return next(e);
    }
  }
);

artistsRouter.delete("/:id", auth, permit("admin"), async (req, res, next) => {
  try {
    const artist = await Artist.findOne({ _id: req.params.id });
    if (artist) {
      const albums = await Album.find({ artist: artist._id });
      await Artist.deleteOne({ _id: artist._id });
      await Album.deleteMany({ artist: artist._id });
      if (albums) {
        for (const album of albums) {
          await Track.deleteMany({ album: album._id });
        }
      }
      return res.send("Artist deleted");
    }
  } catch (e) {
    return next(e);
  }
});

export default artistsRouter;
