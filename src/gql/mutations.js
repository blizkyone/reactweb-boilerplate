import { gql } from '@apollo/client'

export const authenticateUser = gql`
   mutation($uid: String!) {
      authenticateUser(uid: $uid) {
         token
         user {
            name
            id
         }
      }
   }
`
