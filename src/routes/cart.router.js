import { Router } from 'express';
import CartManager from '../Dao/cartManager.js';

const router = Router();
const cartService = new CartManager();

// Define the route to create a new cart
router.post('/', async (req, res) => {
  try {
    // Logic to create a new cart
    // You can use the cartService or CartManager to handle cart creation
    
    // Example: Create an empty cart
    const newCart = await cartService.createCart({ userId: req.body.userId, products: [] });

    // Send a success response
    res.status(201).json({
      status: 'success',
      payload: newCart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get cart by ID
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = await cartService.getCart(cartId);

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({
      status: 'success',
      payload: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add item to cart
router.post('/:cid/products', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const { productId, quantity } = req.body;
    const result = await cartService.addItemToCart(cartId, productId, quantity);

    if (!result) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Remove item from cart
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const result = await cartService.removeItemFromCart(cartId, productId);

    if (!result) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.status(200).json({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
