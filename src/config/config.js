import { connect } from 'mongoose';

const connectDb = async () => {
  try {
    console.log('Database connected');
    return await connect(
      'mongodb+srv://lilmoonstress:yLukanNzPV3A9WqX@backendcluster.ztslejq.mongodb.net/ecommerce?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export { connectDb };


