import crypto from 'crypto';
import mongoose from 'mongoose';
import config from './config';
import User from './models/User';
import Artist from "./models/Artist";
import Album from "./models/Album";
import Track from "./models/Track";

const run = async () => {
  mongoose.set('strictQuery', false);
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('albums');
    await db.dropCollection('artists');
    await db.dropCollection('trackhistories');
    await db.dropCollection('tracks');
    await db.dropCollection('users');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [eminem, madonna] = await Artist.create({
    name: "Eminem",
    image: "fixtures/eminem.jpg",
    info: "Rap singer"
  }, {
    name: "Madonna",
    image: "fixtures/madonna.jpg",
    info: "Pop singer"
  });

  const [theEminemShow, encore, americanLife, trueBlue] = await Album.create(
    {
      name: "Encore",
      year: 2004,
      artist: eminem._id,
      image: "fixtures/encore.jpg",
    },
    {
      name: "The Eminem Show",
      year: 2002,
      artist: eminem._id,
      image: "fixtures/the_eminem_show.jpg"
    },
    {
      name: "American Life",
      year: 2003,
      artist: madonna._id,
      image: "fixtures/american_life.jpg"
    },
    {
      name: "True Blue",
      year: 1986,
      artist: madonna._id,
      image: "fixtures/true_blue.jpg"
    },
  );

  await Track.create(
    {
      name: "White America",
      time: "3:14",
      album: theEminemShow._id,
      trackNumber: 1,
      linkToYoutube: 'bi-8QeEm0HM',
    },
    {
      name: "Business",
      time: "3:15",
      album: theEminemShow._id,
      trackNumber: 3,
    },
    {
      name: "Soldier",
      time: "2:18",
      album: theEminemShow._id,
      trackNumber: 2,
      linkToYoutube: 'HOCdIG3mq1U',
    },
    {
      name: "Say Goodbye Hollywood",
      time: "3:22",
      album: theEminemShow._id,
      trackNumber: 4,
    },
    {
      name: "Without Me",
      time: "3:25",
      album: theEminemShow._id,
      trackNumber: 5,
    },
    {
      name: "Evil Deeds",
      time: "3:16",
      album: encore._id,
      trackNumber: 1,
    },
    {
      name: "Mosh",
      time: "3:15",
      album: encore._id,
      trackNumber: 4,
    },
    {
      name: "Rain Man",
      time: "3:11",
      album: encore._id,
      trackNumber: 3,
    },
    {
      name: "Just Lose It",
      time: "3:18",
      album: encore._id,
      trackNumber: 2,
    },
    {
      name: "Mockingbird",
      time: "3:40",
      album: encore._id,
      trackNumber: 5,
    },
    {
      name: "Frozen",
      time: "3:33",
      album: americanLife._id,
      trackNumber: 5,
      linkToYoutube: 'XS088Opj9o0',
    },
    {
      name: "Hollywood",
      time: "3:35",
      album: americanLife._id,
      trackNumber: 4,
    },
    {
      name: "Love Profusion",
      time: "3:39",
      album: americanLife._id,
      trackNumber: 3,
    },
    {
      name: "Nothing Fails",
      time: "3:05",
      album: americanLife._id,
      trackNumber: 2,
    },
    {
      name: "Intervention",
      time: "3:07",
      album: americanLife._id,
      trackNumber: 1,
    },
    {
      name: "Open Your Heart",
      time: "3:11",
      album: trueBlue._id,
      trackNumber: 4,
    },
    {
      name: "White Heat",
      time: "3:15",
      album: trueBlue._id,
      trackNumber: 3,
    },
    {
      name: "Live to Tell",
      time: "3:19",
      album: trueBlue._id,
      trackNumber: 5,
    },
    {
      name: "Where’s the Party",
      time: "3:58",
      album: trueBlue._id,
      trackNumber: 2,
    },
    {
      name: "La Isla Bonita",
      time: "3:47",
      album: trueBlue._id,
      trackNumber: 1,
    },
  );

  await User.create(
    {
      username: "Azamat",
      password: "12345",
      token: crypto.randomUUID()
    },
    {
      username: "Adilet",
      password: "333",
      token: crypto.randomUUID(),
      role: "admin"
    }
  );

  await db.close();
};

void run();