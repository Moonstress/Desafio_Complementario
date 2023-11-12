import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: {
      type: String,
      required: true,
    },
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,      
    },
  });

const userModel = mongoose.model(userCollection, userSchema);

export default userModel ;
