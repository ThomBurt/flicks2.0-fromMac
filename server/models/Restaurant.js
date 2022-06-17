const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const restaurantSchema = new Schema({
  name: {
    type: String,
  },
  locationAddress: {
    type: String,
  },
  locationCity: {
    type: String,
  },
  locationState: {
    type: String,
  },
  locationZip: {
    type: String
  },
  url: {
    type: String,
  },
  image_url: {
    type: String,
  },
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant;

