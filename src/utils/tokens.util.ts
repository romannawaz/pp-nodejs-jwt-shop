import { sign } from 'jsonwebtoken';

import config from '@config';

import { TokenPayload } from '@models/token.model';

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export const generateTokens = (payload: TokenPayload): ITokens => {
  const accessToken = sign(
    { user_id: payload.user_id, email: payload.email },
    config.token.access_secret,
    {
      expiresIn: config.token.access_life,
    },
  );

  const refreshToken = sign(
    { user_id: payload.user_id, email: payload.email },
    config.token.refresh_secret,
    {
      expiresIn: config.token.refresh_life,
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};
