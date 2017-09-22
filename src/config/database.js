import mongoose from 'mongoose';

import constants from './constants';

//keep error from happening with mongodb
mongoose.Promise = global.Promise;

//connect db with url
try {
  mongoose.connect(constants.MONGO_URL);
} catch (err) {
  mongoose.createConnection(constants.MONGO_URL);
}

mongoose.connection
  .once('open', () => console.log('mongodb running'))
  .on('error', e => {
    throw e;
  });
