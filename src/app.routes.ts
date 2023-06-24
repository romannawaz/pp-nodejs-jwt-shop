import { Router } from 'express';

import { userRouter } from './routes/user.routes';
import { tokenRouter } from './routes/token.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/tokens', tokenRouter);

export { router as AppRouter };
