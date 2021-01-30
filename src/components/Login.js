import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container } from 'react-bootstrap'
// import { listProducts } from '../actions/productListAction'
import AuthenticateUserHook from '../hooks/authenticateUserHook'

const Login = ({ history }) => {
   // const dispatch = useDispatch()

   const {
      authResult,
      signInWithGoogle,
      signInWithFacebook,
      getUserInfo,
   } = AuthenticateUserHook()
   const { data } = authResult

   useEffect(() => {
      if (
         data?.authenticateUser.message &&
         data.authenticateUser.message === 'Create new user'
      ) {
         history.push('/create-user')
      }
   }, [authResult, data, history])

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
                  <Form>
                     <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type='email' placeholder='Enter email' />
                        <Form.Text className='text-muted'>
                           We'll never share your email with anyone else.
                        </Form.Text>
                     </Form.Group>

                     <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' placeholder='Password' />
                     </Form.Group>
                     <Button variant='primary' type='submit'>
                        Submit
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
