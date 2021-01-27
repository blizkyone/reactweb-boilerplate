import { auth, googleProvider, facebookProvider } from '../firebase'

export const signInWithGoogle = async () => {
   try {
      let result = await auth.signInWithPopup(googleProvider)
      console.log(result)
   } catch (error) {
      console.log(error)
   }

   // .then((result) => {
   //    console.log(result)
   //    // dispatch({
   //    //     type: actionType.SET_USER,
   //    //     user: result.user
   //    // })
   // })
   // .catch((err) => alert(err.message))
}

export const signInWithFacebook = async () => {
   try {
      const result = await auth.signInWithPopup(facebookProvider)
      const userData = result.user
      console.log(userData)
      console.log(result)
   } catch (error) {
      console.log(error)
   }
}

export const getUserInfo = () => {
   console.log(auth.currentUser)
}
