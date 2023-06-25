import { genSaltSync, hashSync } from 'bcrypt';

import config from '@config';

export const encryptPassword = (password: string): string => {
  const salt = genSaltSync(Number(config.token.salt));
  const encryptedPassword = hashSync(password, salt);

  return encryptedPassword;
};
