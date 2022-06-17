const mongoose = require('mongoose');

const { Schema } = mongoose;

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedMovies` array in User.js
const movieSchema = new Schema(
  {
  title: {
    type: String
  },
  year: {
    type: String
  },
  image_url: {
    type: String
  },
  plot: {
    type: String
  },
  streaming: {
       type: String,
     },
});

 const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;