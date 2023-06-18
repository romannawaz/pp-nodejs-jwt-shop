import express from 'express';
import http from 'http';

const app = express();

const StartServer = () => {
  http
    .createServer(app)
    .listen(3000, () => console.log(`Server is running on port ${3000}.`));
};

StartServer();
