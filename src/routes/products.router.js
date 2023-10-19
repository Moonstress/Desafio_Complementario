import { Router } from 'express';
import ProductService from '../Dao/productManager.js';
const router = Router();

const productService = new ProductService();

// View all products with pagination
router.get('/', async (req, res) => {
  try {
    const products = await productService.getProducts();
    res.status(200).render('products/products', {
      products: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// View a specific product by ID
router.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getProduct(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(200).render('product-details', {
      product: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Add a product to the cart
router.post('/add-to-cart/:pid', async (req, res) => {
  try {
    // Logic to add the product to the cart
    // This can be handled in your CartManager or CartService

    res.status(200).json({
      status: 'success',
      message: 'Product added to the cart',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const newProductData = req.body;
    const result = await productService.createProduct(newProductData);
    res.status(201).json({
      status: 'success',
      payload: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update a product
router.put('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;
    const result = await productService.updateProduct(productId, updatedProductData);
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
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

// Delete a product
router.delete('/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
    const result = await productService.deleteProduct(productId);
    if (!result) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
