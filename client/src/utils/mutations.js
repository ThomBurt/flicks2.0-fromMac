import { gql } from '@apollo/client';

import { USER_INFO } from './Fragments';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $firstName: String!, $lastName: String!, $email: String!, $password: String!) {
  addUser(username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
    token
    user {
      _id
      username
      firstName
      lastName
    }
  }
}
`;


export const USER_UPDATE = gql`
    mutation userUpdate($input: UserUpdateInput!) {
        userUpdate(input: $input) {
            ...userInfo
        }
    }
    ${USER_INFO}
`;


export const ADD_EXPERIENCE = gql `
      mutation AddExperience($id: ID, $createdAt: String) {
        addExperience(_id: $id, createdAt: $createdAt) {
          _id
          createdAt
        }
      }
`;

// export const REMOVE_EXPERIENCE = gql = `
//       mutation RemoveExperience($id: ID!, $experienceId: ID) {
//         removeExperience(_id: $id, experienceId: $experienceId) {
//           _id
//         }
// }`;


export const SAVE_MOVIE = gql`
    mutation SaveMovie($id: ID, $title: String, $plot: String, $imageUrl: String, $movieId: ID, $year: String, $streaming: String) {
      saveMovie(_id: $id, title: $title, plot: $plot, image_url: $imageUrl, movieId: $movieId, year: $year, streaming: $streaming) {
        _id
        movie {
          title
          year
          plot
          image_url
          _id
          streaming
        }
      }
    }
`;

export const SAVE_RESTAURANT = gql `
    mutation SaveRestaurant($id: ID!, $name: String, $url: String, $imageUrl: String, $rating: String) {
      saveRestaurant(_id: $id, name: $name, url: $url, image_url: $imageUrl, rating: $rating) {
        _id
        restaurant {
          _id
          name
          url
          image_url
          rating
        }
      }
    }
`;

export const SAVE_DRINK = gql `
      mutation SaveDrink($id: ID!, $name: String, $description: String, $imageUrl: String) {
        saveDrink(_id: $id, name: $name, description: $description, image_url: $imageUrl) {
          _id
          drink {
            name
            description
            image_url
          }
        }
      }
`;


export const REMOVE_EXPERIENCE = gql `
  mutation RemoveExperience($id: ID!, $experienceId: ID) {
    removeExperience(_id: $id, experienceId: $experienceId) {
      _id
    }
}`