import express from 'express';
import http from 'http';

import Logging from './libraries/logging';

const app = express();

const StartServer = () => {
  http
    .createServer(app)
    .listen(3000, () => Logging.info(`Server is running on port ${3000}.`));
};

StartServer();
