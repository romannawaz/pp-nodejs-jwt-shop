import { Router } from 'express';

import userController from '../controllers/user.controller';

const router = Router();

router.post('/login', userController.login);
router.post('/register', userController.register);

export { router as userRouter };
