const mongoose = require('mongoose');

const addressBook = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  mobile: {
    type: Number,
    unique: true,
    required: true,
  },
  place: {
    type: String,
  },
  age: {
    type: Number,
    default: 0,
  },
  company: {
    type: String,
  },
});

const Book = mongoose.model('User', addressBook);

module.exports = Book;
