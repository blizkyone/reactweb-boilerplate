import React, { useState } from 'react'
import validator from 'validator'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useMutation } from '@apollo/client'
import { verifyUsername } from '../../gql/mutations'

const Credentials = ({
   username,
   setUsername,
   password,
   setPassword,
   email,
   setEmail,
   setStage,
}) => {
   const [validateUser] = useMutation(verifyUsername, {
      errorPolicy: 'all',
   })

   const [usrError, setUsrError] = useState()
   const [emailError, setEmailError] = useState()
   const [passwordError, setPasswordError] = useState()

   const [usernameGood, setUsernameGood] = useState()
   const [confirmPassword, setConfirmPassword] = useState('')

   const usernameChange = (e) => {
      setUsername(e.target.value)
      setUsernameGood(null)
   }
   const pwdChange = (e) => setPassword(e.target.value)
   const confirmChange = (e) => setConfirmPassword(e.target.value)
   const emailChange = (e) => setEmail(e.target.value)

   const checkUsername = async (e) => {
      e.preventDefault()
      if (username !== '' && /^[a-zA-Z0-9_.-]*$/.test(username)) {
         const { data } = await validateUser({ variables: { username } })
         if (data.verifyUsername) {
            setUsrError('Username already in use')
         } else {
            setUsrError(false)
            setUsernameGood(true)
         }
      } else {
         setUsrError('Invalid username')
      }
   }

   const handleClick = (e) => {
      e.preventDefault()
      if (
         validator.isEmail(email) &&
         username &&
         password &&
         usernameGood &&
         /\d+/.test(password) &&
         /[a-zA-Z]/.test(password) &&
         password.length > 5 &&
         password === confirmPassword
      ) {
         setStage(1)
      } else {
         if (!validator.isEmail(email)) {
            setEmailError('Invalid email')
         } else {
            setEmailError(null)
         }
         if (!usernameGood) {
            setUsrError('Validate your username')
         } else {
            setUsrError(null)
         }
         if (
            password !== confirmPassword ||
            /\d+/.test(password) ||
            /[a-zA-Z]/.test(password)
         ) {
            setPasswordError('Password does not match or invalid')
         } else {
            setPasswordError(null)
         }
      }
   }

   return (
      <Form>
         <Form.Group>
            <Form.Text className='text-muted'>
               Se aceptan letras, numeros y estos: '.-_'
            </Form.Text>
            <InputGroup className='mb-2'>
               <InputGroup.Prepend>
                  <InputGroup.Text>@</InputGroup.Text>
               </InputGroup.Prepend>
               <Form.Control
                  id='inlineFormInputGroup'
                  placeholder='Username'
                  value={username}
                  onChange={usernameChange}
               />
               <InputGroup.Append>
                  <Button disabled={usernameGood} onClick={checkUsername}>
                     {usernameGood ? (
                        <i className='bi bi-check2'></i>
                     ) : (
                        'Verify'
                     )}
                  </Button>
               </InputGroup.Append>
            </InputGroup>
            <Form.Text style={{ color: 'red' }}>{usrError}</Form.Text>
         </Form.Group>
         <Form.Group>
            <Form.Control
               type='email'
               placeholder='Enter email'
               value={email}
               onChange={emailChange}
            />
            <Form.Text className='text-muted'>
               We'll never share your email with anyone else.
            </Form.Text>
            <Form.Text style={{ color: 'red' }}>{emailError}</Form.Text>
         </Form.Group>
         <Form.Group>
            <Form.Control
               type='password'
               placeholder='Password'
               value={password}
               onChange={pwdChange}
            />
         </Form.Group>
         <Form.Group>
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
               type='password'
               placeholder='Confirm password'
               value={confirmPassword}
               onChange={confirmChange}
            />
            <Form.Text className='text-muted'>
               Mínimo 6 caracteres, numeros y letras
            </Form.Text>
            <Form.Text style={{ color: 'red' }}>{passwordError}</Form.Text>
         </Form.Group>
         <Button variant='primary' type='submit' onClick={handleClick}>
            Next
         </Button>
      </Form>
   )
}

export default Credentials
