import mongoose, {Types} from 'mongoose';
import Album from "./Album";
const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Album does not exist'
    }
  },
  name: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  trackNumber: {
    type: Number,
    required: true
  },
  linkToYoutube: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;








