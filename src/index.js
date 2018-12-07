import '@babel/polyfill';
import express from 'express';
import bodyParser from 'body-parser';

import checkEmptyPayload from './middlewares/check-empty-payload';
import checkContentTypeIsJson from './middlewares/check-content-type-is-json';
import checkContentTypeIsSet from './middlewares/check-content-type-is-set';
import errorHandler from './middlewares/error-handler';
import mongoose from 'mongoose';
import routes from './routes';
const app = express();

// Connection to mlab
mongoose.Promise = global.Promise;
mongoose.connect(
  `${process.env.MONGODB_PROTOCOL}://${process.env.MONGODB_USER}:${
    process.env.MONGODB_PASSWORD
  }@${process.env.MONGODB_HOSTNAME}:${process.env.MONGODB_PORT}/${
    process.env.MONGODB_DBNAME
  }`,
  { useNewUrlParser: true }
);
mongoose.connection.on('error', () => {
  throw new Error('Unable to connect to database!');
});

app.use(bodyParser.json({ limit: 1e6 }));

app.use(checkEmptyPayload);
app.use(checkContentTypeIsSet);
app.use(checkContentTypeIsJson);

app.use('/api', routes.api);

app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(
    `WebSeries API server listening on port ${process.env.SERVER_PORT}!`
  );
});
