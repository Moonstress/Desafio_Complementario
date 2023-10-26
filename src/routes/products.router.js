import { Router } from 'express';
import ProductManagerMongo from '../Dao/productManager.js';


const router = Router();
const productService = new ProductManagerMongo();

// View all products with pagination
router.get('/', async (req, res) => {
  try {
    let products = await productService.getProducts();
    console.log(products);
    products = products.map((product) => product.toJSON())
    res.render('products.handlebars', { products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Add a product to the cart directly
router.post('/add-to-cart/:productId', async (req, res) => {
  try {
    const productId = req.params.productId;
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


// View a specific product by ID
router.get('/:pid', async (req, res) => {
  try {
    const productId = req.params.pid;
    const product = await productService.getProduct(productId);
    console.log(product)
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Parse the product data to JSON
    const productData = product.toJSON();

    res.status(200).render('products_details.handlebars', {
      product: productData,
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
