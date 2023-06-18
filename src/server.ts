import express from 'express';
import http from 'http';

import mongoose from 'mongoose';

import cors from 'cors';
import helmet from 'helmet';

import Logging from './libraries/logging';

import config from './config';

import requestInfo from './middlewares/request-info.middleware';

const app = express();

mongoose.connect(config.db.url).then(() => {
  Logging.info('Db is connected!');

  StartServer();
});

/**
 * Start when DB is connected
 */
const StartServer = () => {
  /**
   * Logg the Request and the Response
   */
  app.use(requestInfo);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(cors());
  app.use(helmet());

  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`),
    );
};
