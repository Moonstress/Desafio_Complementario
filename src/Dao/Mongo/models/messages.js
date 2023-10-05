// models/cart.js
const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
  // Define cart schema fields here
});

module.exports = mongoose.model('Messages', messagesSchema);
