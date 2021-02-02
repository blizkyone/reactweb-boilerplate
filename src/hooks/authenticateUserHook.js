import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { authenticateUser } from '../gql/mutations'
import { auth, googleProvider, facebookProvider } from '../firebase'

const AuthenticateUserHook = () => {
   const [authUser, authResult] = useMutation(authenticateUser, {
      errorPolicy: 'all',
   })
   const [signInError, setSignInError] = useState()

   const signInWithGoogle = async () => {
      try {
         const result = await auth.signInWithPopup(googleProvider)
         const userData = result.user
         authUser({ variables: { uid: userData.uid } })
         //  console.log(result)
      } catch (error) {
         console.log(error.code)
         setSignInError(error.code)
      }
   }

   const signInWithFacebook = async () => {
      try {
         const result = await auth.signInWithPopup(facebookProvider)
         const userData = result.user
         authUser({ variables: { uid: userData.uid } })
         //  console.log(result)
      } catch (error) {
         console.log(error.code)
         setSignInError(error.code)
      }
   }

   const signInWithEmailAndPassword = async (email, password) => {
      if (!email || !password) return
      try {
         let result = await auth.signInWithEmailAndPassword(email, password)
         authUser({ variables: { uid: result.user.uid } })
      } catch (error) {
         const errorCode = error.code
         const errorMessage = error.message
         return errorMessage
      }
   }

   const getUserInfo = async () => {
      const current = auth.currentUser
      if (!current) return
      console.log(`current user uid: ${current.uid}`)
      try {
         await authUser({
            variables: { uid: current.uid },
         })
      } catch (error) {
         console.log(error)
      }
   }

   return {
      authResult,
      signInWithGoogle,
      signInWithFacebook,
      signInWithEmailAndPassword,
      signInError,
      getUserInfo,
   }
}

export default AuthenticateUserHook
