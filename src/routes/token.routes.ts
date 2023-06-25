import { Router } from 'express';

import tokenController from '../controllers/token.controller';

const router = Router();

router.post('/refresh', tokenController.refreshToken);

export { router as tokenRouter };
