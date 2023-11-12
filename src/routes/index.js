import { Router } from 'express';
import userRouter from './users.router.js';
import productsRouter from './products.router.js';
import cartsRoutes from './cart.router.js'
import sessionRoutes from './session.router.js';

const router = Router()

// API routes
router.use('/api/users', userRouter);
router.use('/api/products', productsRouter);
router.use('/api/carts', cartsRoutes);
app.use('/api/session', sessionRoutes);

export default router 

