import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import {
   Row,
   Col,
   Spinner,
   Form,
   Button,
   Card,
   Container,
} from 'react-bootstrap'
import Message from '../components/Message'
// import { listProducts } from '../actions/productListAction'
import AuthenticateUserHook from '../hooks/authenticateUserHook'

const HomeScreen = ({ history }) => {
   // const dispatch = useDispatch()

   const {
      authResult,
      signInWithGoogle,
      signInWithFacebook,
      getUserInfo,
   } = AuthenticateUserHook()
   const { error, loading, data } = authResult

   if (error && error.message === 'No user found') {
      history.push('/create-user')
   }

   // const productList = useSelector((state) => state.productList)
   // const { load, error, products } = productList

   // useEffect(() => {
   //    dispatch(listProducts())
   // }, [dispatch])

   return (
      <>
         {loading ? (
            <Spinner animation='border' />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <Row>
               <Col className='d-flex justify-content-center'>
                  <Card style={{ width: '24rem' }}>
                     <Card.Body>
                        <Form>
                           <Form.Group controlId='formBasicEmail'>
                              <Form.Label>Email address</Form.Label>
                              <Form.Control
                                 type='email'
                                 placeholder='Enter email'
                              />
                              <Form.Text className='text-muted'>
                                 We'll never share your email with anyone else.
                              </Form.Text>
                           </Form.Group>

                           <Form.Group controlId='formBasicPassword'>
                              <Form.Label>Password</Form.Label>
                              <Form.Control
                                 type='password'
                                 placeholder='Password'
                              />
                           </Form.Group>
                           <Form.Group controlId='formBasicCheckbox'>
                              <Form.Check
                                 type='checkbox'
                                 label='Check me out'
                              />
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
               </Col>
            </Row>
         )}
      </>
   )
}

export default HomeScreen
