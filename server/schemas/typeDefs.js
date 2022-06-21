const { gql } = require('apollo-server-express');

const typeDefs = gql`


  scalar DataTime

  type Image {
      url: String
      public_id: String
  }

  type Movie {
    _id: ID
    title: String
    year: String
    plot: String
    image_url: String
    streaming: String
  }

  type Restaurant {
    _id: ID
    name: String
    locationAddress: String
    locationCity: String
    locationState: String
    locationZip: String
    url: String
    image_url: String
    rating: String
  }

  type Drink {
    _id: ID
    name: String
    description: String
    image_url: String
  }

  type Experiences {
    _id: ID
    movie: [Movie]
    restaurant: [Restaurant]
    drink: [Drink]
    createdAt: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    username: String
    email: String
    headline: String
    images: [Image]
    experiences: [Experiences]
    createdAt: DataTime
    friends: [User]
    friendCount: Int
  }


  type Auth {
    token: ID!
    user: User
  }


  # ---------------------------------------------------------------------------

  input ImageInput {
    url: String
    public_id: String
  }

  input UserUpdateInput {
    username: String
    email: String
    firstName: String
    lastName: String
    headline: String
  }

  # ---------------------------------------------------------------------------

  type Query {
    me: User
    users: [User]
    user(_id: ID!): User
    experiences(username: String): [User]
    experience(_id: ID!): Experiences
    profile: User!
    profileWithExperiences: User
  }

  # ---------------------------------------------------------------------------

  type Mutation {
    login(email: String!, password: String!): Auth

    addUser(username: String!, firstName: String!, lastName: String!, email: String!, password: String!, image: String): Auth

    userUpdate(input: UserUpdateInput): User


    addExperience(_id: ID, experienceId:ID, createdAt: String): Experiences
    removeExperience(_id: ID!, experienceId: ID): Experiences

    saveMovie(_id: ID, movieId: ID, title: String, year: String, plot: String, image_url: String, streaming: String): Experiences
    saveRestaurant(_id: ID!, restaurantId: ID, name: String, locationAddress: String, locationCity: String, locationState: String, locationZip: String, url: String, image_url: String, rating: String): Experiences
    saveDrink(_id: ID!, drinkId: ID, name: String, description: String, image_url: String): Experiences

    removeMovie(_id: ID, movieId: ID): Experiences
    removeRestaurant(_id: ID, restaurantId: ID): Experiences
    removeDrink(_id: ID, drinkId: ID): Experiences

    addFriend(friendId: ID!): User

  }

`;

module.exports = typeDefs;



// addExperience(newExperience: AddExperienceInput): Experiences

// addExperience(newExperience: AddExperienceInput): Experiences

// saveMovie(experienceID: ID, title: String, plot: String, image_url: String, streaming:[String]): Experiences

// saveDinner(experienceID: ID, name: String, location: String, url: String, image_url: String, rating: String): Experiences

// saveDrink(experienceID: ID, name: String, description: String, image_url: String): Experiences