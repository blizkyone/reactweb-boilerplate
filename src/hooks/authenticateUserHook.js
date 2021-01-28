// import React, { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { authenticateUser } from '../gql/mutations'
import { auth, googleProvider, facebookProvider } from '../firebase'

const AuthenticateUserHook = () => {
   const [authUser, authResult] = useMutation(authenticateUser, {
      errorPolicy: 'all',
   })

   const signInWithGoogle = async () => {
      try {
         const result = await auth.signInWithPopup(googleProvider)
         const userData = result.user
         authUser({ variables: { uid: userData.uid } })
         //  console.log(result)
      } catch (error) {
         console.log(error)
      }
   }

   const signInWithFacebook = async () => {
      try {
         const result = await auth.signInWithPopup(facebookProvider)
         const userData = result.user
         authUser({ variables: { uid: userData.uid } })
         //  console.log(result)
      } catch (error) {
         console.log(error)
      }
   }

   const getUserInfo = async () => {
      try {
         await authUser({
            variables: { uid: auth.currentUser.uid },
         })
      } catch (error) {
         console.log(error)
      }
   }

   return {
      authResult,
      signInWithGoogle,
      signInWithFacebook,
      getUserInfo,
   }
}

export default AuthenticateUserHook
