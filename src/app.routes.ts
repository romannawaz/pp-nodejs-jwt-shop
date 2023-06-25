import { Router } from 'express';

import { authRouter } from './routes/auth.routes';
import { tokenRouter } from './routes/token.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);

export { router as AppRouter };
