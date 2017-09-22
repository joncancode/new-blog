import express from 'express';

import constants from './config/constants'
import './config/database'
import middlewaresConfig from './config/middlewares'
import apiRoutes from './modules'

const app = express();

middlewaresConfig(app)

app.get('/', (req, res) => {
  res.send('hello world')
})

apiRoutes(app);

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
