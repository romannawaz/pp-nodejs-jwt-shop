import { NextFunction, Request, Response } from 'express';

import Logging from '../libraries/logging';

const requestInfo = (req: Request, res: Response, next: NextFunction) => {
  /** Log the Request */
  Logging.info(
    `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`,
  );

  /** Log the Response */
  res.on('finish', () => {
    Logging.info(
      `Incomming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`,
    );
  });

  next();
};

export default requestInfo;
