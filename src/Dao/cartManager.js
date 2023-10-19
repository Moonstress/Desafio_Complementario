import cartModel from "./models/cart.models.js";

class CartManagerMongo {
  constructor() {
    this.model = cartModel
  }

  async createCart(userId, products = []) {
    try {
      const cart = await this.model.create({ userId, products });
      return cart;
    } catch (error) {
      console.error(error);
    }
  }

  async getCart(cartId) {
    try {
      return await this.model.findById(cartId);
    } catch (error) {
      console.log(error);
    }
  }

  async addItemToCart(cartId, productId, quantity) {
    try {
      const cart = await this.model.findById(cartId);

      if (!cart) {
        // Handle case where cart doesn't exist
        return null;
      }

      const existingItem = cart.items.find((item) => item.productId.toString() === productId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity }); 
      } 
 
      return await cart.save();
    } catch (error) {
      console.log(error);
    }
  }

  async removeItemFromCart(cartId, productId) {
    try {
      const cart = await this.model.findById(cartId);

      if (!cart) {
        // Handle case where cart doesn't exist 
        return null;
      }

      cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
      return await cart.save();
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartManagerMongo;
