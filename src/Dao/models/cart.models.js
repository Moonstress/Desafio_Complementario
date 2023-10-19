import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
});

const Cart = mongoose.model('Cart', cartSchema);

export default Cart; // Export the Cart model
