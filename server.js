import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { MongoClient } from 'mongodb';
import { fileURLToPath } from 'url';
import path from 'path';

import { connectDb } from './src/config/config.js'; 
import routerApp from "./src/routes/index.js"



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration settings
const config = {
  port: process.env.PORT || 8080,
  viewsPath: path.join(__dirname, 'views'),
};

const connectDB = async () => {
  try {
    await connectDb();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

connectDB();

const app = express();
const httpServer = http.createServer(app);
const io = new IOServer(httpServer);

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars engine setup for views
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', config.viewsPath);

// Example route for rendering a chat view
app.get('/chat', (req, res) => {
  res.render('chat.handlebars.hbs');
});

app.engine('hbs', handlebars.engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');


// API routes
app.use(routerApp);


// Start the HTTP server
httpServer.listen(config.port, () => {
  console.log(`Listening on port ${config.port}`);
});

const mensajes = [];


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
