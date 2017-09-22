import express from 'express';

import constants from './config/constants'
import './config/database'

const app = express();

app.listen(constants.PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(`
        server running on port: ${constants.PORT}
        | running on ${process.env.NODE_ENV}
        `);
  }
});
