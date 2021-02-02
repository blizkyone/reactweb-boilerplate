import React, { useContext, useEffect } from 'react'
import { SessionContext } from '../context/SessionContext'
import Login from '../components/Login'
import { auth } from '../firebase'

const HomeScreen = ({ history }) => {
   const { userProfile, setUserProfile } = useContext(SessionContext)

   const handleClearSession = () => {
      auth.signOut()
      setUserProfile(null)
      localStorage.removeItem('token')
   }

   return userProfile ? (
      <div>
         <p>Welcome to my Boilerplate</p>
         <button onClick={handleClearSession}>clear context</button>
      </div>
   ) : (
      <Login history={history} />
   )
}

export default HomeScreen
