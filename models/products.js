const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: String,
  },
  price: {
    type: String,
    trim: true,
  },
  offerprice: {
    type: String,
    trim: true,
  },
  logo: {
    type: String,
    required: true,
  },
});

module.exports = model('products', productSchema);
