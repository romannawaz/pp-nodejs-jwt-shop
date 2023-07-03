import { Router } from 'express';

import { authRouter } from './routes/auth.routes';
import { tokenRouter } from './routes/token.routes';
import { productsRouter } from './routes/products.routes';

const router = Router();

router.use('/auth', authRouter);
router.use('/tokens', tokenRouter);
router.use('/products', productsRouter);

export { router as AppRouter };
