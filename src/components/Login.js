import React, { useEffect, useContext, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container } from 'react-bootstrap'
// import { listProducts } from '../actions/productListAction'
import Message from './Message'
import AuthenticateUserHook from '../hooks/authenticateUserHook'
import { SessionContext } from '../context/SessionContext'

const Login = ({ history }) => {
   const { setUserProfile } = useContext(SessionContext)
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState()
   // const dispatch = useDispatch()

   const {
      authResult,
      signInWithGoogle,
      signInWithFacebook,
      signInWithEmailAndPassword,
      getUserInfo,
      signInError,
   } = AuthenticateUserHook()
   const { data } = authResult

   useEffect(() => {
      if (
         data?.authenticateUser.message &&
         data.authenticateUser.message === 'Create new user'
      ) {
         history.push('/create-user')
      } else if (data?.authenticateUser.token) {
         const { token, user } = data.authenticateUser
         localStorage.setItem('token', token)
         console.log({ token, user })
         setUserProfile(user)
      }
   }, [authResult, data, history, setUserProfile])

   useEffect(() => {
      if (signInError === 'auth/account-exists-with-different-credential') {
         setError('Email linked to another sign in method')
      }
   }, [signInError])

   const handleSubmitForm = async (e) => {
      e.preventDefault()
      let errorMessage = await signInWithEmailAndPassword(email, password)
      if (errorMessage) {
         setError('Invalid email or password')
      }
   }

   // const productList = useSelector((state) => state.productList)
   // const { load, error, products } = productList

   // useEffect(() => {
   //    dispatch(listProducts())
   // }, [dispatch])

   return (
      <>
         <Container className='d-flex justify-content-center'>
            <Card style={{ width: '24rem' }}>
               <Card.Body>
                  <Form onSubmit={handleSubmitForm}>
                     <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Enter email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                     </Form.Group>

                     <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                           type='password'
                           placeholder='Password'
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                        />
                     </Form.Group>
                     {error && <Message>{error}</Message>}
                     <Button
                        variant='primary'
                        type='submit'
                        onClick={handleSubmitForm}
                     >
                        Submit
                     </Button>
                     <Button
                        variant='link'
                        type='submit'
                        onClick={(_) => history.push('/create-user')}
                     >
                        Sign up
                     </Button>
                  </Form>
                  <Container className='d-flex flex-column justify-content-center mt-3'>
                     <Button
                        className='m-2'
                        onClick={(_) => signInWithFacebook()}
                     >
                        <i className='bi bi-facebook'></i>
                        {'       Login with Facebook'}
                     </Button>
                     <Button
                        variant='light'
                        className='m-2'
                        onClick={(_) => signInWithGoogle()}
                     >
                        <i className='bi bi-google'></i>
                        {'       Login with Google'}
                     </Button>
                     <Button
                        variant='dark'
                        className='m-2'
                        onClick={(_) => getUserInfo()}
                     >
                        Get logged user info
                     </Button>
                  </Container>
               </Card.Body>
            </Card>
         </Container>
      </>
   )
}

export default Login
