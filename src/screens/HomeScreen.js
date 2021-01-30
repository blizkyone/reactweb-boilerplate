import React, { useContext } from 'react'
import { SessionContext } from '../context/SessionContext'
import Login from '../components/Login'

const HomeScreen = () => {
   const { userProfile } = useContext(SessionContext)
   return userProfile ? <div>Welcome to my Boilerplate</div> : <Login />
}

export default HomeScreen
