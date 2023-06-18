import { Request, Response } from 'express';

const register = (req: Request, res: Response) => {
  return res.status(200).send({ message: 'Success' });
};

export default {
  register,
};
