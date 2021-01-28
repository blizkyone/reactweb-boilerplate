import React, { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'
import Credentials from './Credentials'
import UserInfo from './UserInfo'
import { auth } from '../../firebase'

const NewUserFlow = () => {
   const [stage, setStage] = useState(1)
   const [username, setUsername] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [name, setName] = useState('')
   const [gender, setGender] = useState('')
   const [birthDay, setBirthDay] = useState()

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
      birthDay,
      setBirthDay,
      setStage,
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
