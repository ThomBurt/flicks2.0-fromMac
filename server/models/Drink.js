const mongoose = require('mongoose');

const { Schema } = mongoose;

const drinkSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  description: {
    type: String
  },
  image_url: {
    type: String
  },
});

const Drink = mongoose.model('Drink', drinkSchema);

module.exports = Drink;