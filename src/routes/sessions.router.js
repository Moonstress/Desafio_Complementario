// session.router.js
import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const sessionRouter = express.Router();
const MongoStoreInstance = MongoStore(session);

// MongoDB connection options
const mongooseConnectionOptions = {
  // Add your MongoDB connection options here
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

// Configure session middleware
sessionRouter.use(
  session({
    secret: 'your-secret-key', // Change this to a secure secret
    resave: true,
    saveUninitialized: true,
    store: new MongoStoreInstance({
      mongooseConnection: mongoose.connection,
      ...mongooseConnectionOptions,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day in milliseconds
    },
  })
);

export default sessionRouter;
