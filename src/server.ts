import express from 'express';
import http from 'http';

import mongoose from 'mongoose';

import Logging from './libraries/logging';

import config from './config';

const app = express();

mongoose.connect(config.db.url).then(() => {
  Logging.info('Db is connected!');

  StartServer();
});

/**
 * Start when DB is connected
 */
const StartServer = () => {
  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`),
    );
};
