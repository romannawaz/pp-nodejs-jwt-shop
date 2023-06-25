import { Request, Response } from 'express';

import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';

import config from '@config';

import { encryptPassword } from '../utils/encrypt-password.util';
import { generateTokens } from '../utils/tokens.util';

import UserModel from '@models/users.model';
import UserToken, { TokenPayload } from '@models/token.model';

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send({ message: 'All fields are required!' });

    const isUserExist = await UserModel.findOne({
      email,
    });
    if (!isUserExist)
      return res
        .status(404)
        .send({ message: 'User with this email does not exist!' });

    const comparedPassword = await compare(password, isUserExist.password!);

    if (!comparedPassword)
      return res
        .status(404)
        .send({ message: 'Your login details are incorrect' });

    const tokenPayload: TokenPayload = {
      user_id: isUserExist._id.toString(),
      email: isUserExist.email!,
    };

    const tokens = generateTokens(tokenPayload);

    await UserToken.findOneAndUpdate(
      { userId: isUserExist._id },
      { refreshToken: tokens.refreshToken },
    );

    return res.status(200).send(tokens);
  } catch (error) {
    return res.status(500).send({ error });
  }
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).send({ message: 'All fields are required!' });

    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist)
      return res.status(409).send({ message: 'User already exist.' });

    const encryptedPassword = encryptPassword(password);

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
  login,
  register,
};
