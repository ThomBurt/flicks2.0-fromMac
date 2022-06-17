const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');
 const Movie = require('./Movie')
 const Restaurant = require('./Restaurant')
 const Drink = require('./Drink')

const experienceSchema = new Schema(
    {
        experienceId: {
            type: String,
        },

        movie: [Movie.schema],
        // movie: {      
        //     movieId: {
        //       type: String,
        //     },
        //     year: {
        //       type: String,
        //     },
        //     image_url: {
        //       type: String,
        //     },
        //     plot: {
        //       type: String,
        //     },
        //     title: {
        //       type: String,
        //     },
        //     streaming: [
        //         {
        //           type: String,
        //         },
        //       ],   
        // },

        restaurant: [Restaurant.schema],
        // restaurant: {
        //   restaurantId: {
        //     type: String,
        //   },
        //   name: {
        //     type: String,
        //   },
        //   location: {
        //     type: String,
        //   },
        //   url: {
        //     type: String,
        //   },
        //   image_url: {
        //     type: String,
        //   },
        // },

        drink: [Drink.schema],
        // drink: {
        //   drinkId: {
        //     type: String
        //   },
        //   name: {
        //     type: String,
        //   },
        //   description: {
        //     type: String
        //   },
        //   image_url: {
        //     type: String
        //   },
        // },

        createdAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
          getters: true
        }
    }
);

const Experience = model('Experience', experienceSchema);

module.exports = Experience;