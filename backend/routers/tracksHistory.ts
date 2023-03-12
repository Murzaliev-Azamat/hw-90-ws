import express from 'express';
import mongoose from 'mongoose';
import {TrackHistoryMutation} from "../types";
import TrackHistory from "../models/TrackHistory";
import auth, {RequestWithUser} from "../middleware/auth";

const tracksHistoryRouter = express.Router();


tracksHistoryRouter.get('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  try {
    const tracksHistory = await TrackHistory.find({user: user._id}).populate({path: 'track', populate: {path: 'album', populate: {path: 'artist'}}}).sort({datetime: -1});
    return res.send(tracksHistory);
  } catch (e) {
    return next(e);
  }
});


tracksHistoryRouter.post('/', auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;

  const trackHistoryData: TrackHistoryMutation = {
    user: user._id,
    track: req.body.track,
    datetime: new Date(),
  };

  const trackHistory = new TrackHistory(trackHistoryData);

  try {
    await trackHistory.save();
    return res.send({
      username: user.username
    });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    } else {
      return next(e);
    }
  }
});

export default tracksHistoryRouter;