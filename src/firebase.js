import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-auth'

const firebaseConfig = {
   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
   authDomain: 'blizky-a9644.firebaseapp.com',
   projectId: 'blizky-a9644',
   storageBucket: 'blizky-a9644.appspot.com',
   messagingSenderId: '373167918535',
   appId: '1:373167918535:web:12a112a90ffab86ac11de2',
   measurementId: 'G-T1MGTFTR8R',
}
// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const db = firebaseApp.firestore()

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()
// const githubPrvider = new firebase.auth.GithubAuthProvider()
// const twitterProvider = new firebase.auth.TwitterAuthProvider()

export {
   firebase,
   auth,
   googleProvider,
   facebookProvider,
   //    githubPrvider,
   //    twitterProvider,
}
// export default db
