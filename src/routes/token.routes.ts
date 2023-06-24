import { Router } from 'express';

import { TokenController } from '../controllers/token.controller';

const router = Router();

router.post('/refresh', TokenController.refreshToken);

export { router as tokenRouter };
