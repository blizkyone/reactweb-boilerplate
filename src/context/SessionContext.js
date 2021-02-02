import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { getUserQuery } from '../gql/queries'
// import React, { useState, useEffect, useRef } from 'react'
// import Dexie from 'dexie'

const SessionContext = React.createContext()

const SessionProvider = (props) => {
   const [getMyProfile, { data }] = useLazyQuery(getUserQuery)
   const [userProfile, setUserProfile] = useState()
   // const [ online, setOnline ] = useState(true)
   // const [ localdb, setLocaldb ] = useState()

   // const dexiedb = useRef()

   // useEffect(() => {

   //     window.addEventListener('offline', () => setOnline(false))
   //     window.addEventListener('online', () => setOnline(true))

   //     if(userProfile && userProfile._id) {
   //         dexiedb.current = new Dexie(userProfile._id)
   //         dexiedb.current.version(1).stores({
   //             chatRooms: 'roomid, name'
   //         })
   //         dexiedb.current.open().then(() => setLocaldb(true)).catch(err => console.log(err))
   //     }

   // }, [userProfile])

   useEffect(() => {
      let token = localStorage.getItem('token')
      if (token) {
         console.log('called')
         const init = async () => {
            getMyProfile()
         }
         init()
      }
   }, [getMyProfile])

   useEffect(() => {
      if (data) {
         setUserProfile(data.getMyProfile)
      }
   }, [data])

   const valueObject = {
      userProfile,
      setUserProfile,
   }

   return (
      <SessionContext.Provider value={valueObject}>
         {props.children}
      </SessionContext.Provider>
   )
}

export { SessionContext, SessionProvider }
