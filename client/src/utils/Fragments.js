import { gql } from '@apollo/client';

export const USER_INFO = gql`
    fragment userInfo on User {
        _id
        firstName
        lastName
        username
        email
        images {
            url
            public_id
        }
        headline
        createdAt
    }
`;
