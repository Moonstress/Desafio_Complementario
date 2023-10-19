import { Router } from 'express';
import userRouter from './users.router.js';
import productRoutes from './products.router.js';
import cartsRoutes from './cart.router.js'


const router = Router()

// API routes
router.use('/api/users', userRouter);
router.use('/api/products', productRoutes);
router.use('/api/carts', cartsRoutes);


export default router 

