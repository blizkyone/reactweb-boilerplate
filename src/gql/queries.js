import { gql } from '@apollo/client'

export const getUserQuery = gql`
   {
      users {
         name
         id
      }
   }
`
