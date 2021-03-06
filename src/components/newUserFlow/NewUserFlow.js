import React, { useState, useEffect, useContext } from 'react'
import { Card } from 'react-bootstrap'
import Credentials from './Credentials'
import UserInfo from './UserInfo'
import { auth, firebase } from '../../firebase'
import { useMutation } from '@apollo/client'
import { createUser } from '../../gql/mutations'
import { SessionContext } from '../../context/SessionContext'

import moment from 'moment'

const NewUserFlow = () => {
   const { setUserProfile } = useContext(SessionContext)
   const [createNewUser] = useMutation(createUser)
   const [stage, setStage] = useState(0)
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')
   const [gender, setGender] = useState('')
   const [birthDate, setBirthDate] = useState()

   useEffect(() => {
      const init = async () => {
         console.log('init')
         const initUser = await auth.currentUser
         //  console.log(initUser)
         if (!initUser) return
         setName(initUser.displayName)
         setEmail(initUser.email)
      }

      init()
   }, [])

   const handleCreateUser = async () => {
      let currentUser = await auth.currentUser
      if (currentUser) {
         let uid = await auth.currentUser.uid
         const { data } = await createNewUser({
            variables: {
               data: {
                  uid,
                  username,
                  email,
                  password,
                  name,
                  gender,
                  birthDate,
               },
            },
         })

         // add firebase email/password sign in
         const credential = firebase.auth.EmailAuthProvider.credential(
            email,
            password
         )
         auth.currentUser
            .linkWithCredential(credential)
            .then(function (usercred) {
               var user = usercred.user
               console.log('Account linking success', user)
            })
            .catch(function (error) {
               console.log('Account linking error', error)
            })

         const { user, token } = data.createUser
         setUserProfile({ token, user })
      } else {
         try {
            let userCredential = await auth.createUserWithEmailAndPassword(
               email,
               password
            )
            currentUser = userCredential.user
            const { data } = await createNewUser({
               variables: {
                  data: {
                     uid: currentUser.uid,
                     username,
                     email,
                     password,
                     name,
                     gender,
                     birthDate,
                  },
               },
            })
            const { user, token } = data.createUser
            setUserProfile({ token, user })
         } catch (error) {
            var errorCode = error.code
            var errorMessage = error.message
            console.log(errorMessage)
         }
      }
   }

   const credentialsProps = {
      username,
      setUsername,
      password,
      setPassword,
      email,
      setEmail,
      setStage,
   }

   const userInfoProps = {
      name,
      setName,
      gender,
      setGender,
      birthDate,
      setBirthDate,
      setStage,
      handleCreateUser,
   }

   const stepper = (stage) => {
      switch (stage) {
         case 0:
            return <Credentials {...credentialsProps} />
         default:
            return <UserInfo {...userInfoProps} />
      }
   }

   return (
      <Card className='text-center' style={{ width: '24rem' }}>
         <Card.Header className='d-grid'>{`Stage ${stage + 1}/2`}</Card.Header>
         <Card.Body>{stepper(stage)}</Card.Body>
      </Card>
   )
}

export default NewUserFlow
