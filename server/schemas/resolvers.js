const { AuthenticationError } = require('apollo-server-express');
const { User, Experience, Restaurant, Drink, Movie } = require('../models');
const { signToken } = require('../utils/auth');
const { DateTimeResolver } = require('graphql-scalars');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('experiences');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    //all Users
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('experiences')
        //.populate('friends')
    },
    //User by username
    user: async (parent, { _id }) => {
      return User.findOne({ _id })
        .select('-__v -password')
        .populate('experiences')
        //.populate('friends')
    },
    profile: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('experiences');

        return userData;
      }

      // throw new AuthenticationError('Not logged in');
    },
    profileWithExperiences: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select('-__v -password')
          .populate('experiences');

        return userData;
      }

      // throw new AuthenticationError('Not logged in');
    },

    // Experiences by username 
    experiences: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Experience.find(params).sort({ createdAt: -1 });
    },
    experience: async(parent, { _id }) => {
      return Experience.findOne({ _id })
    }
  },

  // ===============================================================================================
  // -----------------------------------------------------------------------------------------------
  // ===============================================================================================
  // ===============================================================================================
  // -----------------------------------------------------------------------------------------------
  // ===============================================================================================

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

      // ===============================================================================================

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

      // ===============================================================================================

    userUpdate: async (parent, args, context) => {
      if (context.user) {
        console.log(args)
        //return await User.findByIdAndUpdate(context.user._id, args.input, { new: true });
        const updatedUser = await User.findByIdAndUpdate(context.user._id, args.input, { new: true }).exec();
        return updatedUser
      }

      throw new AuthenticationError('Not logged in');
    },

   // ===============================================================================================
   // ____  \    /  ____  _____   ______   |  _____   |\    |   ______   _______
   // |      \  /  |    | |       |     |  |  |       | \   |   |        |
   // |___    \/   |____| |____   |_____|  |  |____   |  \  |   |        |_____
   // |      / \   |      |       |  \     |  |       |   \ |   |        |
   // |___  /   \  |      |____   |   \    |  |____   |    \|   |_____   |______
   // ===============================================================================================


    addExperience: async (parent, args, context) => {
      //console.log(context);
      if (context.user) {

        console.log(args)

        const experience = await Experience.create( { ...args._id })

        console.log(experience)

        const user = await User.findById(args._id);

        const updatedUser = await User.findByIdAndUpdate(
          {_id: args._id }, 
          { $addToSet: { experiences: experience } },
          { new: true }
          )
        // console.log(updatedUser) 
        return updatedUser;

      }

      throw new AuthenticationError('Not logged in');
    },


    removeExperience: async (parent, args, context) => {
      if (context.user) {
        const removedExperience = await Experience.findById(args.experienceId);
        
        console.log(args)

        await Experience.findByIdAndDelete(args.experienceId);

        const updatedUser = await User.updateOne(
          { _id: args._Id }, 
          { $pull: { experiences: removedExperience } },
          { new: true }
          )

        return console.log(context.user.firstName + "'s Experience: has been deleted from their Experiences");;
      }

      throw new AuthenticationError('No Experience or Movie with that ID');
  },

   // ===============================================================================================
   //     /\      /\       _______  \        /   |     _____
   //    /  \    /  \      |     |   \      /    |     | 
   //   /    \  /    \     |     |    \    /     |     |____
   //  /      \/      \    |     |     \  /      |     |
   // /                \   |_____|      \/       |     |____
   // ===============================================================================================

    saveMovie: async (parent, args, context) => {
      if (context.user) {

        console.log(args)
      
        const addedMovie = await Movie.create( 
          { 
            id: args.movieId, 
            title: args.title, 
            year: args.year, 
            image_url: args.image_url, 
            plot: args.plot,
            streaming: args.streaming
          } 
        )
    
        console.log(addedMovie)

        const experience = await Experience.findById(args._id);
            
        const updatedExperience = await Experience.findOneAndUpdate(
          { _id: experience },
          { $push: { movie: addedMovie }  },
          { new: true }
          );
          console.log(updatedExperience + "this is updated Experience")
    
        return updatedExperience;
      }
      throw new AuthenticationError('No Experience or movie with that id!');
    },


    removeMovie: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user)
        const removedMovie = await Movie.findById(args.movieId);

        await Experience.updateOne(
          { _id: args._id }, 
          { $pull: { movie: removedMovie } },
          { new: true }
          )

        return console.log(context.user.firstName + "'s Movie:" + removedMovie.title + " has been deleted from their Experience");;
      }

      throw new AuthenticationError('No Experience or Movie with that ID');
    },

   // ===============================================================================================
   //  __     ___     ___  _____                      ___                       ______
   // |  |   |       |       |       /\      |   |   |   |      /\      |\   |    |
   // |__|   |___    |___    |      /__\     |   |   |___|     /__\     | \  |    |
   // | \    |          |    |     /    \    |   |   | \      /    \    |  \ |    |
   // |  \   |___    ___|    |    /      \   |___|   |  \_   /      \   |   \|    |
   // ===============================================================================================
    

    saveRestaurant: async (parent, args, context) => {
      if (context.user) {

        console.log(args)
    
        const addedRestaurant = await Restaurant.create( 
          { 
            id: args.restaurantId, 
            name: args.name, 
            // locationAddress: args.locationAddress, 
            // locationCity: args.locationCity, 
            // locationState: args.locationState, 
            // locationZip: args.locationZip, 
            url: args.url,
            image_url: args.image_url, 
            rating: args.rating
          } 
        )

        console.log(addedRestaurant)

        const experience = await Experience.findById(args._id);
            
        const updatedExperience = await Experience.findOneAndUpdate(
          { _id: experience },
          { $push: { restaurant: addedRestaurant }  },
          { new: true }
          );
          console.log(updatedExperience + "this is updated Experience")
    
        return updatedExperience;
      }
      throw new AuthenticationError('No Experience or Restaurant with that id!');
    },


    removeRestaurant: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user)
        const removedRestaurant = await Restaurant.findById(args.restaurantId);

        await Experience.updateOne(
          { _id: args._id }, 
          { $pull: { restaurant: removedRestaurant } },
          { new: true }
          )

        return console.log(context.user.firstName + "'s Restaurant:" + removedRestaurant.name + " has been deleted from their Experience");;
      }

      throw new AuthenticationError('No Experience or Restaurant with that ID');
    },


   // ===============================================================================================
   //  __     __
   // |  \   |  |   |   |\   |   | /
   // |   )  |__|   |   | \  |   |/
   // |  /   | \    |   |  \ |   |\
   // L_/    |  \   |   |   \|   | \
   // ===============================================================================================


   saveDrink: async (parent, args, context) => {
    if (context.user) {

      console.log(args);
  
      const addedDrink = await Drink.create( 
        { 
          id: args.restaurantId, 
          name: args.name, 
          description: args.description, 
          image_url: args.image_url, 
        } 
      )

      console.log(addedDrink);
      
      const experience = await Experience.findById(args._id);
          
      const updatedExperience = await Experience.findOneAndUpdate(
        { _id: experience },
        { $push: { drink: addedDrink }  },
        { new: true }
        );
        console.log(updatedExperience + "this is updated Experience")
  
      return updatedExperience;
    }
    throw new AuthenticationError('No Experience or Drink with that id!');
    },


    removeDrink: async (parent, args, context) => {
      if (context.user) {
        console.log(context.user)
        const removedDrink = await Drink.findById(args.drinkId);

        await Experience.updateOne(
          { _id: args._id }, 
          { $pull: { drink: removedDrink } },
          { new: true }
          )

        return console.log(context.user.firstName + "'s Drink:" + removedDrink.name + " has been deleted from their Experience");;
      }

      throw new AuthenticationError('No Experience or Restaurant with that ID');
    },


    // ===============================================================================================


    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');

        return updatedUser;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
  },  
};

module.exports = resolvers;






