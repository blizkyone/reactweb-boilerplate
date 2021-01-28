import { gql } from '@apollo/client'

export const authenticateUser = gql`
   mutation($uid: String!) {
      authenticateUser(uid: $uid) {
         token
         user {
            name
            id
         }
         message
      }
   }
`

export const verifyUsername = gql`
   mutation($username: String!) {
      verifyUsername(username: $username)
   }
`
