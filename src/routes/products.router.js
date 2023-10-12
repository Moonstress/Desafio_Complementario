import { Router } from 'express';
import Product from '../Dao/models/products.model.js'; 
const router = Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      status: 'success',
      payload: products,
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
    const newProduct = new Product(newProductData);
    const result = await newProduct.save();
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
    const result = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );
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
    const result = await Product.findByIdAndRemove(productId);
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
