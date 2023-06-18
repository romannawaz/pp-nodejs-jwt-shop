import express from 'express';
import http from 'http';

import Logging from './libraries/logging';

import config from './config';

const app = express();

const StartServer = () => {
  http
    .createServer(app)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}.`),
    );
};

StartServer();
