import Product from "./models/products.model.js";

class ProductManagerMongo {
  constructor() {
    this.model = Product;
  }

 
  async getProducts() {
    try {      
      return await this.model.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async getProduct(productId) {
    try {
      return await this.model.findById(productId);
    } catch (error) {
      console.log(error);
    }
  }

  async createProduct(product) {
    try {
      return await this.model.create(product);
    } catch (error) {
      console.log(error);
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      return await this.model.findByIdAndUpdate(productId, updatedProduct, {
        new: true, // Return the updated document
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(productId) {
    try {
      return await this.model.findByIdAndRemove(productId);
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductManagerMongo;
 