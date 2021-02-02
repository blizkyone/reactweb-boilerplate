import { gql } from '@apollo/client'

export const getUserQuery = gql`
   {
      getMyProfile {
         name
         id
         email
         username
      }
   }
`
