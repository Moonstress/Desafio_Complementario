import express from 'express';
import http from 'http';
import { Server as IOServer } from 'socket.io';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import jwt from 'jsonwebtoken'; 
import { connectDb } from './src/config/config.js';
import routerApp from "./src/routes/index.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jwt = require('jsonwebtoken');
const express = require('express');

const secretKey = '12345'; // Replace with a secure secret key
app.get('/generate-token', (req, res) => {
  const payload = { /* your payload data */ };
  const token = jwt.sign(payload, secretKey, { expiresIn: '1m' });
  res.json({ token });
});

app.get('/generate-token', (req, res) => {
  const token = jwt.sign({ /* your payload data */ }, secretKey, { expiresIn: '1m' });
  res.json({ token });
});

// Your other routes and configurations...

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});


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

// Set the view engine to Handlebars using exphbs
app.engine("handlebars", handlebars.engine());
app.set('views', config.viewsPath);
app.set('view engine', 'handlebars');

// Example route for rendering a chat view
app.get('/chat', (req, res) => {
  res.render('chat.handlebars.hbs');
});

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
