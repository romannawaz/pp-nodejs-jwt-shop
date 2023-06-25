import { Request, Response } from 'express';

import { verify } from 'jsonwebtoken';

import config from '@config';

import UserToken, { TokenPayload } from '@models/token.model';
import UserModel from '@models/users.model';

import { generateTokens } from '../utils/tokens.util';

const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).send({ message: 'Token are required!' });

  let refreshTokenData = verify(
    refreshToken,
    config.token.refresh_secret,
  ) as TokenPayload;

  const refreshTokenFromDb = await UserToken.findOne({
    userId: refreshTokenData.user_id,
    refreshToken,
  });
  if (!refreshTokenFromDb)
    return res.status(409).send({ message: 'Token does not exist!' });

  const newTokens = generateTokens(refreshTokenData);

  await refreshTokenFromDb.updateOne({ refreshToken: newTokens.refreshToken });
  await UserModel.findOneAndUpdate({ token: newTokens.accessToken });

  return res.status(200).send({
    data: {
      accessToken: newTokens.accessToken,
      refreshToken: newTokens.refreshToken,
    },
  });
};

export default {
  refreshToken,
};
