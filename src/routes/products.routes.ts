import { Router } from 'express';
import productsController from '../controllers/products.controller';

const route = Router();

route.get('/all', productsController.getAll);
route.get('/:id', productsController.getById);
route.post('/create', productsController.create);
route.patch('/update/:id', productsController.update);
route.delete('/remove/:id', productsController.remove);

export { route as productsRouter };
