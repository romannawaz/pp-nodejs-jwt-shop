import { Request, Response } from 'express';
import UserModel from '@models/users.model';
import UserToken from '@models/token.model';

import config from '@config';

import { genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).send({ message: 'All fields are required!' });

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist)
      return res.status(409).send({ message: 'User already exist.' });

    const salt = await genSalt(Number(config.token.salt));
    const encryptedPassword = await hash(password, salt);

    const user = await UserModel.create({
      name,
      email,
      password: encryptedPassword,
    });

    const token = sign(
      { user_id: user._id, email },
      config.token.access_secret,
      {
        expiresIn: config.token.access_life,
      },
    );

    const refreshToken = sign(
      { user_id: user._id, email },
      config.token.refresh_secret,
      {
        expiresIn: config.token.refresh_life,
      },
    );

    await UserModel.findByIdAndUpdate(user._id, { token });

    await UserToken.create({
      userId: user.id,
      refreshToken,
    });

    return res.status(202).send({ token, refreshToken });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

export default {
  register,
};
