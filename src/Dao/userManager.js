import  userModel  from "./models/user.model.js";

class UserManagerMongo {
  constructor() {
    this.model = userModel;
  }

  async getUsers() {
    try {
      return await this.model.find({});
    } catch (error) {
      console.log(error);
    }
  }

  async getUser(userId) {
    try {
      return await this.model.findById(userId);
    } catch (error) {
      console.log(error);
    }
  }

  async createUser(user) {
    try {
      return await this.model.create(user);
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser(userId, updatedUser) {
    try {
      return await this.model.findByIdAndUpdate(userId, updatedUser, {
        new: true, // Return the updated document
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(userId) {
    try {
      return await this.model.findByIdAndRemove(userId);
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserManagerMongo;
