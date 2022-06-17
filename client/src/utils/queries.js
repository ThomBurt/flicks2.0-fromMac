import { gql } from '@apollo/client';

import { USER_INFO } from './Fragments';

export const GET_ME = gql`
    query Me {
      me {
        _id
        experiences {
          _id
          createdAt
        }
      }
    }
`;

export const Me = gql`
{
  me {
    _id
    username
    email
    experiences {
      _id
      createdAt
    }
  }
}`


export const PROFILE = gql`
    query {
        profile {
            ...userInfo
        }
    }
    ${USER_INFO}
`;

export const PROFILE_W_EXPERIENCES = gql`
    query profileWithExperiences {
      profileWithExperiences {
        _id
        experiences {
          movie {
            title
            year
            plot
            image_url
            streaming
            _id
          }
          _id
          restaurant {
            _id
            name
            locationAddress
            locationCity
            locationState
            locationZip
            url
            image_url
            rating
          }
          drink {
            _id
            name
            description
            image_url
          }
          createdAt
        }
        firstName
        lastName
        username
        email
        headline
        images {
          url
          public_id
        }
        createdAt
      }
    }
`;

export const USER_TO_GET_EXPERIENCE_ID = gql `
query User($id: ID!) {
  user(_id: $id) {
    _id
    experiences {
      _id
      createdAt
    }
  }
}`


export const USER_WITH_EXPERIENCES = gql `
      query User($id: ID!) {
        user(_id: $id) {
          _id
          experiences {
            _id
            movie {
              title
              year
              plot
              image_url
              _id
              streaming
            }
            restaurant {
              name
              url
              image_url
              rating
              _id
              locationAddress
              locationCity
              locationState
              locationZip
            }
            drink {
              name
              description
              image_url
              _id
            }
          }
        }
      }
`;

export const EXPERIENCES = gql`
    query {
        profile {
            ...userInfo
        }
    }
    ${USER_INFO}
`;


export const EXPERIENCE = gql `
      query Experience($id: ID!) {
        experience(_id: $id) {
          _id
          movie {
            title
            year
            plot
            image_url
            _id
          }
          restaurant {
            _id
            name
            location
            url
            image_url
            rating
          }
          drink {
            _id
            name
            description
            image_url
          }
          createdAt
        }
      }
`;